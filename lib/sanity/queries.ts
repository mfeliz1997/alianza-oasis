import { groq } from "next-sanity";

export const HOME_PAGE_QUERY = groq`
  *[_id == "home"][0] {
    title,
    subtitle,
    heroVideoUrl,
    "heroVideoFileUrl": heroVideo.asset->url,
    welcomeEyebrow,
    welcomeTitle,
    welcomeSubtitleEn,
    scheduleTitle,
    scheduleIntro,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref,
    heroImage {
      asset->{ _id, metadata { lqip, dimensions } },
      alt
    }
  }
`;

export const SERVICIOS_QUERY = groq`
  *[_type == "servicio"] | order(nombre asc) {
    _id,
    nombre,
    descripcion,
    imagen {
      asset->{ _id, metadata { lqip, dimensions } },
      alt
    }
  }
`;

export const UPCOMING_EVENTS_QUERY = groq`
  *[_type == "event" && startDate >= now()] | order(startDate asc) [0...12] {
    _id,
    title,
    "slug": slug.current,
    startDate,
    endDate,
    isFeatured,
    plainDescription,
    location,
    image {
      asset->{ _id, metadata { lqip, dimensions } },
      alt
    }
  }
`;

export const NEXT_LIVE_STREAM_QUERY = groq`
  *[_type == "liveStream" && (
    isActive == true ||
    scheduledStart >= now() - 3600 ||
    (scheduledEnd != null && scheduledEnd >= now())
  )] | order(scheduledStart asc) [0] {
    _id,
    title,
    "slug": slug.current,
    scheduledStart,
    scheduledEnd,
    youtubeVideoId,
    youtubeBroadcastId,
    plainSummary,
    isActive,
    thumbnail {
      asset->{ _id, metadata { lqip, dimensions } },
      alt
    }
  }
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_id == "siteSettings"][0] {
    siteTitle,
    siteTitleEn,
    tagline,
    logo {
      asset->{ _id, metadata { lqip, dimensions } },
      alt
    },
    brandColors,
    socialUrls,
    contactPhone,
    contactEmail,
    contactIntro,
    address,
    directionsTrain,
    directionsParking,
    mapEmbedUrl,
    aboutTitle,
    aboutIntro,
    aboutNote,
    giving,
    defaultHero {
      headline,
      subheadline,
      backgroundVideoUrl
    },
    youtubeChannelId
  }
`;

export const LEADERS_QUERY = groq`
  *[_type == "leader"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    shortBio,
    photo {
      asset->{ _id, metadata { lqip, dimensions } },
      alt
    },
    socialLinks,
    order
  }
`;

export const MINISTRIES_QUERY = groq`
  *[_type == "ministry"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    regularSchedule,
    plainDescription,
    coverImage {
      asset->{ _id, metadata { lqip, dimensions } },
      alt
    },
    leaderInCharge->{
      name,
      role,
      "slug": slug.current
    }
  }
`;
