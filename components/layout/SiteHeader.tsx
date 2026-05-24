"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SiteHeaderProps = {
  logoUrl: string;
  logoAlt: string;
  youtubeUrl: string;
};

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/our-leaders", label: "Liderazgo" },
  { href: "/our-ministries", label: "Ministerios" },
  { href: "/giving", label: "Dar" },
  { href: "/about-us", label: "Nosotros" },
  { href: "/events", label: "Eventos" },
  { href: "/contact-us", label: "Contacto" },
];

export function SiteHeader({ logoUrl, logoAlt, youtubeUrl }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="accent-bar h-0.5 w-full" />
      <div className="mx-auto flex h-[4.25rem] max-w-5xl items-center justify-between gap-4 px-6 md:px-8">
        <Link href="/" className="relative block h-10 w-24 shrink-0">
          <Image
            src={logoUrl}
            alt={logoAlt}
            fill
            className="object-contain object-left"
            priority
            unoptimized={logoUrl.includes("wixstatic")}
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
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-brand-gold bg-brand-warm px-4 py-2 text-xs font-medium text-foreground transition hover:opacity-90 sm:inline-flex"
          >
            En vivo
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
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
        </nav>
      </div>
    </header>
  );
}
