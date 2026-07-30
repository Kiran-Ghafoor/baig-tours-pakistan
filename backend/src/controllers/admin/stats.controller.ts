import { Request, Response, NextFunction } from "express";
import { Booking } from "../../models/booking.model";
import { ContactSubmission } from "../../models/contact-submission.model";
import { Subscriber } from "../../models/subscriber.model";

export async function dashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
      totalContacts,
      unreadContacts,
      totalSubscribers,
      revenueResult,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ status: "cancelled" }),
      Booking.countDocuments({ status: "completed" }),
      ContactSubmission.countDocuments(),
      ContactSubmission.countDocuments({ isRead: false }),
      Subscriber.countDocuments({ isActive: true }),
      Booking.aggregate([
        { $match: { status: { $in: ["confirmed", "completed"] } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    res.json({
      stats: {
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          confirmed: confirmedBookings,
          cancelled: cancelledBookings,
          completed: completedBookings,
        },
        revenue: {
          total: revenueResult[0]?.total ?? 0,
        },
        contacts: {
          total: totalContacts,
          unread: unreadContacts,
        },
        subscribers: {
          total: totalSubscribers,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function revenueStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { from, to } = req.query;

    const match: Record<string, unknown> = {
      status: { $in: ["confirmed", "completed"] },
    };

    if (from || to) {
      const dateFilter: Record<string, Date> = {};
      if (from && typeof from === "string") dateFilter.$gte = new Date(from);
      if (to && typeof to === "string") dateFilter.$lte = new Date(to);
      match.createdAt = dateFilter;
    }

    const monthly = await Booking.aggregate([
      { $match: match },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          revenue: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          revenue: 1,
          count: 1,
          label: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
        },
      },
    ]);

    res.json({ revenue: monthly });
  } catch (err) {
    next(err);
  }
}

export async function bookingStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { from, to, group } = req.query;

    const match: Record<string, unknown> = {};
    if (from || to) {
      const dateFilter: Record<string, Date> = {};
      if (from && typeof from === "string") dateFilter.$gte = new Date(from);
      if (to && typeof to === "string") dateFilter.$lte = new Date(to);
      match.createdAt = dateFilter;
    }

    const groupBy =
      group === "status"
        ? "$status"
        : group === "tour"
          ? "$tourTitle"
          : "$status";

    const stats = await Booking.aggregate([
      ...(Object.keys(match).length > 0 ? [{ $match: match }] : []),
      { $group: { _id: groupBy, count: { $sum: 1 }, revenue: { $sum: "$amount" } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, label: "$_id", count: 1, revenue: 1 } },
    ]);

    res.json({ bookings: stats });
  } catch (err) {
    next(err);
  }
}

export async function contactStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [total, unread] = await Promise.all([
      ContactSubmission.countDocuments(),
      ContactSubmission.countDocuments({ isRead: false }),
    ]);

    res.json({ stats: { total, unread, read: total - unread } });
  } catch (err) {
    next(err);
  }
}

export async function subscriberStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [total, active] = await Promise.all([
      Subscriber.countDocuments(),
      Subscriber.countDocuments({ isActive: true }),
    ]);

    res.json({ stats: { total, active, inactive: total - active } });
  } catch (err) {
    next(err);
  }
}
