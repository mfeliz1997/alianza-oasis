"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ChurchLogo } from "@/components/brand/ChurchLogo";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Locale } from "@/lib/i18n/locale";

export type SiteHeaderProps = {
  logoUrl: string;
  logoAlt: string;
  youtubeUrl: string;
  showLiveButton: boolean;
};

function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  const options: { id: Locale; label: string }[] = [
    { id: "es", label: "ES" },
    { id: "en", label: "EN" },
  ];

  return (
    <div
      className="flex rounded-full border border-border p-0.5 text-[11px] font-semibold"
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setLocale(opt.id)}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            locale === opt.id
              ? "bg-brand-teal text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader({
  logoUrl,
  logoAlt,
  youtubeUrl,
  showLiveButton,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const { messages } = useLocale();
  const t = messages.nav;

  const nav = [
    { href: "/", label: t.home },
    { href: "/our-leaders", label: t.leaders },
    { href: "/our-ministries", label: t.ministries },
    { href: "/giving", label: t.giving },
    { href: "/about-us", label: t.about },
    { href: "/events", label: t.events },
    { href: "/contact-us", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="accent-bar h-0.5 w-full" />
      <div className="mx-auto flex h-[4.25rem] max-w-5xl items-center justify-between gap-4 px-6 md:px-8">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <ChurchLogo
            alt={logoAlt}
            src={logoUrl}
            size="header"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-brand-teal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          {showLiveButton && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-brand-gold bg-brand-warm px-4 py-2 text-xs font-medium text-foreground transition hover:opacity-90 sm:inline-flex"
            >
              <span className="relative mr-1.5 inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-600" />
              </span>
              {t.live}
            </a>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.closeMenu : t.openMenu}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-white lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto flex max-w-5xl flex-col px-6 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3.5 text-sm font-medium last:border-0"
            >
              {item.label}
            </Link>
          ))}
          {showLiveButton && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-teal"
              onClick={() => setOpen(false)}
            >
              {t.live}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
