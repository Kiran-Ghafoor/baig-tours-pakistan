import { Request, Response, NextFunction } from "express";
import { Subscriber } from "../models/subscriber.model";

export async function subscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email } = req.body;

    const existing = await Subscriber.findOne({ email });

    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
      }
      res.status(200).json({ message: "Already subscribed" });
      return;
    }

    await Subscriber.create({ email });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    next(err);
  }
}
