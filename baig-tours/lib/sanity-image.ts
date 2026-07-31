import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./sanity-client";

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity is not configured");
  }
  return builder.image(source);
}
