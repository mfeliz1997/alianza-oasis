import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { aboutContent } from "@/lib/about-content";

export async function generateMetadata() {
  const locale = await getServerLocale();
  return { title: locale === "en" ? "About" : "Nosotros" };
}

export default async function AboutUsPage() {
  const locale = await getServerLocale();
  const t = aboutContent[locale];

  return (
    <div>
      <header className="border-b border-border bg-brand-warm">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t.title}
          </h1>
          <blockquote className="mt-10 max-w-3xl border-l-4 border-brand-gold pl-6">
            <p className="text-lg leading-relaxed text-foreground md:text-xl">
              {t.verse}
            </p>
            <footer className="mt-4 text-sm font-medium text-brand-teal">
              ({t.verseRef})
            </footer>
          </blockquote>
        </div>
      </header>

      <div className="accent-bar h-1" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8 md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
              {t.mission.title}
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed tracking-wide text-foreground md:text-lg">
              {t.mission.body}
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-brand-sky/40 p-6 sm:p-8 md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
              {t.vision.title}
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed tracking-wide text-foreground md:text-lg">
              {t.vision.body}
            </p>
          </section>
        </div>

        <Link
          href="/our-leaders"
          className="mt-12 inline-flex text-sm font-medium text-brand-teal hover:underline"
        >
          {t.leadersLink}
        </Link>
      </div>
    </div>
  );
}
