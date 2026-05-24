import { getMergedSite } from "@/lib/cms/merge-site";
import { SiteHeader } from "./SiteHeader";

export async function SiteHeaderShell() {
  const site = await getMergedSite();
  return (
    <SiteHeader
      logoUrl={site.logoUrl}
      logoAlt={site.logoAlt}
      youtubeUrl={site.youtube}
    />
  );
}
