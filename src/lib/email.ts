import nodemailer from "nodemailer";
import { CONFIG } from "@/constants/config.constant";

const DEFAULT_SMTP_PORT = 587;
const DEFAULT_EMAIL_FROM = "High-Perfo <noreply@highperfo.com>";

const transporter = nodemailer.createTransport({
  host: CONFIG.SMTP_HOST ?? "",
  port: Number(CONFIG.SMTP_PORT) || DEFAULT_SMTP_PORT,
  secure: false,
  auth: {
    user: CONFIG.SMTP_USER ?? "",
    pass: CONFIG.SMTP_PASS ?? "",
  },
});

interface SendEmailOptions {
  to: string[];
  subject: string;
  html: string;
}

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailOptions): Promise<void> {
  await transporter.sendMail({
    from: CONFIG.EMAIL_FROM ?? DEFAULT_EMAIL_FROM,
    to: to.join(", "),
    subject,
    html,
  });
}
