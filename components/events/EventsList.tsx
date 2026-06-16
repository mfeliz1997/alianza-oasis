import Image from "next/image";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { PortableText } from "@portabletext/react";
import { getUpcomingEvents } from "@/lib/sanity/fetch";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";
import type { SanityEvent } from "@/types/sanity";

export async function EventsList() {
  const events = await getUpcomingEvents();
  const locale = await getServerLocale();
  const t = getMessages(locale);
  const dateLocale = locale === "en" ? enUS : es;

  if (!events.length) {
    return (
      <div className="rounded-2xl border border-border py-16 text-center">
        <p className="text-muted-foreground">{t.events.empty}</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {events.map((event: SanityEvent) => {
        const imageUrl = event.image?.asset?._id
          ? urlFor(event.image).width(800).height(500).url()
          : null;
        const blur =
          event.image?.asset?.metadata?.lqip ??
          (event.image?.asset?._id
            ? getBlurDataURL(event.image)
            : undefined);

        return (
          <li
            key={event._id}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          >
            {imageUrl && (
              <div className="relative aspect-[16/10] bg-muted">
                <Image
                  src={imageUrl}
                  alt={event.image?.alt ?? event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder={blur ? "blur" : "empty"}
                  blurDataURL={blur}
                />
                {event.isFeatured && (
                  <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold text-white">
                    {locale === "en" ? "Featured" : "Destacado"}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <time
                dateTime={event.startDate}
                className="text-xs font-medium uppercase tracking-wide text-brand-teal"
              >
                {format(new Date(event.startDate), "EEEE, d MMMM yyyy · h:mm a", {
                  locale: dateLocale,
                })}
              </time>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                {event.title}
              </h2>
              {event.location && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.location}
                </p>
              )}
              {event.plainDescription && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {event.plainDescription}
                </p>
              )}
              {event.description && event.description.length > 0 && (
                <div className="prose prose-sm mt-4 max-w-none text-muted-foreground">
                  <PortableText value={event.description} />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
