import { getMergedSite } from "@/lib/cms/merge-site";
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

  return (
    <LiveStreamHero
      initialState={heroState}
      heroVideoUrl={site.heroVideoUrl}
      homeContent={site.home}
      logoUrl={site.logoUrl}
      logoAlt={site.logoAlt}
      nameEn={site.nameEn}
      tagline={site.tagline}
    />
  );
}
