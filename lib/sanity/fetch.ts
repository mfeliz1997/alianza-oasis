import { unstable_cache } from "next/cache";
import { sanityClient } from "./client";
import {
  HOME_PAGE_QUERY,
  LEADERS_QUERY,
  MINISTRIES_QUERY,
  NEXT_LIVE_STREAM_QUERY,
  SERVICIOS_QUERY,
  SITE_SETTINGS_QUERY,
  UPCOMING_EVENTS_QUERY,
} from "./queries";
import type {
  HomePage,
  Leader,
  LiveStream,
  Ministry,
  SanityEvent,
  Servicio,
  SiteSettings,
} from "@/types/sanity";

const REVALIDATE_SECONDS = 60;

async function fetchSanity<T>(
  query: string,
  tags: string[],
  fallback: T
): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, {}, {
      next: { revalidate: REVALIDATE_SECONDS, tags },
    });
  } catch {
    return fallback;
  }
}

export const getHomePage = unstable_cache(
  () => fetchSanity<HomePage | null>(HOME_PAGE_QUERY, ["home"], null),
  ["home-page"],
  { revalidate: REVALIDATE_SECONDS, tags: ["home"] }
);

export const getServicios = unstable_cache(
  () => fetchSanity<Servicio[]>(SERVICIOS_QUERY, ["servicio"], []),
  ["servicios"],
  { revalidate: REVALIDATE_SECONDS, tags: ["servicio"] }
);

export const getUpcomingEvents = unstable_cache(
  () =>
    fetchSanity<SanityEvent[]>(UPCOMING_EVENTS_QUERY, ["events"], []),
  ["upcoming-events"],
  { revalidate: REVALIDATE_SECONDS, tags: ["events"] }
);

export const getNextLiveStream = unstable_cache(
  () =>
    fetchSanity<LiveStream | null>(
      NEXT_LIVE_STREAM_QUERY,
      ["liveStream"],
      null
    ),
  ["next-live-stream"],
  { revalidate: 30, tags: ["liveStream"] }
);

export const getSiteSettings = unstable_cache(
  () =>
    fetchSanity<SiteSettings | null>(
      SITE_SETTINGS_QUERY,
      ["siteSettings"],
      null
    ),
  ["site-settings"],
  { revalidate: 300, tags: ["siteSettings"] }
);

export const getLeaders = unstable_cache(
  () => fetchSanity<Leader[]>(LEADERS_QUERY, ["leaders"], []),
  ["leaders"],
  { revalidate: REVALIDATE_SECONDS, tags: ["leaders"] }
);

export const getMinistries = unstable_cache(
  () => fetchSanity<Ministry[]>(MINISTRIES_QUERY, ["ministries"], []),
  ["ministries"],
  { revalidate: REVALIDATE_SECONDS, tags: ["ministries"] }
);
