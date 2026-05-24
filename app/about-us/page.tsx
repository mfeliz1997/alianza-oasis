import type { Metadata } from "next";
import Link from "next/link";
import { getMergedSite } from "@/lib/cms/merge-site";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Nosotros",
};

export default async function AboutUsPage() {
  const site = await getMergedSite();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-10">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
        About Us
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">
        {site.about.title}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">{site.about.intro}</p>
      <p className="mt-4 text-sm text-muted-foreground">{site.about.note}</p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">El Evangelio cuádruple</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {siteContent.fourfoldGospel.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-border bg-brand-warm p-5"
            >
              <h3 className="font-medium text-brand-teal">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.ref}</p>
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/our-leaders"
        className="mt-10 inline-flex text-sm font-medium text-brand-teal hover:underline"
      >
        Conoce nuestro liderazgo →
      </Link>
    </div>
  );
}
