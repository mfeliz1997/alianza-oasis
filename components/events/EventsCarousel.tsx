import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { getUpcomingEvents } from "@/lib/sanity/fetch";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";

export async function EventsCarousel() {
  const events = await getUpcomingEvents();
  const locale = await getServerLocale();
  const t = getMessages(locale);
  const dateLocale = locale === "en" ? enUS : es;

  return (
    <section className="border-t border-border bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {t.events.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              {t.events.title}
            </h2>
          </div>
          <Link
            href="/events"
            className="text-sm font-medium text-primary hover:underline"
          >
            {t.events.viewAll}
          </Link>
        </div>

        {!events.length ? (
          <div className="rounded-2xl border border-border py-16 text-center">
            <p className="text-muted-foreground">{t.events.empty}</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {events.map((event) => {
              const imageUrl = event.image?.asset?._id
                ? urlFor(event.image).width(480).height(320).url()
                : null;
              const blur =
                event.image?.asset?.metadata?.lqip ??
                (event.image?.asset?._id
                  ? getBlurDataURL(event.image)
                  : undefined);

              return (
                <article
                  key={event._id}
                  className="w-[min(100%,18rem)] shrink-0 overflow-hidden rounded-2xl border border-border bg-white"
                >
                  <div className="relative aspect-[3/2] bg-muted">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={event.image?.alt ?? event.title}
                        fill
                        className="object-cover"
                        sizes="288px"
                        placeholder={blur ? "blur" : "empty"}
                        blurDataURL={blur}
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <time
                      dateTime={event.startDate}
                      className="text-xs text-muted-foreground"
                    >
                      {format(new Date(event.startDate), "d MMM · h:mm a", {
                        locale: dateLocale,
                      })}
                    </time>
                    <h3 className="mt-1 font-medium">{event.title}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
