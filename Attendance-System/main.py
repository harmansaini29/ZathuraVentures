from __future__ import annotations

import argparse
from dataclasses import dataclass
from datetime import date, datetime, time
from pathlib import Path
from typing import Iterable, Optional
from zipfile import BadZipFile

import pandas as pd
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
OUTPUT_DIR = BASE_DIR / "output"
REPORTS_DIR = OUTPUT_DIR / "reports"
WORKBOOK_PATH = DATA_DIR / "attendance.xlsx"

EMPLOYEE_COLUMNS = [
    "employee_id",
    "name",
    "department",
    "designation",
    "shift_start",
    "late_after",
    "is_active",
]

ATTENDANCE_COLUMNS = [
    "employee_id",
    "date",
    "status",
    "check_in",
    "check_out",
    "hours_worked",
    "notes",
]

VALID_STATUSES = {"Present", "WFH", "Absent", "Leave", "Holiday"}


@dataclass
class Employee:
    employee_id: str
    name: str
    department: str
    designation: str
    shift_start: str = "09:00"
    late_after: str = "09:15"
    is_active: bool = True


def ensure_directories() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)


def parse_day(value: Optional[str]) -> date:
    if not value:
        return datetime.now().date()
    return datetime.strptime(value, "%Y-%m-%d").date()


def parse_clock(value: str) -> time:
    value = value.strip()
    fmts = ("%H:%M", "%H:%M:%S")
    for fmt in fmts:
        try:
            return datetime.strptime(value, fmt).time()
        except ValueError:
            continue
    raise ValueError(f"Invalid time '{value}'. Use HH:MM or HH:MM:SS.")


def parse_optional_datetime(value: Optional[str], attendance_day: date) -> datetime:
    if not value:
        return datetime.now().replace(microsecond=0)

    if "T" in value or " " in value:
        return datetime.fromisoformat(value)

    return datetime.combine(attendance_day, parse_clock(value))


def normalize_status(value: str) -> str:
    cleaned = value.strip()
    status_map = {
        "present": "Present",
        "wfh": "WFH",
        "absent": "Absent",
        "leave": "Leave",
        "holiday": "Holiday",
    }
    normalized = status_map.get(cleaned.lower())
    if not normalized:
        raise ValueError(f"Status must be one of: {', '.join(sorted(VALID_STATUSES))}")
    return normalized


def now_iso() -> str:
    return datetime.now().replace(microsecond=0).isoformat(sep=" ")


def load_sheet(sheet_name: str, columns: Iterable[str]) -> pd.DataFrame:
    ensure_directories()
    if not WORKBOOK_PATH.exists():
        return pd.DataFrame(columns=list(columns))

    try:
        df = pd.read_excel(WORKBOOK_PATH, sheet_name=sheet_name)
    except BadZipFile as exc:
        raise ValueError(
            "The attendance workbook is unreadable right now. Retry the command, "
            "or run 'python main.py init --force' if the file was interrupted during a write."
        ) from exc
    except ValueError:
        return pd.DataFrame(columns=list(columns))

    for column in columns:
        if column not in df.columns:
            df[column] = pd.NA

    return df[list(columns)]


def save_workbook(employees_df: pd.DataFrame, attendance_df: pd.DataFrame) -> None:
    ensure_directories()
    temp_path = WORKBOOK_PATH.with_name(f"{WORKBOOK_PATH.stem}.tmp.xlsx")
    with pd.ExcelWriter(temp_path, engine="openpyxl", mode="w") as writer:
        employees_df.to_excel(writer, sheet_name="Employees", index=False)
        attendance_df.to_excel(writer, sheet_name="Attendance", index=False)
    temp_path.replace(WORKBOOK_PATH)


def load_employees() -> pd.DataFrame:
    df = load_sheet("Employees", EMPLOYEE_COLUMNS)
    if not df.empty:
        df["employee_id"] = df["employee_id"].astype(str).str.strip()
        df["is_active"] = df["is_active"].fillna(True).astype(bool)
    return df


def load_attendance() -> pd.DataFrame:
    df = load_sheet("Attendance", ATTENDANCE_COLUMNS)
    if not df.empty:
        df["employee_id"] = df["employee_id"].astype(str).str.strip()
        df["date"] = df["date"].astype(str).str.slice(0, 10)
        for column in ["status", "check_in", "check_out", "notes"]:
            df[column] = df[column].astype("object")
    return df


def require_employee(employees_df: pd.DataFrame, employee_id: str) -> pd.Series:
    match = employees_df[employees_df["employee_id"] == employee_id]
    if match.empty:
        raise ValueError(f"Employee '{employee_id}' does not exist. Add the employee first.")

    employee = match.iloc[0]
    if not bool(employee["is_active"]):
        raise ValueError(f"Employee '{employee_id}' is inactive.")
    return employee


def calculate_hours(check_in_value: object, check_out_value: object) -> Optional[float]:
    if pd.isna(check_in_value) or pd.isna(check_out_value):
        return None

    check_in_dt = pd.to_datetime(check_in_value, errors="coerce")
    check_out_dt = pd.to_datetime(check_out_value, errors="coerce")
    if pd.isna(check_in_dt) or pd.isna(check_out_dt):
        return None

    seconds = (check_out_dt - check_in_dt).total_seconds()
    if seconds < 0:
        return None
    return round(seconds / 3600, 2)


def upsert_attendance_record(
    attendance_df: pd.DataFrame,
    employee_id: str,
    attendance_day: date,
    *,
    status: str,
    check_in: object = pd.NA,
    check_out: object = pd.NA,
    notes: str = "",
) -> pd.DataFrame:
    target_date = attendance_day.isoformat()
    mask = (attendance_df["employee_id"] == employee_id) & (attendance_df["date"] == target_date)

    if mask.any():
        row_index = attendance_df[mask].index[0]
        if status:
            attendance_df.at[row_index, "status"] = status
        if pd.notna(check_in):
            attendance_df.at[row_index, "check_in"] = check_in
        if pd.notna(check_out):
            attendance_df.at[row_index, "check_out"] = check_out
        if notes:
            attendance_df.at[row_index, "notes"] = notes
        attendance_df.at[row_index, "hours_worked"] = calculate_hours(
            attendance_df.at[row_index, "check_in"],
            attendance_df.at[row_index, "check_out"],
        )
        return attendance_df

    new_row = pd.DataFrame(
        [
            {
                "employee_id": employee_id,
                "date": target_date,
                "status": status,
                "check_in": check_in,
                "check_out": check_out,
                "hours_worked": calculate_hours(check_in, check_out),
                "notes": notes,
            }
        ]
    )
    if attendance_df.empty:
        return new_row.reindex(columns=ATTENDANCE_COLUMNS)
    next_index = len(attendance_df)
    for column in ATTENDANCE_COLUMNS:
        attendance_df.at[next_index, column] = new_row.iloc[0][column]
    return attendance_df


def command_init(args: argparse.Namespace) -> None:
    ensure_directories()
    if WORKBOOK_PATH.exists() and not args.force:
        print(f"Workbook already exists at {WORKBOOK_PATH}. Use --force to reset it.")
        return

    employees_df = pd.DataFrame(columns=EMPLOYEE_COLUMNS)
    attendance_df = pd.DataFrame(columns=ATTENDANCE_COLUMNS)
    save_workbook(employees_df, attendance_df)
    print(f"Initialized attendance system at {WORKBOOK_PATH}")


def command_add_employee(args: argparse.Namespace) -> None:
    employees_df = load_employees()
    attendance_df = load_attendance()

    employee_id = args.employee_id.strip()
    if (employees_df["employee_id"] == employee_id).any():
        raise ValueError(f"Employee '{employee_id}' already exists.")

    employee = Employee(
        employee_id=employee_id,
        name=args.name.strip(),
        department=args.department.strip(),
        designation=args.designation.strip(),
        shift_start=args.shift_start.strip(),
        late_after=args.late_after.strip(),
    )
    parse_clock(employee.shift_start)
    parse_clock(employee.late_after)

    employees_df = pd.concat([employees_df, pd.DataFrame([employee.__dict__])], ignore_index=True)
    save_workbook(employees_df, attendance_df)
    print(f"Added employee {employee.name} ({employee.employee_id})")


def command_list_employees(_: argparse.Namespace) -> None:
    employees_df = load_employees()
    if employees_df.empty:
        print("No employees found. Start with: python main.py add-employee ...")
        return

    display_df = employees_df.fillna("")
    print(display_df.to_string(index=False))


def command_check_in(args: argparse.Namespace) -> None:
    employees_df = load_employees()
    attendance_df = load_attendance()
    employee = require_employee(employees_df, args.employee_id.strip())
    attendance_day = parse_day(args.date)

    check_in_dt = parse_optional_datetime(args.at, attendance_day)

    attendance_df = upsert_attendance_record(
        attendance_df,
        employee["employee_id"],
        attendance_day,
        status="WFH" if args.wfh else "Present",
        check_in=check_in_dt.isoformat(sep=" "),
        notes=args.notes or "",
    )
    save_workbook(employees_df, attendance_df)
    print(f"Checked in {employee['name']} on {attendance_day.isoformat()} at {check_in_dt.strftime('%H:%M:%S')}")


def command_check_out(args: argparse.Namespace) -> None:
    employees_df = load_employees()
    attendance_df = load_attendance()
    employee = require_employee(employees_df, args.employee_id.strip())
    attendance_day = parse_day(args.date)
    target_date = attendance_day.isoformat()

    mask = (attendance_df["employee_id"] == employee["employee_id"]) & (attendance_df["date"] == target_date)
    if not mask.any():
        raise ValueError(f"No attendance entry found for {employee['employee_id']} on {target_date}.")

    check_out_dt = parse_optional_datetime(args.at, attendance_day)
    row_index = attendance_df[mask].index[0]
    attendance_df.at[row_index, "check_out"] = check_out_dt.isoformat(sep=" ")
    attendance_df.at[row_index, "hours_worked"] = calculate_hours(
        attendance_df.at[row_index, "check_in"],
        attendance_df.at[row_index, "check_out"],
    )
    if args.notes:
        attendance_df.at[row_index, "notes"] = args.notes

    save_workbook(employees_df, attendance_df)
    print(f"Checked out {employee['name']} on {attendance_day.isoformat()} at {check_out_dt.strftime('%H:%M:%S')}")


def command_mark_status(args: argparse.Namespace) -> None:
    status = normalize_status(args.status)

    employees_df = load_employees()
    attendance_df = load_attendance()
    employee = require_employee(employees_df, args.employee_id.strip())
    attendance_day = parse_day(args.date)

    attendance_df = upsert_attendance_record(
        attendance_df,
        employee["employee_id"],
        attendance_day,
        status=status,
        notes=args.notes or "",
    )
    save_workbook(employees_df, attendance_df)
    print(f"Marked {employee['name']} as {status} for {attendance_day.isoformat()}")


def command_summary(args: argparse.Namespace) -> None:
    employees_df = load_employees()
    attendance_df = load_attendance()
    attendance_day = parse_day(args.date).isoformat()

    if employees_df.empty:
        print("No employees found.")
        return

    daily_records = attendance_df[attendance_df["date"] == attendance_day]
    merged = employees_df.merge(
        daily_records[["employee_id", "status", "check_in", "check_out", "hours_worked"]],
        on="employee_id",
        how="left",
    ).fillna({"status": "Not Marked", "check_in": "", "check_out": "", "hours_worked": ""})

    print(f"Attendance summary for {attendance_day}")
    print(merged[["employee_id", "name", "department", "status", "check_in", "check_out", "hours_worked"]].to_string(index=False))


def compute_monthly_metrics(employee_row: pd.Series, attendance_df: pd.DataFrame, month_key: str) -> dict[str, object]:
    employee_id = employee_row["employee_id"]
    employee_records = attendance_df[
        (attendance_df["employee_id"] == employee_id)
        & (attendance_df["date"].astype(str).str.startswith(month_key))
    ].copy()

    if employee_records.empty:
        return {
            "records": employee_records,
            "present": 0,
            "wfh": 0,
            "absent": 0,
            "leave": 0,
            "holiday": 0,
            "late_count": 0,
            "attendance_pct": 0.0,
            "avg_hours": 0.0,
        }

    present = int((employee_records["status"] == "Present").sum())
    wfh = int((employee_records["status"] == "WFH").sum())
    absent = int((employee_records["status"] == "Absent").sum())
    leave = int((employee_records["status"] == "Leave").sum())
    holiday = int((employee_records["status"] == "Holiday").sum())

    threshold = parse_clock(str(employee_row["late_after"]))
    check_in_times = pd.to_datetime(employee_records["check_in"], errors="coerce")
    late_count = sum(1 for value in check_in_times.dropna() if value.time() > threshold)

    working_days = present + wfh + absent + leave
    attendance_pct = round(((present + wfh) / working_days) * 100, 2) if working_days else 0.0
    avg_hours = round(pd.to_numeric(employee_records["hours_worked"], errors="coerce").dropna().mean(), 2)
    if pd.isna(avg_hours):
        avg_hours = 0.0

    return {
        "records": employee_records.sort_values("date"),
        "present": present,
        "wfh": wfh,
        "absent": absent,
        "leave": leave,
        "holiday": holiday,
        "late_count": late_count,
        "attendance_pct": attendance_pct,
        "avg_hours": avg_hours,
    }


def build_employee_report(employee_row: pd.Series, metrics: dict[str, object], month_key: str) -> Path:
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    safe_name = str(employee_row["name"]).replace(" ", "_")
    report_path = REPORTS_DIR / f"{month_key}_{employee_row['employee_id']}_{safe_name}.pdf"

    styles = getSampleStyleSheet()
    doc = SimpleDocTemplate(str(report_path), pagesize=A4)
    elements = []

    elements.append(Paragraph("Zentara Ventures", styles["Title"]))
    elements.append(Paragraph(f"Monthly Attendance Report - {month_key}", styles["Heading2"]))
    elements.append(Spacer(1, 12))

    elements.append(
        Paragraph(
            f"Employee: {employee_row['name']} ({employee_row['employee_id']})<br/>"
            f"Department: {employee_row['department']}<br/>"
            f"Designation: {employee_row['designation']}",
            styles["Normal"],
        )
    )
    elements.append(Spacer(1, 12))

    summary_data = [
        ["Metric", "Value"],
        ["Present", metrics["present"]],
        ["WFH", metrics["wfh"]],
        ["Absent", metrics["absent"]],
        ["Leave", metrics["leave"]],
        ["Holiday", metrics["holiday"]],
        ["Attendance %", f"{metrics['attendance_pct']:.2f}%"],
        ["Late Check-ins", metrics["late_count"]],
        ["Average Hours", metrics["avg_hours"]],
    ]

    summary_table = Table(summary_data, colWidths=[180, 180])
    summary_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f172a")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.whitesmoke, colors.lightgrey]),
                ("ALIGN", (1, 1), (-1, -1), "CENTER"),
            ]
        )
    )
    elements.append(summary_table)
    elements.append(Spacer(1, 16))

    records = metrics["records"]
    log_data = [["Date", "Status", "Check In", "Check Out", "Hours", "Notes"]]
    if isinstance(records, pd.DataFrame) and not records.empty:
        for _, row in records.iterrows():
            log_data.append(
                [
                    str(row["date"]),
                    str(row["status"]),
                    "" if pd.isna(row["check_in"]) else str(row["check_in"]),
                    "" if pd.isna(row["check_out"]) else str(row["check_out"]),
                    "" if pd.isna(row["hours_worked"]) else str(row["hours_worked"]),
                    "" if pd.isna(row["notes"]) else str(row["notes"]),
                ]
            )
    else:
        log_data.append(["No records", "", "", "", "", ""])

    elements.append(Paragraph("Daily Log", styles["Heading3"]))
    log_table = Table(log_data, repeatRows=1)
    log_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1d4ed8")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
            ]
        )
    )
    elements.append(log_table)
    doc.build(elements)
    return report_path


def command_report(args: argparse.Namespace) -> None:
    employees_df = load_employees()
    attendance_df = load_attendance()
    month_key = args.month or datetime.now().strftime("%Y-%m")

    try:
        datetime.strptime(month_key, "%Y-%m")
    except ValueError as exc:
        raise ValueError("Month must use YYYY-MM format.") from exc

    if employees_df.empty:
        print("No employees found.")
        return

    if args.employee_id:
        employees_to_report = employees_df[employees_df["employee_id"] == args.employee_id.strip()]
        if employees_to_report.empty:
            raise ValueError(f"Employee '{args.employee_id}' does not exist.")
    else:
        employees_to_report = employees_df[employees_df["is_active"] == True]

    generated_paths = []
    for _, employee_row in employees_to_report.iterrows():
        metrics = compute_monthly_metrics(employee_row, attendance_df, month_key)
        generated_paths.append(build_employee_report(employee_row, metrics, month_key))

    print("Generated reports:")
    for path in generated_paths:
        print(f"- {path}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Zentara Ventures attendance system")
    subparsers = parser.add_subparsers(dest="command", required=True)

    init_parser = subparsers.add_parser("init", help="Create or reset attendance workbook")
    init_parser.add_argument("--force", action="store_true", help="Reset workbook if it already exists")
    init_parser.set_defaults(func=command_init)

    add_employee_parser = subparsers.add_parser("add-employee", help="Add a new employee")
    add_employee_parser.add_argument("--employee-id", required=True)
    add_employee_parser.add_argument("--name", required=True)
    add_employee_parser.add_argument("--department", required=True)
    add_employee_parser.add_argument("--designation", required=True)
    add_employee_parser.add_argument("--shift-start", default="09:00")
    add_employee_parser.add_argument("--late-after", default="09:15")
    add_employee_parser.set_defaults(func=command_add_employee)

    list_employees_parser = subparsers.add_parser("list-employees", help="List employees")
    list_employees_parser.set_defaults(func=command_list_employees)

    check_in_parser = subparsers.add_parser("check-in", help="Record employee check-in")
    check_in_parser.add_argument("--employee-id", required=True)
    check_in_parser.add_argument("--date", help="Attendance date in YYYY-MM-DD")
    check_in_parser.add_argument("--at", help="Time as HH:MM, HH:MM:SS, or full ISO datetime")
    check_in_parser.add_argument("--wfh", action="store_true", help="Mark this check-in as work from home")
    check_in_parser.add_argument("--notes", help="Optional note")
    check_in_parser.set_defaults(func=command_check_in)

    check_out_parser = subparsers.add_parser("check-out", help="Record employee check-out")
    check_out_parser.add_argument("--employee-id", required=True)
    check_out_parser.add_argument("--date", help="Attendance date in YYYY-MM-DD")
    check_out_parser.add_argument("--at", help="Time as HH:MM, HH:MM:SS, or full ISO datetime")
    check_out_parser.add_argument("--notes", help="Optional note")
    check_out_parser.set_defaults(func=command_check_out)

    mark_status_parser = subparsers.add_parser("mark-status", help="Mark Absent, Leave, WFH, Holiday, or Present")
    mark_status_parser.add_argument("--employee-id", required=True)
    mark_status_parser.add_argument("--date", required=True, help="Attendance date in YYYY-MM-DD")
    mark_status_parser.add_argument("--status", required=True)
    mark_status_parser.add_argument("--notes", help="Optional note")
    mark_status_parser.set_defaults(func=command_mark_status)

    summary_parser = subparsers.add_parser("summary", help="Show daily attendance summary")
    summary_parser.add_argument("--date", help="Attendance date in YYYY-MM-DD")
    summary_parser.set_defaults(func=command_summary)

    report_parser = subparsers.add_parser("report", help="Generate monthly PDF report(s)")
    report_parser.add_argument("--month", help="Month in YYYY-MM format")
    report_parser.add_argument("--employee-id", help="Limit report generation to one employee")
    report_parser.set_defaults(func=command_report)

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    try:
        args.func(args)
    except ValueError as exc:
        parser.exit(status=1, message=f"Error: {exc}\n")


if __name__ == "__main__":
    main()
