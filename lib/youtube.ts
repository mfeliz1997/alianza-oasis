import { siteContent } from "./site-content";
import {
  getActiveStreamableService,
  getNextService,
  type NextService,
} from "./service-schedule";

export type YouTubeLiveStatus = {
  isLive: boolean;
  videoId: string | null;
  title?: string;
  scheduledStartTime?: string;
  actualStartTime?: string;
};

let cachedChannelId: string | null = null;

export async function resolveYouTubeChannelId(
  settingsChannelId?: string | null
): Promise<string | null> {
  if (settingsChannelId) return settingsChannelId;
  if (process.env.YOUTUBE_CHANNEL_ID) return process.env.YOUTUBE_CHANNEL_ID;
  if (cachedChannelId) return cachedChannelId;

  const apiKey = process.env.YOUTUBE_API_KEY;
  const handle =
    process.env.YOUTUBE_CHANNEL_HANDLE ?? siteContent.youtube.channelHandle;

  if (!apiKey) return null;

  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "id");
  url.searchParams.set("forHandle", handle);
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    items?: Array<{ id?: string }>;
  };

  cachedChannelId = data.items?.[0]?.id ?? null;
  return cachedChannelId;
}

export async function getChannelLiveStatus(
  channelId: string,
  preferredVideoId?: string | null
): Promise<YouTubeLiveStatus> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return { isLive: false, videoId: preferredVideoId ?? null };
  }

  if (preferredVideoId) {
    const videoLive = await checkVideoIsLive(preferredVideoId, apiKey);
    if (videoLive.isLive) return videoLive;
  }

  const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  searchUrl.searchParams.set("part", "snippet");
  searchUrl.searchParams.set("channelId", channelId);
  searchUrl.searchParams.set("eventType", "live");
  searchUrl.searchParams.set("type", "video");
  searchUrl.searchParams.set("maxResults", "1");
  searchUrl.searchParams.set("key", apiKey);

  const searchRes = await fetch(searchUrl.toString(), {
    next: { revalidate: 30 },
  });

  if (!searchRes.ok) {
    return { isLive: false, videoId: preferredVideoId ?? null };
  }

  const searchData = (await searchRes.json()) as {
    items?: Array<{
      id?: { videoId?: string };
      snippet?: { title?: string; liveBroadcastContent?: string };
    }>;
  };

  const liveItem = searchData.items?.[0];
  const videoId = liveItem?.id?.videoId;

  if (videoId && liveItem?.snippet?.liveBroadcastContent === "live") {
    return {
      isLive: true,
      videoId,
      title: liveItem.snippet.title,
    };
  }

  return { isLive: false, videoId: preferredVideoId ?? null };
}

async function checkVideoIsLive(
  videoId: string,
  apiKey: string
): Promise<YouTubeLiveStatus> {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.set("part", "snippet,liveStreamingDetails");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { next: { revalidate: 30 } });
  if (!res.ok) return { isLive: false, videoId };

  const data = (await res.json()) as {
    items?: Array<{
      snippet?: {
        title?: string;
        liveBroadcastContent?: string;
      };
      liveStreamingDetails?: {
        actualStartTime?: string;
        scheduledStartTime?: string;
      };
    }>;
  };

  const item = data.items?.[0];
  const isLive = item?.snippet?.liveBroadcastContent === "live";

  return {
    isLive: !!isLive,
    videoId,
    title: item?.snippet?.title,
    scheduledStartTime: item?.liveStreamingDetails?.scheduledStartTime,
    actualStartTime: item?.liveStreamingDetails?.actualStartTime,
  };
}

export type IdleHeroContent = {
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export type LiveStreamHeroState =
  | { mode: "live"; videoId: string; title: string; subtitle?: string }
  | {
      mode: "countdown";
      targetDate: string;
      title: string;
      subtitle?: string;
      videoId?: string;
    }
  | { mode: "idle"; hero: IdleHeroContent | null };

function buildDefaultHero(): IdleHeroContent {
  return {
    headline: siteContent.hero.headline,
    subheadline: siteContent.hero.subheadline,
    ctaLabel: siteContent.hero.ctaLabel,
    ctaHref: siteContent.hero.ctaHref,
    secondaryCtaLabel: siteContent.hero.secondaryCtaLabel,
    secondaryCtaHref: siteContent.hero.secondaryCtaHref,
  };
}

function countdownFromService(service: NextService): LiveStreamHeroState {
  return {
    mode: "countdown",
    targetDate: service.targetDate,
    title: service.title,
    subtitle: service.subtitle,
  };
}

export async function resolveLiveStreamHeroState(
  scheduled: import("@/types/sanity").LiveStream | null,
  settings: import("@/types/sanity").SiteSettings | null
): Promise<LiveStreamHeroState> {
  const channelId = await resolveYouTubeChannelId(settings?.youtubeChannelId);
  const cmsHero = settings?.defaultHero;
  const defaultHero = cmsHero
    ? {
        headline: cmsHero.headline ?? siteContent.hero.headline,
        subheadline: cmsHero.subheadline ?? siteContent.hero.subheadline,
        ctaLabel: cmsHero.ctaLabel ?? siteContent.hero.ctaLabel,
        ctaHref: cmsHero.ctaHref ?? siteContent.hero.ctaHref,
        secondaryCtaLabel: siteContent.hero.secondaryCtaLabel,
        secondaryCtaHref: siteContent.hero.secondaryCtaHref,
      }
    : buildDefaultHero();

  async function tryLiveFromYouTube(
    title: string = siteContent.youtube.liveTitle
  ): Promise<LiveStreamHeroState | null> {
    if (!channelId) return null;
    const yt = await getChannelLiveStatus(channelId);
    if (yt.isLive && yt.videoId) {
      const active = getActiveStreamableService();
      return {
        mode: "live",
        videoId: yt.videoId,
        title: yt.title ?? title,
        subtitle: active
          ? `${active.title} · ${active.timeLabel}`
          : siteContent.social.youtubeLabel,
      };
    }
    return null;
  }

  if (!scheduled) {
    const live = await tryLiveFromYouTube();
    if (live) return live;

    const next = getNextService();
    if (next) return countdownFromService(next);

    return { mode: "idle", hero: defaultHero };
  }

  const now = Date.now();
  const start = new Date(scheduled.scheduledStart).getTime();
  const end = scheduled.scheduledEnd
    ? new Date(scheduled.scheduledEnd).getTime()
    : null;

  const withinWindow =
    scheduled.isActive || (now >= start && (end === null || now <= end));

  if (withinWindow) {
    let videoId = scheduled.youtubeVideoId ?? null;

    if (channelId) {
      const yt = await getChannelLiveStatus(channelId, videoId);
      if (yt.isLive && yt.videoId) {
        return {
          mode: "live",
          videoId: yt.videoId,
          title: scheduled.title,
          subtitle: siteContent.social.youtubeLabel,
        };
      }
      if (yt.videoId) videoId = yt.videoId;
    }

    if (videoId) {
      return {
        mode: "live",
        videoId,
        title: scheduled.title,
        subtitle: siteContent.social.youtubeLabel,
      };
    }

    const live = await tryLiveFromYouTube(scheduled.title);
    if (live) return live;
  }

  if (now < start) {
    return {
      mode: "countdown",
      targetDate: scheduled.scheduledStart,
      title: scheduled.title,
      subtitle: siteContent.social.youtubeLabel,
      videoId: scheduled.youtubeVideoId ?? undefined,
    };
  }

  const live = await tryLiveFromYouTube();
  if (live) return live;

  const next = getNextService();
  if (next) return countdownFromService(next);

  return { mode: "idle", hero: defaultHero };
}
