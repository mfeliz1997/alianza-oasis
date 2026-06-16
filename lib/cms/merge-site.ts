import { cache } from "react";
import { getHomePage, getSiteSettings } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { localMedia } from "@/lib/local-media";
import { siteContent } from "@/lib/site-content";
import type { HomePage, SiteSettings } from "@/types/sanity";

export type MergedSite = {
  name: string;
  nameEn: string;
  tagline: string;
  logoUrl: string;
  logoAlt: string;
  instagram: string;
  instagramHandle: string;
  youtube: string;
  facebook: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  contactIntro: string;
  directionsTrain: string;
  directionsParking: string;
  mapEmbedUrl: string;
  heroVideoUrl: string | null;
  brand: {
    navy: string;
    gold: string;
    teal: string;
    sky: string;
    warm: string;
  };
  home: {
    title: string;
    subtitle: string;
    welcomeEyebrow: string;
    welcomeTitle: string;
    welcomeSubtitleEn: string;
    scheduleTitle: string;
    scheduleIntro: string;
    ctaPrimaryLabel: string;
    ctaPrimaryHref: string;
    ctaSecondaryLabel: string;
    ctaSecondaryHref: string;
  };
  about: {
    title: string;
    intro: string;
    note: string;
  };
  settings: SiteSettings | null;
  rawHome: HomePage | null;
};

function logoFromSettings(settings: SiteSettings | null): string {
  if (settings?.logo?.asset?._id) {
    return urlFor(settings.logo).width(400).url();
  }
  return siteContent.logo.src;
}

export const getMergedSite = cache(async (): Promise<MergedSite> => {
  const [settings, home] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
  ]);

  const brand = {
    navy: settings?.brandColors?.navy ?? "#1e3a5f",
    gold: settings?.brandColors?.gold ?? "#c9a227",
    teal: settings?.brandColors?.teal ?? "#2a7f8f",
    sky: settings?.brandColors?.sky ?? "#e8f4fc",
    warm: settings?.brandColors?.warm ?? "#faf6ef",
  };

  const heroVideoUrl =
    home?.heroVideoFileUrl ??
    home?.heroVideoUrl ??
    settings?.defaultHero?.backgroundVideoUrl ??
    siteContent.heroVideoUrl ??
    localMedia.heroVideo ??
    null;

  return {
    name: settings?.siteTitle ?? siteContent.name,
    nameEn: settings?.siteTitleEn ?? siteContent.nameEn,
    tagline: settings?.tagline ?? siteContent.tagline,
    logoUrl: logoFromSettings(settings),
    logoAlt: settings?.logo?.alt ?? siteContent.logo.alt,
    instagram:
      settings?.socialUrls?.instagram ??
      siteContent.social.instagram,
    instagramHandle: "@iglesiaalianzaoasis",
    youtube:
      settings?.socialUrls?.youtube ?? siteContent.social.youtube,
    facebook:
      settings?.socialUrls?.facebook ?? siteContent.social.facebook,
    phone: settings?.contactPhone ?? siteContent.contact.phone,
    phoneHref: settings?.contactPhone
      ? `tel:${settings.contactPhone.replace(/\D/g, "")}`
      : siteContent.contact.phoneHref,
    email: settings?.contactEmail ?? siteContent.contact.email,
    address: settings?.address ?? siteContent.address.full,
    contactIntro:
      settings?.contactIntro ?? siteContent.contact.contactIntro,
    directionsTrain:
      settings?.directionsTrain ?? siteContent.directions.train,
    directionsParking:
      settings?.directionsParking ?? siteContent.directions.drivers,
    mapEmbedUrl: settings?.mapEmbedUrl ?? siteContent.mapEmbedUrl,
    heroVideoUrl,
    brand,
    home: {
      title: home?.title ?? siteContent.hero.headline,
      subtitle: home?.subtitle ?? siteContent.hero.subheadline,
      welcomeEyebrow: home?.welcomeEyebrow ?? siteContent.welcomeCta,
      welcomeTitle: home?.welcomeTitle ?? siteContent.tagline,
      welcomeSubtitleEn:
        home?.welcomeSubtitleEn ?? siteContent.taglineEn,
      scheduleTitle: home?.scheduleTitle ?? "Días de servicio",
      scheduleIntro: home?.scheduleIntro ?? "",
      ctaPrimaryLabel: home?.ctaPrimaryLabel ?? siteContent.hero.ctaLabel,
      ctaPrimaryHref: home?.ctaPrimaryHref ?? siteContent.hero.ctaHref,
      ctaSecondaryLabel:
        home?.ctaSecondaryLabel ?? siteContent.hero.secondaryCtaLabel,
      ctaSecondaryHref:
        home?.ctaSecondaryHref ?? siteContent.hero.secondaryCtaHref,
    },
    about: {
      title: settings?.aboutTitle ?? "Lo que creemos",
      intro: settings?.aboutIntro ?? siteContent.beliefsIntro,
      note: settings?.aboutNote ?? siteContent.beliefsNote,
    },
    settings,
    rawHome: home,
  };
});
