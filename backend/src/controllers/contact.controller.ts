import { Request, Response, NextFunction } from "express";
import { ContactSubmission } from "../models/contact-submission.model";
import { sendEmail, customerContactConfirmation, companyContactNotification } from "../utils/email";

export async function createContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, phone, message } = req.body;

    await ContactSubmission.create({ name, email, phone, message });

    sendEmail({ ...customerContactConfirmation({ name, message }), to: email }).catch((err) => console.error("Failed to send customer confirmation email:", err));
    sendEmail(companyContactNotification({ name, email, phone, message })).catch((err) => console.error("Failed to send company notification email:", err));

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
}
