import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getBlurDataURL(source: SanityImageSource): string {
  return urlFor(source).width(20).height(20).blur(50).url();
}
