import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { z } from "zod";

const router: IRouter = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

router.post("/contact", async (req, res) => {
  req.log.info({ body: req.body }, "[contact] POST /contact hit");

  try {
    const parsed = ContactSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: "Invalid form data",
      });
    }

    const data = parsed.data;

    await resend.emails.send({
      from: "Digital Shine <onboarding@resend.dev>",
      to: "digitalshine.work@gmail.com",
      replyTo: data.email,
      subject: `🚀 New Project Inquiry — ${data.name}`,

      html: `
      <div style="font-family:Arial,sans-serif;background:#050816;color:white;padding:30px;border-radius:15px;max-width:700px;margin:auto;">
        <h1 style="color:#6C63FF;">🚀 New Project Inquiry</h1>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px;"><b>Name</b></td>
            <td>${data.name}</td>
          </tr>

          <tr>
            <td style="padding:10px;"><b>Email</b></td>
            <td>${data.email}</td>
          </tr>

          <tr>
            <td style="padding:10px;"><b>Phone</b></td>
            <td>${data.phone || "-"}</td>
          </tr>

          <tr>
            <td style="padding:10px;"><b>Company</b></td>
            <td>${data.company || "-"}</td>
          </tr>

          <tr>
            <td style="padding:10px;"><b>Budget</b></td>
            <td>${data.budget || "-"}</td>
          </tr>
        </table>

        <hr style="margin:25px 0;">

        <h3>Project Details</h3>

        <p style="line-height:1.8;">
          ${data.message.replace(/\n/g, "<br>")}
        </p>

        <hr style="margin-top:30px;">

        <p style="font-size:12px;color:#94A3B8;">
          Submitted from Digital Shine Website
        </p>
      </div>
      `,
    });

    req.log.info("Email sent successfully");

    return res.json({
      success: true,
    });
  } catch (err) {
    req.log.error({ err }, "Resend Error");

    return res.status(500).json({
      success: false,
      error: "Failed to send email.",
    });
  }
});

export default router;