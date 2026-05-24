import Link from "next/link";
import { getMergedSite } from "@/lib/cms/merge-site";

export async function WelcomeSection() {
  const site = await getMergedSite();

  return (
    <section className="bg-brand-warm border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-8 md:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-gold">
          {site.home.welcomeEyebrow}
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
          {site.home.welcomeTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          {site.home.welcomeSubtitleEn}
        </p>
        <Link
          href={site.home.ctaPrimaryHref}
          className="mt-8 inline-flex text-sm font-medium text-brand-teal underline-offset-4 hover:underline"
        >
          {site.home.ctaPrimaryLabel} →
        </Link>
      </div>
    </section>
  );
}
