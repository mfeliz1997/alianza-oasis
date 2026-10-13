import { getMergedSite } from "@/lib/cms/merge-site";
import { localMedia } from "@/lib/local-media";
import { getNextLiveStream, getSiteSettings } from "@/lib/sanity/fetch";
import { resolveLiveStreamHeroState } from "@/lib/youtube";
import { LiveStreamHero } from "./LiveStreamHero";

export async function LiveStreamHeroSection() {
  const [scheduled, settings, site] = await Promise.all([
    getNextLiveStream(),
    getSiteSettings(),
    getMergedSite(),
  ]);

  const heroState = await resolveLiveStreamHeroState(scheduled, settings);

  // Always use compressed local MP4 (YouTube backgrounds look poor / letterboxed)
  const heroVideoUrl = localMedia.heroVideo;

  return (
    <LiveStreamHero
      initialState={heroState}
      heroVideoUrl={heroVideoUrl}
      logoUrl={site.logoUrl}
      logoAlt={site.logoAlt}
      cta={{
        ctaPrimaryHref: site.home.ctaPrimaryHref,
        ctaSecondaryHref: site.home.ctaSecondaryHref,
      }}
    />
  );
}
