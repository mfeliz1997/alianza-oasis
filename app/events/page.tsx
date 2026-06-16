import type { Metadata } from "next";
import { EventsList } from "@/components/events/EventsList";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";

export const metadata: Metadata = {
  title: "Eventos",
};

export default async function EventsPage() {
  const locale = await getServerLocale();
  const t = getMessages(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
        {t.events.eyebrow}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
        {t.events.title}
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        {locale === "en"
          ? "Calendar of upcoming activities, conferences, and special gatherings."
          : "Calendario de actividades, conferencias y reuniones especiales."}
      </p>

      <div className="mt-12">
        <EventsList />
      </div>
    </div>
  );
}
