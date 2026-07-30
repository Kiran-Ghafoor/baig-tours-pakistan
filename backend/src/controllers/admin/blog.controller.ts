import { Request, Response, NextFunction } from "express";
import { getWriteClient, getReadClient } from "../../utils/sanity";
import { AppError } from "../../middlewares/error.middleware";

export async function listBlogs(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getReadClient();
    const blogs = await client.fetch(`*[_type == "blogPost"] | order(date desc)`);
    res.json({ blogs });
  } catch (err) {
    next(err);
  }
}

export async function createBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getWriteClient();
    const doc = await client.create({ _type: "blogPost", ...req.body });
    res.status(201).json({ blog: doc });
  } catch (err) {
    next(err);
  }
}

export async function updateBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const client = getWriteClient();
    const doc = await client.patch(id).set(req.body).commit();
    if (!doc) throw new AppError("Blog not found", 404);
    res.json({ blog: doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    const client = getWriteClient();
    await client.delete(id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
}
