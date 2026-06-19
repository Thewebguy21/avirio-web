import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, company, need, message } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const RESEND_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL   = process.env.LEAD_EMAIL ?? "thegreats343@gmail.com";

  if (!RESEND_KEY) {
    console.log("LEAD:", { name, email, company, need, message });
    return NextResponse.json({ ok: true });
  }

  const body = `
New demo request from Avirio website

Name:    ${name}
Email:   ${email}
Company: ${company || "N/A"}
Need:    ${need || "N/A"}
Message: ${message || "N/A"}
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Avirio Leads <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: `Demo request: ${name} from ${company || email}`,
      text: body,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
