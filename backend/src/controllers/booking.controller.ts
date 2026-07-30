import { Request, Response, NextFunction } from "express";
import { Booking } from "../models/booking.model";
import { Customer } from "../models/customer.model";
import { sendEmail, bookingConfirmationEmail } from "../utils/email";
import { getReadClient } from "../utils/sanity";
import { AppError } from "../middlewares/error.middleware";

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

export async function createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { tourSlug, fullName, email, phone, travelDate, travelers, notes } = req.body;

    let tourTitle: string;
    let price: number;

    try {
      const client = getReadClient();
      const tour = await client.fetch(`*[_type == "tourPackage" && slug.current == $tourSlug][0]{title,price}`, { tourSlug });
      if (!tour) throw new AppError("Tour not found", 404);
      tourTitle = tour.title;
      price = tour.price;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError("Failed to fetch tour details", 500);
    }

    const amount = price * travelers;

    const booking = await Booking.create({
      tourSlug,
      tourTitle,
      fullName,
      email,
      phone,
      travelDate,
      travelers,
      notes,
      amount,
    });

    await Customer.findOneAndUpdate(
      { email },
      { $set: { name: fullName, phone, status: "active" }, $inc: { totalBookings: 1, totalSpend: amount } },
      { upsert: true }
    );

    const emailPayload = bookingConfirmationEmail({ fullName, tourTitle, travelDate: travelDate.toISOString?.() ?? travelDate, travelers, amount, phone });
    sendEmail({ ...emailPayload, to: email }).catch((err) => console.error("Failed to send booking confirmation email:", err));

    res.status(201).json({ id: booking._id, message: "Booking request received" });
  } catch (err) {
    next(err);
  }
}
