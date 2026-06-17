"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChurchLogo } from "@/components/brand/ChurchLogo";
import { HeroVideoBackground } from "@/components/home/HeroVideoBackground";
import { useLocale } from "@/components/providers/LocaleProvider";
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

function CountdownUnit({
  label,
  value,
  ready,
}: {
  label: string;
  value: number;
  ready: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col items-center px-0.5 py-1 sm:min-w-[4.25rem] sm:flex-none sm:rounded-2xl sm:border sm:border-border sm:bg-white sm:px-4 sm:py-4 sm:shadow-sm">
      <span
        className="font-mono text-xl font-light tabular-nums tracking-tight text-foreground sm:text-3xl md:text-4xl"
        suppressHydrationWarning
      >
        {ready ? String(value).padStart(2, "0") : "--"}
      </span>
      <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:mt-1.5 sm:text-[10px] sm:tracking-[0.18em]">
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
  const { messages } = useLocale();
  const t = messages.live;
  const [ready, setReady] = useState(false);
  const [parts, setParts] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    setReady(true);
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
      { label: t.days, value: parts.days },
      { label: t.hours, value: parts.hours },
      { label: t.minutes, value: parts.minutes },
      { label: t.seconds, value: parts.seconds },
    ],
    [parts, t]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex w-full flex-col items-center gap-8"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-gold">
        {t.eyebrow}
      </p>
      <div className="text-center">
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      <div className="grid w-full max-w-xs grid-cols-4 gap-1 sm:max-w-none sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
        {units.map((u) => (
          <CountdownUnit
            key={u.label}
            label={u.label}
            value={u.value}
            ready={ready}
          />
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
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

type HeroCta = {
  ctaPrimaryHref: string;
  ctaSecondaryHref: string;
};

function HomeWelcome({
  heroVideoUrl,
  cta,
}: {
  heroVideoUrl: string;
  cta: HeroCta;
}) {
  const { messages } = useLocale();
  const t = messages.hero;

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden border-b border-border bg-black">
      <HeroVideoBackground src={heroVideoUrl} />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 md:px-10 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex flex-col items-center gap-10 text-center"
        >
          <div className="space-y-4 md:space-y-5">
            <h1 className="text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl md:text-4xl md:leading-tight lg:text-5xl">
              {t.welcomeLine1}
            </h1>
            <p className="text-lg font-medium text-white/90 sm:text-xl md:text-2xl">
              {t.welcomeLine2}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild size="lg" className="rounded-full px-8 shadow-md">
              <a href="#schedule">{t.planVisit}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/40 bg-white/10 px-8 text-white hover:bg-white/20 hover:text-white"
            >
              <a href={cta.ctaSecondaryHref} target="_blank" rel="noreferrer">
                <Play className="h-4 w-4" />
                {t.watchYoutube}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#schedule"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
        aria-label={t.scrollHint}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
          {t.scrollHint}
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}

function LiveStreamPanel({
  state,
  logoUrl,
  logoAlt,
  onCountdownComplete,
}: {
  state: Extract<LiveStreamHeroState, { mode: "live" | "countdown" }>;
  logoUrl: string;
  logoAlt: string;
  onCountdownComplete: () => void;
}) {
  const { messages } = useLocale();

  return (
    <section className="border-b border-border bg-brand-warm/60 py-16 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <AnimatePresence mode="wait">
          {state.mode === "live" && (
            <motion.div
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8"
            >
              <ChurchLogo alt={logoAlt} src={logoUrl} size="panel" />
              <p className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                </span>
                {messages.live.liveBadge}
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
                onComplete={onCountdownComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export type LiveStreamHeroProps = {
  initialState: LiveStreamHeroState;
  heroVideoUrl?: string | null;
  logoUrl: string;
  logoAlt: string;
  cta: HeroCta;
};

export function LiveStreamHero({
  initialState,
  heroVideoUrl,
  logoUrl,
  logoAlt,
  cta,
}: LiveStreamHeroProps) {
  const [state, setState] = useState<LiveStreamHeroState>(initialState);
  const videoSrc = heroVideoUrl ?? "/media/hero.mp4";

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = videoSrc;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [videoSrc]);

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

  return (
    <>
      <HomeWelcome heroVideoUrl={videoSrc} cta={cta} />
      {state.mode === "live" && (
        <LiveStreamPanel
          state={state}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          onCountdownComplete={handleCountdownComplete}
        />
      )}
    </>
  );
}
