import { Request, Response, NextFunction } from "express";
import { ContactSubmission } from "../../models/contact-submission.model";
import { AppError } from "../../middlewares/error.middleware";
import { parseSort } from "../../utils/sort";

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function listContacts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { isRead, q, from, to, sort } = req.query;
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (isRead === "true") filter.isRead = true;
    else if (isRead === "false") filter.isRead = false;

    if (q && typeof q === "string") {
      const safe = escapeRegex(q);
      filter.$or = [
        { name: { $regex: safe, $options: "i" } },
        { email: { $regex: safe, $options: "i" } },
        { phone: { $regex: safe, $options: "i" } },
        { message: { $regex: safe, $options: "i" } },
      ];
    }

    if (from || to) {
      const dateFilter: Record<string, Date> = {};
      if (from && typeof from === "string") dateFilter.$gte = new Date(from);
      if (to && typeof to === "string") dateFilter.$lte = new Date(to);
      filter.createdAt = dateFilter;
    }

    const sortObj = parseSort(sort as string | undefined);

    const [contacts, total] = await Promise.all([
      ContactSubmission.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
      ContactSubmission.countDocuments(filter),
    ]);

    res.json({ contacts, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
}

export async function getContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const contact = await ContactSubmission.findById(id).lean();
    if (!contact) throw new AppError("Contact message not found", 404);
    res.json({ contact });
  } catch (err) {
    next(err);
  }
}

export async function updateContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const allowed = ["isRead"];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const contact = await ContactSubmission.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true }).lean();
    if (!contact) throw new AppError("Contact message not found", 404);

    res.json({ contact });
  } catch (err) {
    next(err);
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const contact = await ContactSubmission.findByIdAndDelete(id).lean();
    if (!contact) throw new AppError("Contact message not found", 404);
    res.json({ message: "Contact message deleted" });
  } catch (err) {
    next(err);
  }
}
