import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart, Heart, Users } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { givingConfig, givingContent } from "@/lib/giving-content";

export const metadata: Metadata = {
  title: "Dar",
  description: "Ofrenda, donaciones en línea y voluntariado — Iglesia Alianza Oasis.",
};

export default async function GivingPage() {
  const locale = await getServerLocale();
  const t = givingContent[locale];

  return (
    <div>
      <header className="border-b border-border bg-brand-warm">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
            {locale === "en" ? "Generosity" : "Generosidad"}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {t.intro}
          </p>
          <p className="mt-4 text-base font-medium text-brand-teal">
            {t.optionsIntro}
          </p>
        </div>
      </header>

      <div className="accent-bar h-1" />

      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-8 lg:gap-10">
          {/* Service Offering */}
          <section className="rounded-2xl border border-border bg-white p-8 shadow-sm md:p-10">
            <div className="max-w-2xl">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-sky text-brand-teal">
                <Heart className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t.serviceOffering.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {t.serviceOffering.body}
              </p>
            </div>
          </section>

          {/* Give Online */}
          <section className="rounded-2xl border border-border bg-brand-sky/40 p-8 md:p-10">
            <div className="max-w-2xl">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-teal shadow-sm">
                <HandHeart className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t.giveOnline.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {t.giveOnline.body}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {t.giveOnline.moreInfo}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={givingConfig.paypalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#0070ba] px-8 text-sm font-semibold text-white transition hover:bg-[#005ea6]"
              >
                {t.giveOnline.paypalCta}
              </Link>

              <div className="rounded-xl border border-border bg-white px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t.giveOnline.zelleLabel}
                </p>
                <p className="mt-1 font-mono text-base font-medium">
                  {givingConfig.zelleEmail}
                </p>
              </div>
            </div>
          </section>

          {/* Volunteer */}
          <section className="rounded-2xl border border-border bg-white p-8 shadow-sm md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-warm text-brand-teal">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {t.volunteer.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t.volunteer.body}
                </p>
              </div>

              <Link
                href={givingConfig.volunteerHref}
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-brand-teal bg-white px-8 text-sm font-semibold text-brand-teal transition hover:bg-brand-teal hover:text-white"
              >
                {t.volunteer.cta}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
