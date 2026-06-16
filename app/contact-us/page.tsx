import type { Metadata } from "next";
import { getMergedSite } from "@/lib/cms/merge-site";
import { submitContactForm } from "@/app/contact-us/actions";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contacto",
};

export default async function ContactUsPage() {
  const site = await getMergedSite();
  const locale = await getServerLocale();
  const t = getMessages(locale);
  const c = t.contactPage;
  const { address } = siteContent;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <h1 className="text-4xl font-semibold tracking-tight">{c.title}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{c.intro}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <form action={submitContactForm} className="space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              {c.name}
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              {c.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">
              {c.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground"
          >
            {c.submit}
          </button>
        </form>

        <div className="space-y-8">
          <div>
            <p className="text-sm text-muted-foreground">{c.address}</p>
            <address className="mt-1 not-italic font-medium leading-relaxed">
              {address.line1}
              <br />
              {address.city}, {address.state} {address.zip}
            </address>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{c.phone}</p>
            <a
              href={site.phoneHref}
              className="mt-1 block font-medium hover:text-brand-teal"
            >
              {site.phone}
            </a>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{c.email}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block font-medium hover:text-brand-teal"
            >
              {site.email}
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-brand-sky/60 p-5 text-sm">
            <p className="font-medium">{c.directions}</p>
            <p className="mt-2 text-muted-foreground">{site.directionsTrain}</p>
            <p className="mt-2 text-muted-foreground">{site.directionsParking}</p>
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl border border-border">
            <iframe
              src={site.mapEmbedUrl}
              title="Ubicación"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
