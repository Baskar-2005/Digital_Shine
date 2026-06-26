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
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>New Project Inquiry</title>
</head>

<body style="margin:0;padding:40px;background:#eef2ff;font-family:Inter,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="700" cellpadding="0" cellspacing="0" style="background:#050816;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35);">

<!-- Header -->
<tr>
<td style="
padding:60px 40px;
text-align:center;
background:
radial-gradient(circle at top left,#06B6D4 0%,transparent 45%),
radial-gradient(circle at top right,#6C63FF 0%,transparent 45%),
linear-gradient(135deg,#6C63FF,#06B6D4);
">

<div style="
display:inline-block;
padding:12px 28px;
background:rgba(255,255,255,.15);
border:1px solid rgba(255,255,255,.25);
border-radius:999px;
color:white;
font-size:13px;
font-weight:700;
letter-spacing:2px;
text-transform:uppercase;
margin-bottom:25px;
">

🚀 DIGITAL SHINE

</div>

<h1 style="
margin:0;
font-size:36px;
font-weight:900;
color:white;
">

New Project Inquiry

</h1>

<p style="
margin-top:15px;
font-size:17px;
color:rgba(255,255,255,.85);
">

A new client has submitted the contact form.

</p>

</td>
</tr>

<!-- Client Information -->

<tr>

<td style="padding:45px;">

<h2 style="
margin-top:0;
color:white;
font-size:24px;
margin-bottom:30px;
">

👤 Client Information

</h2>

<table width="100%" cellpadding="16" cellspacing="0">

<tr>
<td style="background:#0B1228;border-radius:12px;border:1px solid #1E293B;">
<b style="color:#06B6D4;">Name</b><br><br>
<span style="color:white;font-size:18px;">${data.name}</span>
</td>
</tr>

<tr><td height="15"></td></tr>

<tr>
<td style="background:#0B1228;border-radius:12px;border:1px solid #1E293B;">
<b style="color:#06B6D4;">Email</b><br><br>
<a href="mailto:${data.email}"
style="color:white;text-decoration:none;font-size:18px;">
${data.email}
</a>
</td>
</tr>

<tr><td height="15"></td></tr>

<tr>
<td style="background:#0B1228;border-radius:12px;border:1px solid #1E293B;">
<b style="color:#06B6D4;">Phone</b><br><br>
<span style="color:white;font-size:18px;">
${data.phone || "-"}
</span>
</td>
</tr>

<tr><td height="15"></td></tr>

<tr>
<td style="background:#0B1228;border-radius:12px;border:1px solid #1E293B;">
<b style="color:#06B6D4;">Company</b><br><br>
<span style="color:white;font-size:18px;">
${data.company || "-"}
</span>
</td>
</tr>

<tr><td height="15"></td></tr>

<tr>
<td style="background:#0B1228;border-radius:12px;border:1px solid #1E293B;">
<b style="color:#06B6D4;">Budget</b><br><br>

<span style="
display:inline-block;
padding:10px 22px;
background:linear-gradient(135deg,#6C63FF,#06B6D4);
border-radius:999px;
font-size:15px;
font-weight:700;
color:white;
">

${data.budget || "-"}

</span>

</td>
</tr>

</table>

</td>

</tr>

<!-- Message -->

<tr>

<td style="padding:0 45px 45px;">

<h2 style="
color:white;
font-size:24px;
margin-bottom:20px;
">

💬 Project Details

</h2>

<div style="
background:#0B1228;
padding:30px;
border-radius:18px;
border:1px solid #1E293B;
color:#E2E8F0;
font-size:16px;
line-height:1.9;
">

${data.message.replace(/\n/g,"<br>")}

</div>

</td>

</tr>

<!-- CTA -->

<tr>

<td align="center" style="padding-bottom:45px;">

<a href="mailto:${data.email}"
style="
display:inline-block;
padding:18px 42px;
background:linear-gradient(135deg,#6C63FF,#06B6D4);
border-radius:999px;
text-decoration:none;
color:white;
font-size:17px;
font-weight:700;
">

Reply to Client →

</a>

</td>

</tr>

<!-- Footer -->

<tr>

<td style="
background:#030712;
padding:30px;
text-align:center;
">

<div style="
font-size:22px;
font-weight:900;
color:white;
margin-bottom:10px;
">

Digital Shine

</div>

<div style="
color:#94A3B8;
font-size:14px;
line-height:1.8;
">

This inquiry was submitted from the Digital Shine website.<br>

Reply directly to the client's email to continue the conversation.

</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>
</html>

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