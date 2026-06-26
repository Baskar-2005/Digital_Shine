import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const router: IRouter = Router();

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

router.post("/contact", async (req, res) => {
  // Debug: confirm route is hit and inspect incoming payload
  req.log.info({ body: req.body }, "[contact] POST /contact hit");
  try {
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: "Invalid form data" });
      return;
    }

    const data = parsed.data;

    const smtpUser = process.env["SMTP_USER"];
    const smtpPass = process.env["SMTP_PASS"];
    const smtpHost = process.env["SMTP_HOST"] ?? "smtp.gmail.com";
    const smtpPort = Number(process.env["SMTP_PORT"] ?? "587");
    const contactTo = process.env["CONTACT_TO_EMAIL"] ?? smtpUser;

    if (smtpUser && smtpPass && contactTo) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"Digital Shine Website" <${smtpUser}>`,
          to: contactTo,
          replyTo: data.email,
          subject: `NEW PROJECT INQUIRY — ${data.name} (Digital Shine)`,
          html: `
          <div style="font-family: sans-serif; max-width: 680px; margin: 0 auto; background: #050816; color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.35);">
            <div style="background: radial-gradient(circle at 20% 0%, rgba(6,182,212,0.45), transparent 60%), radial-gradient(circle at 80% 0%, rgba(108,99,255,0.45), transparent 55%), linear-gradient(135deg, #6C63FF, #06B6D4); padding: 34px 28px; text-align: center;">
              <div style="display:flex; justify-content:center; align-items:center; gap:10px; margin-bottom: 10px;">
                <div style="width: 14px; height: 14px; border-radius: 3px; background: rgba(255,255,255,0.85); box-shadow: 0 0 18px rgba(255,255,255,0.35); transform: rotate(18deg);"></div>
                <div style="width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.85); box-shadow: 0 0 18px rgba(255,255,255,0.35);"></div>
              </div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 0.5px;">NEW PROJECT INQUIRY</h1>
              <p style="margin: 8px 0 0; opacity: 0.95; font-size: 14px; font-weight: 600;">Digital Shine Agency</p>
            </div>

            <div style="padding: 28px;">
              <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 18px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 10px 0; color: #94A3B8; width: 140px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08);">Name</td>
                    <td style="padding: 10px 0; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.08);">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #94A3B8; width: 140px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08);">Email</td>
                    <td style="padding: 10px 0; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.08);"><a href="mailto:${data.email}" style="color: #06B6D4; text-decoration: none; font-weight: 700;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #94A3B8; width: 140px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08);">Phone</td>
                    <td style="padding: 10px 0; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.08);">${data.phone || "—"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #94A3B8; width: 140px; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08);">Company</td>
                    <td style="padding: 10px 0; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.08);">${data.company || "—"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #94A3B8; width: 140px; font-weight: 600;">Budget</td>
                    <td style="padding: 10px 0; font-weight: 800;">
                      <span style="display:inline-block; background: rgba(108,99,255,0.18); color: #6C63FF; padding: 6px 14px; border-radius: 999px; font-weight: 900;">
                        ${data.budget || "—"}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 18px;">
                <div style="color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; margin-bottom: 10px;">Project Details</div>
                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px 16px; line-height: 1.75; font-size: 14px;">
                  ${data.message.replace(/\n/g, "<br>")}
                </div>
              </div>

              <div style="margin-top: 18px; color: #94A3B8; font-size: 12px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08);">
                This inquiry was submitted via the Digital Shine website contact form.
              </div>
            </div>

            <div style="padding: 14px 28px 18px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.15); text-align: center; color: rgba(148,163,184,0.95); font-size: 12px;">
              Tip: Reply directly to <span style="color: #06B6D4; font-weight: 800;">${data.email}</span>
            </div>
          </div>
        `,
        });

        req.log.info({ email: data.email }, "Contact form email sent");
      } catch (err) {
        req.log.error({ err }, "Failed to send email");
        res.status(500).json({ success: false, error: "Failed to send message. Please try again." });
        return;
      }
    } else {
      req.log.warn("SMTP not configured — contact form submission logged only");
      req.log.info({ contact: data }, "Contact form submission (no email sent)");
    }

    res.json({ success: true });
  } catch (err) {
    // Guarantee JSON response even for unexpected errors.
    req.log?.error({ err }, "Unexpected error in contact route");
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: "Failed to process message." });
    }
  }
});

export default router;

