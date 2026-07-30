import { Request, Response, NextFunction } from "express";
import { getWriteClient, getReadClient } from "../../utils/sanity";
import { AppError } from "../../middlewares/error.middleware";

export async function listTours(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getReadClient();
    const tours = await client.fetch(`*[_type == "tourPackage"] | order(order asc)`);
    res.json({ tours });
  } catch (err) {
    next(err);
  }
}

export async function createTour(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getWriteClient();
    const doc = await client.create({ _type: "tourPackage", ...req.body });
    res.status(201).json({ tour: doc });
  } catch (err) {
    next(err);
  }
}

export async function updateTour(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const client = getWriteClient();
    const doc = await client.patch(id).set(req.body).commit();
    if (!doc) throw new AppError("Tour not found", 404);
    res.json({ tour: doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteTour(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const client = getWriteClient();
    await client.delete(id);
    res.json({ message: "Tour deleted" });
  } catch (err) {
    next(err);
  }
}
