import { createClient } from "next-sanity";

/** Placeholder permite `next build` sin .env; reemplazar en producción. */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "48pjmhf7";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: process.env.NODE_ENV === "development",
    studioUrl: "/studio",
  },
});
