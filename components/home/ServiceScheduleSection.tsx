import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";
import {
  getLocalizedNote,
  getLocalizedServiceLabel,
  getLocalizedTimeLabel,
} from "@/lib/i18n/schedule-labels";
import { localMedia } from "@/lib/local-media";
import { getNextService } from "@/lib/service-schedule";
import { siteContent } from "@/lib/site-content";
import { ServiceCountdown } from "./ServiceCountdown";
import { ServiceScheduleCards } from "./ServiceScheduleCards";

export async function ServiceScheduleSection() {
  const locale = await getServerLocale();
  const t = getMessages(locale);
  const next = getNextService();

  const slots = siteContent.serviceSchedule.map((slot) => {
    const titleKey =
      slot.id === "sunday-first"
        ? "spanishService"
        : slot.id === "sunday-second"
          ? "englishService"
          : slot.id === "friday"
            ? "fridayService"
            : "saturdayService";

    const langKey =
      slot.id === "sunday-second" ? "languageEnglish" : "languageSpanish";

    const image =
      slot.id === "sunday-first"
        ? localMedia.services.sundaySpanish
        : slot.id === "sunday-second"
          ? localMedia.services.sundayEnglish
          : null;

    const isSunday =
      slot.id === "sunday-first" || slot.id === "sunday-second";

    return {
      id: slot.id,
      title: isSunday
        ? ""
        : (t.schedule[titleKey as keyof typeof t.schedule] as string),
      timeLabel: getLocalizedTimeLabel(slot.id, t),
      languages: t.schedule[langKey as keyof typeof t.schedule] as string,
      note: isSunday ? "" : getLocalizedNote(slot.id, t),
      streamed: slot.id === "sunday-second" ? false : slot.streamed,
      image,
    };
  });

  const nextServiceLabel = next
    ? getLocalizedServiceLabel(next.slot.id, t)
    : null;

  return (
    <section id="schedule" className="scroll-mt-20 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        {next && nextServiceLabel && (
          <ServiceCountdown
            targetDate={next.targetDate}
            serviceLabel={nextServiceLabel}
            address={t.schedule.shortAddress}
          />
        )}

        <div className="mb-12 text-center md:mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
            {t.schedule.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            {t.schedule.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            {t.schedule.intro}
          </p>
        </div>

        <ServiceScheduleCards slots={slots} liveLabel={t.schedule.liveBadge} />

        <div className="mt-10 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-brand-gold/40 bg-brand-sky/50 px-6 py-5 text-center text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-brand-teal" />
            {t.schedule.shortAddress}
          </span>
          <span className="hidden text-border sm:inline">|</span>
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-brand-teal" />
            {t.schedule.directionsTrain}
          </span>
        </div>

        <ul className="mt-14 grid gap-3 sm:grid-cols-3">
          {localMedia.community.map((src, i) => (
            <li
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-sm"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 33vw"
                priority={i === 0}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
