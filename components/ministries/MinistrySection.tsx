import Link from "next/link";
import { Mail, Instagram } from "lucide-react";
import type { MinistryContent } from "@/lib/ministries-content";
import { MinistryPhotoSlider } from "./MinistryPhotoSlider";

type MinistrySectionProps = {
  ministry: MinistryContent;
  locale: "es" | "en";
  index: number;
  labels: {
    vision: string;
    mission: string;
    followUs: string;
  };
};

export function MinistrySection({
  ministry,
  locale,
  index,
  labels,
}: MinistrySectionProps) {
  const content = locale === "en" ? ministry.en : ministry.es;
  const imageFirst = index % 2 === 0;
  const hasImages = ministry.images.length > 0;

  return (
    <section
      id={ministry.id}
      className={`scroll-mt-24 py-16 md:py-20 ${
        index % 2 === 1 ? "bg-brand-sky/40" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div
          className={`grid items-center gap-10 lg:gap-14 ${
            hasImages ? "lg:grid-cols-2" : "max-w-3xl"
          }`}
        >
          {hasImages && (
            <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
              <MinistryPhotoSlider images={ministry.images} alt={content.title} />
            </div>
          )}

          <div
            className={`${hasImages ? "" : "lg:col-span-2"} ${
              imageFirst ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
              {locale === "en" ? "Ministry" : "Ministerio"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              {content.title}
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}

              {content.vision && (
                <div className="rounded-xl border border-border bg-white/70 p-5">
                  <h3 className="text-sm font-semibold text-foreground">
                    {labels.vision}
                  </h3>
                  <p className="mt-2">{content.vision}</p>
                </div>
              )}

              {content.mission && (
                <div className="rounded-xl border border-border bg-white/70 p-5">
                  <h3 className="text-sm font-semibold text-foreground">
                    {labels.mission}
                  </h3>
                  <p className="mt-2">{content.mission}</p>
                </div>
              )}
            </div>

            {(ministry.email || ministry.instagram) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {ministry.email && (
                  <a
                    href={`mailto:${ministry.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition hover:border-brand-teal hover:text-brand-teal"
                  >
                    <Mail className="h-4 w-4" />
                    {ministry.email}
                  </a>
                )}
                {ministry.instagram && (
                  <Link
                    href={ministry.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition hover:border-brand-teal hover:text-brand-teal"
                  >
                    <Instagram className="h-4 w-4" />
                    @oasisyouth.nyc
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
