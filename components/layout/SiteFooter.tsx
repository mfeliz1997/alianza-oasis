import Link from "next/link";
import Image from "next/image";
import { getMergedSite } from "@/lib/cms/merge-site";

export async function SiteFooter() {
  const site = await getMergedSite();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-brand-warm">
      <div className="accent-bar h-0.5 w-full opacity-60" />
      <div className="mx-auto max-w-5xl px-6 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="relative h-10 w-24">
              <Image
                src={site.logoUrl}
                alt={site.logoAlt}
                fill
                className="object-contain object-left"
                unoptimized={site.logoUrl.includes("wixstatic")}
              />
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {site.address}
            </p>
            <a
              href={site.phoneHref}
              className="mt-2 inline-block text-sm font-medium hover:text-brand-teal"
            >
              {site.phone}
            </a>
          </div>

          <div className="flex gap-12 text-sm">
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about-us" className="hover:text-foreground">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-foreground">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/giving" className="hover:text-foreground">
                  Dar
                </Link>
              </li>
            </ul>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href={site.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
