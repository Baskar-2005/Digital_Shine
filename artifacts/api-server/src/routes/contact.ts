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
        subject: `New Inquiry from ${data.name} — Digital Shine`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050816; color: #ffffff; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #6C63FF, #06B6D4); padding: 32px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800;">NEW PROJECT INQUIRY</h1>
              <p style="margin: 8px 0 0; opacity: 0.9;">Digital Shine Agency</p>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8; width: 120px;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-weight: 600;">${data.name}</td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);"><a href="mailto:${data.email}" style="color: #06B6D4;">${data.email}</a></td></tr>
                ${data.phone ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${data.phone}</td></tr>` : ""}
                ${data.company ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8;">Company</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">${data.company}</td></tr>` : ""}
                ${data.budget ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #94A3B8;">Budget</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);"><span style="background: rgba(108,99,255,0.2); color: #6C63FF; padding: 4px 12px; border-radius: 20px; font-weight: 600;">${data.budget}</span></td></tr>` : ""}
              </table>
              <div style="margin-top: 24px;">
                <p style="color: #94A3B8; margin: 0 0 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Project Details</p>
                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; line-height: 1.7;">${data.message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; color: #94A3B8; font-size: 12px;">
              This inquiry was submitted via the Digital Shine website contact form.
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
});

export default router;
