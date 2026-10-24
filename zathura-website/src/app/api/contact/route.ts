import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const recipient = "zathuraventures@gmail.com";
    const formattedSubject = subject
      ? `[Zathura Inquiries] ${subject} — from ${name}`
      : `[Zathura Inquiries] New Client Transmission from ${name}`;

    // 1. Check if SMTP credentials exist in environment variables
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const htmlContent = `
        <div style="background-color: #010612; color: #e1f0ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 32px; border-radius: 12px; border: 1px solid rgba(0, 229, 255, 0.2); max-width: 600px; margin: 0 auto;">
          <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="color: #00e5ff; margin: 0; font-size: 20px; letter-spacing: 0.05em; text-transform: uppercase;">
              Zathura Ventures · Direct Transmission
            </h2>
            <p style="color: #8eaec9; font-size: 12px; margin-top: 4px;">
              Received via Zathura Institutional Web Portal
            </p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #8eaec9; width: 120px;"><strong>Client Name:</strong></td>
              <td style="padding: 8px 0; color: #ffffff;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8eaec9;"><strong>Email Address:</strong></td>
              <td style="padding: 8px 0; color: #00e5ff;"><a href="mailto:${email}" style="color: #00e5ff; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8eaec9;"><strong>Project Scope:</strong></td>
              <td style="padding: 8px 0; color: #ffffff;">${subject || "General Consultation / Architecture"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8eaec9;"><strong>Received At:</strong></td>
              <td style="padding: 8px 0; color: #ffffff;">${new Date().toUTCString()}</td>
            </tr>
          </table>

          <div style="background-color: #061226; border-left: 3px solid #00e5ff; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
            <p style="color: #8eaec9; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0; margin-bottom: 8px;">
              Message Content:
            </p>
            <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">
${message}
            </p>
          </div>

          <div style="font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 16px;">
            Reply directly to this email to respond to ${name} (${email}).
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Zathura Ventures Portal" <${smtpUser}>`,
        to: recipient,
        replyTo: email,
        subject: formattedSubject,
        text: `From: ${name} (${email})\nSubject: ${subject || "General Inquiry"}\n\nMessage:\n${message}`,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        deliveryMethod: "direct-smtp",
        message: "Message successfully dispatched to zathuraventures@gmail.com",
      });
    }

    // 2. Fallback: Zero-config direct dispatch via FormSubmit API to zathuraventures@gmail.com
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _subject: formattedSubject,
        project_scope: subject || "General Architecture / Engineering",
        message,
        _replyto: email,
        _template: "table",
      }),
    });

    const formSubmitData = await formSubmitRes.json();

    return NextResponse.json({
      success: true,
      deliveryMethod: "formsubmit-dispatch",
      data: formSubmitData,
      message: "Message successfully dispatched to zathuraventures@gmail.com",
    });
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      { error: error.message || "Failed to deliver message." },
      { status: 500 }
    );
  }
}
