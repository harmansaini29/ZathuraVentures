# Zentara Ventures Attendance System

This folder now contains a simple company attendance CLI for Zentara Ventures.

## What it does

- Stores employees and attendance records in `data/attendance.xlsx`
- Supports check-in and check-out logging
- Lets HR mark `Absent`, `Leave`, `WFH`, `Holiday`, or `Present`
- Generates monthly PDF attendance reports in `output/reports`

## Setup

```bash
pip install -r requirements.txt
python main.py init
```

## Common commands

Add an employee:

```bash
python main.py add-employee --employee-id ZV-SDE-INT-001 --name "Swati Mishra" --department Engineering --designation "Software Intern"
```

Check in:

```bash
python main.py check-in --employee-id ZV-SDE-INT-001
```

Check out:

```bash
python main.py check-out --employee-id ZV-SDE-INT-001
```

Mark leave or absence:

```bash
python main.py mark-status --employee-id ZV-SDE-INT-001 --date 2026-05-26 --status Leave --notes "Approved by manager"
```

See one day summary:

```bash
python main.py summary --date 2026-05-26
```

Generate monthly reports:

```bash
python main.py report --month 2026-05
```

Generate one employee report:

```bash
python main.py report --month 2026-05 --employee-id ZV-SDE-INT-001
```

## Notes

- The workbook is recreated with `python main.py init --force`
- Employee IDs should stay unique and stable
- Monthly reports include attendance percentage, late check-ins, average hours, and the daily log
