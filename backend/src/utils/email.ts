import nodemailer from "nodemailer";
import { env } from "../config/env";

export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

let transport: nodemailer.Transporter | null = null;

function getTransport() {
  if (transport) return transport;
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass) return null;
  transport = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: { user: env.smtpUser, pass: env.smtpPass },
  });
  return transport;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const { to, subject, text, html } = payload;

  if (env.nodeEnv === "development") {
    console.log(`[DEV EMAIL] To: ${to}`);
    console.log(`[DEV EMAIL] Subject: ${subject}`);
    console.log(`[DEV EMAIL] Body: ${text}`);
    return;
  }

  const transporter = getTransport();

  if (!transporter) {
    console.warn("SMTP not configured — email not sent");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"${env.companyName}" <${env.emailFrom}>`,
      to,
      subject,
      text,
      html: html ?? text,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

/* ── Pre-built email templates ── */

export function customerContactConfirmation(params: {
  name: string;
  message: string;
}): EmailPayload {
  return {
    to: "",
    subject: "We've received your message – Baig Tours Pakistan",
    text: [
      `Hi ${params.name},`,
      "",
      "Thank you for reaching out! We've received your message and a Baig Tours travel consultant will get back to you shortly.",
      "",
      `Your message:`,
      params.message,
      "",
      "Warm regards,",
      "Baig Tours Pakistan",
    ].join("\n"),
  };
}

export function companyContactNotification(params: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): EmailPayload {
  return {
    to: env.companyEmail,
    subject: `New Contact Form Submission – ${params.name}`,
    text: [
      `New contact form submission received.`,
      "",
      `Name: ${params.name}`,
      `Email: ${params.email}`,
      `Phone: ${params.phone}`,
      `Message: ${params.message}`,
      "",
      `Sent at: ${new Date().toISOString()}`,
    ].join("\n"),
  };
}

export function bookingConfirmationEmail(params: {
  fullName: string;
  tourTitle: string;
  travelDate: string;
  travelers: number;
  amount: number;
  phone: string;
}): EmailPayload {
  return {
    to: "",
    subject: "Booking Request Received – Baig Tours Pakistan",
    text: [
      `Hi ${params.fullName},`,
      "",
      `We've received your booking request for ${params.tourTitle}.`,
      "",
      `Travel Date: ${params.travelDate}`,
      `Travelers: ${params.travelers}`,
      `Estimated Total: PKR ${params.amount.toLocaleString()}`,
      "",
      `A Baig Tours consultant will contact you at ${params.phone} within a few hours to confirm availability.`,
      "",
      "Thank you for choosing Baig Tours Pakistan!",
    ].join("\n"),
  };
}
