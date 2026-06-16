import type { Metadata } from "next";
import { MinistrySection } from "@/components/ministries/MinistrySection";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";
import {
  ministriesContent,
  ministriesIntro,
} from "@/lib/ministries-content";

export const metadata: Metadata = {
  title: "Ministerios",
};

export default async function OurMinistriesPage() {
  const locale = await getServerLocale();
  const t = getMessages(locale);
  const intro = ministriesIntro[locale];

  return (
    <div>
      <header className="border-b border-border bg-brand-warm">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
            {t.ministriesPage.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            {intro.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {intro.description}
          </p>
          <p className="mt-4 text-base font-medium text-brand-teal">
            {intro.cta}
          </p>
        </div>
      </header>

      <div className="accent-bar h-1" />

      {ministriesContent.map((ministry, index) => (
        <MinistrySection
          key={ministry.id}
          ministry={ministry}
          locale={locale}
          index={index}
          labels={{
            vision: t.ministriesPage.vision,
            mission: t.ministriesPage.mission,
            followUs: t.ministriesPage.followUs,
          }}
        />
      ))}
    </div>
  );
}
