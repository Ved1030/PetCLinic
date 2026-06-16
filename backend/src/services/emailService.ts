import { config } from "../config";
import { Appointment, ContactMessage } from "../types";
import { logger } from "../utils/logger";
import type { Transporter } from "nodemailer";

type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

let transporter: Transporter | null = null;

function isEmailConfigured(): boolean {
  return !!(config.emailHost && config.emailUser && config.emailPass);
}

async function getTransporter(): Promise<Transporter | null> {
  if (transporter) return transporter;

  if (!isEmailConfigured()) {
    logger.warn("EMAIL NOT CONFIGURED: EMAIL_HOST, EMAIL_USER, or EMAIL_PASS is missing in .env");
    return null;
  }

  try {
    const nodemailer = await import("nodemailer");
    transporter = nodemailer.default.createTransport({
      host: config.emailHost,
      port: config.emailPort,
      secure: config.emailPort === 465,
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
      tls: {
        rejectUnauthorized: config.isProd,
      },
    });

    logger.info("SMTP transporter created successfully");
    logger.debug(`SMTP config: host=${config.emailHost}, port=${config.emailPort}, user=${config.emailUser}, from=${config.emailFrom}`);

    return transporter;
  } catch (error) {
    logger.error("Failed to create SMTP transporter:", error);
    return null;
  }
}

export async function verifyEmailConnection(): Promise<boolean> {
  const t = await getTransporter();
  if (!t) {
    logger.error("SMTP VERIFY FAILED: Transporter could not be created (check .env email config)");
    return false;
  }

  try {
    logger.info("SMTP connection verification: starting...");
    const success = await t.verify();
    logger.info(`SMTP connection verification: SUCCESS`);
    return true;
  } catch (error) {
    logger.error("SMTP connection verification: FAILED", error);
    transporter = null;
    return false;
  }
}

async function sendEmail(options: EmailOptions): Promise<void> {
  const t = await getTransporter();

  if (!t) {
    logger.info(`[EMAIL MOCK] To: ${options.to}`);
    logger.info(`[EMAIL MOCK] Subject: ${options.subject}`);
    logger.info(`[EMAIL MOCK] Body: ${options.html.substring(0, 200)}...`);
    logger.warn("Email not actually sent — SMTP not configured. Set EMAIL_HOST, EMAIL_USER, EMAIL_PASS in .env");
    return;
  }

  try {
    logger.info(`EMAIL SENDING STARTED: to=${options.to}, subject="${options.subject}"`);

    const info = await t.sendMail({
      from: `"THE OZONE VETS" <${config.emailFrom}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    logger.info(`EMAIL SENT SUCCESSFULLY: to=${options.to}, subject="${options.subject}"`);
    logger.debug(`Email delivery response: messageId=${info.messageId}, accepted=${JSON.stringify(info.accepted)}, rejected=${JSON.stringify(info.rejected)}`);

    if (info.rejected && info.rejected.length > 0) {
      logger.warn(`Email rejected for some recipients: ${JSON.stringify(info.rejected)}`);
    }
  } catch (error) {
    logger.error(`EMAIL SENDING FAILED: to=${options.to}, subject="${options.subject}"`, error);
    throw error;
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export const emailService = {
  async sendConfirmation(appointment: Appointment): Promise<void> {
    const subject = "Appointment Confirmation - THE OZONE VETS";
    const html = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #FAF7F2; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4A3A2A; font-size: 28px; margin: 0;">THE OZONE VETS</h1>
          <p style="color: #B98B5D; font-size: 14px; margin: 5px 0 0;">Advanced Veterinary Care With Compassion</p>
        </div>

        <div style="background: white; border-radius: 12px; padding: 25px; border: 1px solid #EFE7DD;">
          <h2 style="color: #4A3A2A; font-size: 20px; margin: 0 0 20px;">Appointment Confirmed ✅</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #7B6A58; font-size: 14px; width: 120px;">Service</td>
              <td style="padding: 8px 0; color: #4A3A2A; font-size: 14px; font-weight: 600;">${appointment.service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7B6A58; font-size: 14px;">Date</td>
              <td style="padding: 8px 0; color: #4A3A2A; font-size: 14px; font-weight: 600;">${formatDate(appointment.date)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7B6A58; font-size: 14px;">Time</td>
              <td style="padding: 8px 0; color: #4A3A2A; font-size: 14px; font-weight: 600;">${formatTime(appointment.time)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7B6A58; font-size: 14px;">Pet Name</td>
              <td style="padding: 8px 0; color: #4A3A2A; font-size: 14px; font-weight: 600;">${appointment.petName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7B6A58; font-size: 14px;">Owner</td>
              <td style="padding: 8px 0; color: #4A3A2A; font-size: 14px; font-weight: 600;">${appointment.ownerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7B6A58; font-size: 14px;">Confirmation</td>
              <td style="padding: 8px 0; color: #4A3A2A; font-size: 14px; font-weight: 600;">${appointment.id}</td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #EFE7DD;">
          <h3 style="color: #4A3A2A; font-size: 16px; margin: 0 0 10px;">📍 Clinic Information</h3>
          <p style="color: #7B6A58; font-size: 13px; line-height: 1.6; margin: 0;">
            C3 SARANGA, Lokhandwala Complex Market<br>
            Bungalow, 3rd Cross Road, Opp. Cliff Tower<br>
            Andheri West, Mumbai 400053<br>
            Phone: +91 98204 45010
          </p>
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <p style="color: #7B6A58; font-size: 12px; line-height: 1.5;">
            Please arrive 10 minutes before your appointment.<br>
            To reschedule or cancel, please call us at +91 98204 45010.
          </p>
        </div>
      </div>
    `;

    await sendEmail({ to: appointment.email, subject, html });
  },

  async sendClinicNotification(appointment: Appointment): Promise<void> {
    const subject = `New Appointment: ${appointment.service} - ${appointment.ownerName}`;
    const html = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 30px;">
        <h2 style="color: #4A3A2A;">New Appointment Booking</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #7B6A58;">Service</td><td style="font-weight: 600;">${appointment.service}</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Date</td><td style="font-weight: 600;">${formatDate(appointment.date)}</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Time</td><td style="font-weight: 600;">${formatTime(appointment.time)}</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Pet</td><td style="font-weight: 600;">${appointment.petName} (${appointment.petType} - ${appointment.breed})</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Owner</td><td style="font-weight: 600;">${appointment.ownerName}</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Phone</td><td style="font-weight: 600;">${appointment.phone}</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Email</td><td style="font-weight: 600;">${appointment.email}</td></tr>
          ${appointment.reason ? `<tr><td style="padding: 6px 0; color: #7B6A58;">Reason</td><td style="font-weight: 600;">${appointment.reason}</td></tr>` : ""}
        </table>
      </div>
    `;

    await sendEmail({ to: config.clinicEmail, subject, html });
  },

  async sendContactConfirmation(inquiry: ContactMessage): Promise<void> {
    const subject = "Thank You for Contacting THE OZONE VETS";
    const html = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #FAF7F2; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4A3A2A; font-size: 28px; margin: 0;">THE OZONE VETS</h1>
          <p style="color: #B98B5D; font-size: 14px; margin: 5px 0 0;">Advanced Veterinary Care With Compassion</p>
        </div>

        <div style="background: white; border-radius: 12px; padding: 25px; border: 1px solid #EFE7DD;">
          <h2 style="color: #4A3A2A; font-size: 20px; margin: 0 0 10px;">Thank You for Reaching Out 🙏</h2>
          <p style="color: #7B6A58; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
            Dear ${inquiry.name},<br><br>
            Thank you for contacting THE OZONE VETS. Our veterinary team has received your inquiry and will get back to you shortly.
          </p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #7B6A58; font-size: 14px; width: 120px;">Pet Name</td>
              <td style="padding: 8px 0; color: #4A3A2A; font-size: 14px; font-weight: 600;">${inquiry.petName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #7B6A58; font-size: 14px;">Pet Type</td>
              <td style="padding: 8px 0; color: #4A3A2A; font-size: 14px; font-weight: 600;">${inquiry.petType}</td>
            </tr>
            ${inquiry.message ? `<tr><td style="padding: 8px 0; color: #7B6A58; font-size: 14px; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #4A3A2A; font-size: 14px;">${inquiry.message}</td></tr>` : ""}
          </table>
        </div>

        <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #EFE7DD;">
          <h3 style="color: #4A3A2A; font-size: 16px; margin: 0 0 10px;">📍 THE OZONE VETS</h3>
          <p style="color: #7B6A58; font-size: 13px; line-height: 1.6; margin: 0;">
            C3 SARANGA, Lokhandwala Complex Market<br>
            Bungalow, 3rd Cross Road, Opp. Cliff Tower<br>
            Andheri West, Mumbai 400053<br>
            Phone: +91 98204 45010
          </p>
        </div>
      </div>
    `;

    await sendEmail({ to: inquiry.email, subject, html });
  },

  async sendContactClinicNotification(inquiry: ContactMessage): Promise<void> {
    const subject = `New Inquiry: ${inquiry.name} - ${inquiry.petName} (${inquiry.petType})`;
    const html = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 30px;">
        <h2 style="color: #4A3A2A;">New Contact Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #7B6A58; width: 120px;">Name</td><td style="font-weight: 600;">${inquiry.name}</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Phone</td><td style="font-weight: 600;">${inquiry.phone}</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Email</td><td style="font-weight: 600;">${inquiry.email}</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Pet Name</td><td style="font-weight: 600;">${inquiry.petName}</td></tr>
          <tr><td style="padding: 6px 0; color: #7B6A58;">Pet Type</td><td style="font-weight: 600;">${inquiry.petType}</td></tr>
          ${inquiry.message ? `<tr><td style="padding: 6px 0; color: #7B6A58; vertical-align: top;">Message</td><td style="font-weight: 600;">${inquiry.message}</td></tr>` : ""}
        </table>
      </div>
    `;

    await sendEmail({ to: config.clinicEmail, subject, html });
  },
};
