"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroVideoBackground } from "@/components/home/HeroVideoBackground";
import { siteContent } from "@/lib/site-content";
import type { LiveStreamHeroState } from "@/lib/youtube";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

function getCountdownParts(targetIso: string): CountdownParts {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isComplete: false,
  };
}

function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-w-[4.25rem] flex-col items-center rounded-2xl border border-border bg-white px-4 py-4 shadow-sm">
      <span className="font-mono text-3xl font-light tabular-nums tracking-tight text-foreground md:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function CountdownTimer({
  targetDate,
  title,
  subtitle,
  onComplete,
}: {
  targetDate: string;
  title: string;
  subtitle?: string;
  onComplete?: () => void;
}) {
  const [parts, setParts] = useState(() => getCountdownParts(targetDate));

  useEffect(() => {
    const tick = () => {
      const next = getCountdownParts(targetDate);
      setParts(next);
      if (next.isComplete) onComplete?.();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate, onComplete]);

  const units = useMemo(
    () => [
      { label: "Días", value: parts.days },
      { label: "Horas", value: parts.hours },
      { label: "Min", value: parts.minutes },
      { label: "Seg", value: parts.seconds },
    ],
    [parts]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full flex-col items-center gap-10"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
        Próxima transmisión
      </p>
      <div className="text-center">
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {units.map((u) => (
          <CountdownUnit key={u.label} label={u.label} value={u.value} />
        ))}
      </div>
      <Button asChild variant="outline" size="lg" className="rounded-full">
        <a href={siteContent.social.youtube} target="_blank" rel="noreferrer">
          <ExternalLink className="h-4 w-4" />
          {siteContent.social.youtubeLabel}
        </a>
      </Button>
    </motion.div>
  );
}

function YouTubeEmbed({
  videoId,
  title,
  subtitle,
}: {
  videoId: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full max-w-4xl flex-col items-center gap-4"
    >
      {subtitle && (
        <p className="text-center text-sm text-muted-foreground">{subtitle}</p>
      )}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </motion.div>
  );
}

type CmsHeroContent = {
  title: string;
  subtitle: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

function IdleHero({
  cms,
  logoUrl,
  logoAlt,
  nameEn,
  tagline,
  fallbackHero,
}: {
  cms: CmsHeroContent;
  logoUrl: string;
  logoAlt: string;
  nameEn: string;
  tagline: string;
  fallbackHero: Extract<LiveStreamHeroState, { mode: "idle" }>["hero"];
}) {
  const headline = fallbackHero?.headline ?? cms.title;
  const subheadline = fallbackHero?.subheadline ?? cms.subtitle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full flex-col items-center gap-8 text-center"
    >
      <div className="relative h-20 w-44 md:h-24 md:w-52">
        <Image
          src={logoUrl}
          alt={logoAlt}
          fill
          className="object-contain"
          priority
          unoptimized={logoUrl.includes("wixstatic")}
        />
      </div>
      <div className="max-w-2xl space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-teal">
          {nameEn} · NYC
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-tight">
          {headline}
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">{subheadline}</p>
        <p className="text-sm italic text-brand-gold">{tagline}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href={cms.ctaPrimaryHref}>{cms.ctaPrimaryLabel}</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-8">
          <a href={cms.ctaSecondaryHref} target="_blank" rel="noreferrer">
            <Play className="h-4 w-4" />
            {cms.ctaSecondaryLabel}
          </a>
        </Button>
      </div>
    </motion.div>
  );
}

export type LiveStreamHeroProps = {
  initialState: LiveStreamHeroState;
  heroVideoUrl?: string | null;
  homeContent: CmsHeroContent;
  logoUrl: string;
  logoAlt: string;
  nameEn: string;
  tagline: string;
};

export function LiveStreamHero({
  initialState,
  heroVideoUrl,
  homeContent,
  logoUrl,
  logoAlt,
  nameEn,
  tagline,
}: LiveStreamHeroProps) {
  const [state, setState] = useState<LiveStreamHeroState>(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  const handleCountdownComplete = () => {
    if (state.mode === "countdown" && state.videoId) {
      setState({
        mode: "live",
        videoId: state.videoId,
        title: state.title,
        subtitle: state.subtitle,
      });
    } else {
      window.location.reload();
    }
  };

  const showHeroVideo =
    !!heroVideoUrl && (state.mode === "idle" || state.mode === "countdown");

  return (
    <section
      className={cn(
        "relative border-b border-border bg-white",
        "flex min-h-[min(88vh,820px)] w-full items-center justify-center overflow-hidden"
      )}
    >
      {showHeroVideo && <HeroVideoBackground src={heroVideoUrl} />}

      {!showHeroVideo && (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.96_0.02_250),transparent)]"
          aria-hidden
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <AnimatePresence mode="wait">
          {state.mode === "live" && (
            <motion.div
              key="live"
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative h-12 w-28">
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  fill
                  className="object-contain"
                  unoptimized={logoUrl.includes("wixstatic")}
                />
              </div>
              <p className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                </span>
                En vivo
              </p>
              <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
                {state.title}
              </h2>
              <YouTubeEmbed
                videoId={state.videoId}
                title={state.title}
                subtitle={state.subtitle}
              />
            </motion.div>
          )}

          {state.mode === "countdown" && (
            <motion.div key="countdown">
              <CountdownTimer
                targetDate={state.targetDate}
                title={state.title}
                subtitle={state.subtitle}
                onComplete={handleCountdownComplete}
              />
            </motion.div>
          )}

          {state.mode === "idle" && (
            <motion.div key="idle">
              <IdleHero
                cms={homeContent}
                logoUrl={logoUrl}
                logoAlt={logoAlt}
                nameEn={nameEn}
                tagline={tagline}
                fallbackHero={state.hero}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
