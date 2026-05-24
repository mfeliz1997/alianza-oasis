import Link from "next/link";
import { getMergedSite } from "@/lib/cms/merge-site";
import { MapPin, Phone } from "lucide-react";

export async function VisitSection() {
  const site = await getMergedSite();

  return (
    <section className="border-t border-border bg-brand-sky">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
            Visítanos
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Washington Heights, NYC
          </h2>
          <ul className="mt-8 space-y-5 text-sm">
            <li className="flex gap-3 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              {site.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <a href={site.phoneHref} className="font-medium hover:text-brand-teal">
                {site.phone}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            {site.directionsParking}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
            <Link href="/contact-us" className="text-brand-teal hover:underline">
              Contacto →
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              {site.instagramHandle}
            </a>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-white shadow-sm md:aspect-video">
          <iframe
            src={site.mapEmbedUrl}
            title="Mapa Iglesia Alianza Oasis"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
