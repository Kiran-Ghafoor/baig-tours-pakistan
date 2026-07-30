import { Request, Response, NextFunction } from "express";
import { Booking } from "../../models/booking.model";
import { Customer } from "../../models/customer.model";
import { getReadClient } from "../../utils/sanity";

export async function search(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const q = req.query.q as string;
    if (!q || q.length < 2) {
      res.json({ results: { bookings: [], customers: [], tours: [] }, total: 0 });
      return;
    }

    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = { $regex: safe, $options: "i" };

    const [bookings, customers, sanityTours] = await Promise.all([
      Booking.find({ $or: [{ fullName: regex }, { email: regex }, { phone: regex }, { tourTitle: regex }] }).limit(10).lean(),
      Customer.find({ $or: [{ name: regex }, { email: regex }, { phone: regex }] }).limit(10).lean(),
      getReadClient()
        .fetch(`*[_type == "tourPackage" && (title match $q || destination->name match $q)]{ _id, title, slug, price }`, { q: `*${q}*` })
        .catch(() => []),
    ]);

    res.json({ results: { bookings, customers, tours: sanityTours }, total: bookings.length + customers.length + sanityTours.length });
  } catch (err) {
    next(err);
  }
}
