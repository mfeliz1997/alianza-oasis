export type SanityImageAsset = {
  _id: string;
  metadata?: {
    lqip?: string;
    dimensions?: { width: number; height: number };
  };
};

export type SanityImage = {
  asset?: SanityImageAsset;
  alt?: string;
};

export type HomePage = {
  title?: string;
  subtitle?: string;
  heroVideoUrl?: string;
  heroVideoFileUrl?: string;
  heroImage?: SanityImage;
  welcomeEyebrow?: string;
  welcomeTitle?: string;
  welcomeSubtitleEn?: string;
  scheduleTitle?: string;
  scheduleIntro?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
};

export type Servicio = {
  _id: string;
  nombre: string;
  descripcion?: string;
  imagen?: SanityImage;
};

export type SanityEvent = {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate?: string;
  isFeatured: boolean;
  plainDescription?: string;
  location?: string;
  image?: SanityImage;
};

export type LiveStream = {
  _id: string;
  title: string;
  slug?: string;
  scheduledStart: string;
  scheduledEnd?: string;
  youtubeVideoId?: string;
  youtubeBroadcastId?: string;
  plainSummary?: string;
  isActive: boolean;
  thumbnail?: SanityImage;
};

export type DefaultHero = {
  headline?: string;
  subheadline?: string;
  backgroundImage?: SanityImage;
  backgroundVideoUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type BrandColors = {
  navy?: string;
  gold?: string;
  teal?: string;
  sky?: string;
  warm?: string;
};

export type SiteSettings = {
  siteTitle?: string;
  siteTitleEn?: string;
  tagline?: string;
  logo?: SanityImage;
  brandColors?: BrandColors;
  socialUrls?: Record<string, string>;
  contactPhone?: string;
  contactEmail?: string;
  contactIntro?: string;
  address?: string;
  directionsTrain?: string;
  directionsParking?: string;
  mapEmbedUrl?: string;
  aboutTitle?: string;
  aboutIntro?: string;
  aboutNote?: string;
  giving?: {
    zelleEmailOrPhone?: string;
    bankAccounts?: Array<{
      bankName: string;
      accountType?: string;
      accountNumber?: string;
      accountHolder?: string;
    }>;
    onlineGivingUrl?: string;
    givingMessage?: string;
  };
  defaultHero?: DefaultHero;
  youtubeChannelId?: string;
};

export type Leader = {
  _id: string;
  name: string;
  slug: string;
  role: string;
  shortBio?: string;
  photo?: SanityImage;
  socialLinks?: Record<string, string>;
  order?: number;
};

export type Ministry = {
  _id: string;
  name: string;
  slug: string;
  regularSchedule: string;
  plainDescription?: string;
  coverImage?: SanityImage;
  leaderInCharge?: { name: string; role: string; slug: string };
};
