import type { MetadataRoute } from "next";
import { tours } from "@/data/tours";
import { destinations, blogPosts } from "@/data/content";

const BASE_URL = "https://www.baigtourspakistan.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/tours",
    "/destinations",
    "/gallery",
    "/blogs",
    "/about",
    "/contact",
    "/booking",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const tourRoutes = tours.map((t) => ({
    url: `${BASE_URL}/tours/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${BASE_URL}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${BASE_URL}/blogs/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...tourRoutes, ...destinationRoutes, ...blogRoutes];
}
