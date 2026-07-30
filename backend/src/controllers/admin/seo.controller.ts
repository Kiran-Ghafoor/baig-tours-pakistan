import { Request, Response, NextFunction } from "express";
import { getWriteClient, getReadClient } from "../../utils/sanity";

export async function getSeo(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getReadClient();
    const settings = await client.fetch(`*[_type == "siteSettings"][0]{ _id, metaTitle, metaDescription, ogImage, keywords }`);
    res.json({ seo: settings ?? {} });
  } catch (err) {
    next(err);
  }
}

export async function updateSeo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const client = getWriteClient();
    const settings = await client.fetch(`*[_type == "siteSettings"][0]._id`);
    if (settings) {
      await client.patch(settings).set(req.body).commit();
    } else {
      await client.create({ _type: "siteSettings", ...req.body });
    }
    res.json({ message: "SEO settings saved" });
  } catch (err) {
    next(err);
  }
}
