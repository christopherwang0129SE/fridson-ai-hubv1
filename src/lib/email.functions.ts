import { createServerFn } from "@tanstack/react-start";

type EmailInput = {
  to: string;
  subject: string;
  text: string;
};

export const sendDemoEmail = createServerFn({ method: "POST" })
  .inputValidator((data: EmailInput) => {
    if (!data?.to || !data?.subject || !data?.text) {
      throw new Error("Missing to / subject / text");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error("Email connector not configured");
    }

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Fridson AI <onboarding@resend.dev>",
        to: [data.to],
        subject: data.subject,
        html: `<div style="font-family:system-ui,sans-serif;padding:24px;background:#0b1020;color:#e8ecff;border-radius:12px">
          <div style="font-size:12px;letter-spacing:.2em;color:#7ad7ff;text-transform:uppercase;margin-bottom:8px">Fridson AI · Building Nervous System</div>
          <h2 style="margin:0 0 12px 0;font-size:20px">${data.subject}</h2>
          <p style="margin:0;line-height:1.55;color:#c9d2ff">${data.text}</p>
          <hr style="border:none;border-top:1px solid #2a3358;margin:20px 0"/>
          <div style="font-size:11px;color:#8a93b8">Automated stakeholder notification · demo simulation</div>
        </div>`,
      }),
    });

    const body = await res.text();
    if (!res.ok) {
      throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
    }
    return { ok: true, id: (() => { try { return JSON.parse(body).id; } catch { return null; } })() };
  });