import { Request, Response, NextFunction } from "express";
import { getWriteClient, getReadClient } from "../../utils/sanity";
import { AppError } from "../../middlewares/error.middleware";

export async function listReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getReadClient();
    const { status } = req.query;
    let filter = "";
    if (status === "approved") filter = ` && rating >= 4`;
    else if (status === "pending") filter = ` && rating < 4`;
    const reviews = await client.fetch(`*[_type == "testimonial"${filter}] | order(date desc)`);
    res.json({ reviews });
  } catch (err) {
    next(err);
  }
}

export async function createReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getWriteClient();
    const doc = await client.create({ _type: "testimonial", ...req.body });
    res.status(201).json({ review: doc });
  } catch (err) {
    next(err);
  }
}

export async function updateReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const client = getWriteClient();
    const doc = await client.patch(id).set(req.body).commit();
    if (!doc) throw new AppError("Review not found", 404);
    res.json({ review: doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const client = getWriteClient();
    await client.delete(id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    next(err);
  }
}
