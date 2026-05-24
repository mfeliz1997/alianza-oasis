import { Calendar, MapPin, Radio } from "lucide-react";
import { getMergedSite } from "@/lib/cms/merge-site";
import { siteContent } from "@/lib/site-content";
import { getNextService } from "@/lib/service-schedule";

export async function ServiceScheduleSection() {
  const site = await getMergedSite();
  const next = getNextService();

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="mb-12 text-center md:mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
            Horario
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            {site.home.scheduleTitle}
          </h2>
          {site.home.scheduleIntro && (
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              {site.home.scheduleIntro}
            </p>
          )}
          {next && (
            <p className="mt-2 text-sm text-brand-gold">{next.subtitle}</p>
          )}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {siteContent.serviceSchedule.map((slot) => (
            <li
              key={slot.id}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:border-brand-gold hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium">{slot.title}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-teal">
                    {slot.timeLabel}
                  </p>
                </div>
                {slot.streamed && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-brand-gold">
                    <Radio className="h-3 w-3" />
                    Live
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{slot.languages}</p>
              <p className="mt-1 text-xs text-muted-foreground/80">{slot.note}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-brand-gold/40 bg-brand-sky/50 px-6 py-5 text-center text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-brand-teal" />
            {site.address}
          </span>
          <span className="hidden text-border sm:inline">|</span>
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-brand-teal" />
            {site.directionsTrain}
          </span>
        </div>
      </div>
    </section>
  );
}
