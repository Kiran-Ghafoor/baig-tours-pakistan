import { Request, Response, NextFunction } from "express";
import { Subscriber } from "../../models/subscriber.model";
import { AppError } from "../../middlewares/error.middleware";
import { parseSort } from "../../utils/sort";

export async function listSubscribers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { isActive, q, sort } = req.query;
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (isActive === "true") filter.isActive = true;
    else if (isActive === "false") filter.isActive = false;

    if (q && typeof q === "string") {
      const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.email = { $regex: safe, $options: "i" };
    }

    const sortObj = parseSort(sort as string | undefined);

    const [subscribers, total] = await Promise.all([
      Subscriber.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
      Subscriber.countDocuments(filter),
    ]);

    res.json({ subscribers, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
}

export async function deleteSubscriber(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const subscriber = await Subscriber.findByIdAndDelete(id).lean();
    if (!subscriber) throw new AppError("Subscriber not found", 404);
    res.json({ message: "Subscriber deleted" });
  } catch (err) {
    next(err);
  }
}
