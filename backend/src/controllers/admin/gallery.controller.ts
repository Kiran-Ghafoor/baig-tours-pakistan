import { Request, Response, NextFunction } from "express";
import { getWriteClient, getReadClient } from "../../utils/sanity";
import { AppError } from "../../middlewares/error.middleware";

export async function listGallery(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getReadClient();
    const gallery = await client.fetch(`*[_type == "galleryImage"] | order(order asc)`);
    res.json({ gallery });
  } catch (err) {
    next(err);
  }
}

export async function uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getWriteClient();
    const doc = await client.create({ _type: "galleryImage", ...req.body });
    res.status(201).json({ image: doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const client = getWriteClient();
    await client.delete(id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    next(err);
  }
}
