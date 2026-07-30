import { Request, Response, NextFunction } from "express";
import { Booking } from "../../models/booking.model";
import { AppError } from "../../middlewares/error.middleware";
import { parseSort } from "../../utils/sort";

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const ALLOWED_STATUSES = ["pending", "confirmed", "cancelled", "completed"] as const;

function parsePagination(query: Record<string, unknown>) {
  const page = Math.max(1, parseInt(query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit as string) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

export async function listBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status, q, from, to, sort } = req.query;
    const { page, limit, skip } = parsePagination(req.query);

    const filter: Record<string, unknown> = {};

    if (status && typeof status === "string" && (ALLOWED_STATUSES as readonly string[]).includes(status)) {
      filter.status = status;
    }

    if (q && typeof q === "string") {
      const safe = escapeRegex(q);
      filter.$or = [
        { fullName: { $regex: safe, $options: "i" } },
        { email: { $regex: safe, $options: "i" } },
        { tourTitle: { $regex: safe, $options: "i" } },
      ];
    }

    if (from || to) {
      const dateFilter: Record<string, string> = {};
      if (from && typeof from === "string") dateFilter.$gte = from;
      if (to && typeof to === "string") dateFilter.$lte = to;
      filter.travelDate = dateFilter;
    }

    const sortObj = parseSort(sort as string | undefined);

    const [bookings, total] = await Promise.all([
      Booking.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
      Booking.countDocuments(filter),
    ]);

    res.json({ bookings, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
}

export async function getBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const booking = await Booking.findById(id).lean();
    if (!booking) throw new AppError("Booking not found", 404);
    res.json({ booking });
  } catch (err) {
    next(err);
  }
}

export async function updateBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const allowed = ["status", "travelDate", "travelers", "notes"];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    if (updates.status && !["pending", "confirmed", "cancelled", "completed"].includes(updates.status as string)) {
      throw new AppError("Invalid status", 400);
    }

    const booking = await Booking.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true }).lean();
    if (!booking) throw new AppError("Booking not found", 404);

    res.json({ booking });
  } catch (err) {
    next(err);
  }
}

export async function deleteBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const booking = await Booking.findByIdAndDelete(id).lean();
    if (!booking) throw new AppError("Booking not found", 404);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    next(err);
  }
}

export async function exportBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.query;
    const filter: Record<string, unknown> = {};
    if (status && typeof status === "string" && ["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 }).lean();

    const header = "ID,Customer,Email,Phone,Tour,Travel Date,Travelers,Amount,Status,Created";
    const rows = bookings.map(
      (b) =>
        `${b._id},"${b.fullName}","${b.email}","${b.phone}","${b.tourTitle}",${b.travelDate},${b.travelers},${b.amount},${b.status},${b.createdAt?.toISOString() ?? ""}`
    );

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=bookings.csv");
    res.send([header, ...rows].join("\n"));
  } catch (err) {
    next(err);
  }
}
