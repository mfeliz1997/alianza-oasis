import { getMergedSite } from "@/lib/cms/merge-site";
import { getIsLiveNow } from "@/lib/live-status";
import { SiteHeader } from "./SiteHeader";

export async function SiteHeaderShell() {
  const [site, showLiveButton] = await Promise.all([
    getMergedSite(),
    getIsLiveNow(),
  ]);

  return (
    <SiteHeader
      logoUrl={site.logoUrl}
      logoAlt={site.logoAlt}
      youtubeUrl={site.youtube}
      showLiveButton={showLiveButton}
    />
  );
}
