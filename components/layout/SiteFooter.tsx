import Link from "next/link";
import { ChurchLogo } from "@/components/brand/ChurchLogo";
import { getMergedSite } from "@/lib/cms/merge-site";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getMessages } from "@/lib/i18n/messages";

export async function SiteFooter() {
  const site = await getMergedSite();
  const locale = await getServerLocale();
  const t = getMessages(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-brand-warm">
      <div className="accent-bar h-0.5 w-full opacity-60" />
      <div className="mx-auto max-w-5xl px-6 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <ChurchLogo alt={site.logoAlt} src={site.logoUrl} size="footer" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {t.schedule.shortAddress}
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
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-foreground">
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link href="/giving" className="hover:text-foreground">
                  {t.nav.giving}
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
          © {year} {locale === "en" ? site.nameEn : site.name}
        </p>
      </div>
    </footer>
  );
}
