import { getNextLiveStream, getSiteSettings } from "@/lib/sanity/fetch";
import { resolveLiveStreamHeroState } from "@/lib/youtube";

export async function getIsLiveNow(): Promise<boolean> {
  const [scheduled, settings] = await Promise.all([
    getNextLiveStream(),
    getSiteSettings(),
  ]);
  const state = await resolveLiveStreamHeroState(scheduled, settings);
  return state.mode === "live";
}
