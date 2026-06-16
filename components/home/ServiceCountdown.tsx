"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdownParts(targetIso: string): CountdownParts {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
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
    <div className="flex min-w-[4.5rem] flex-col items-center rounded-2xl border border-border/80 bg-white px-4 py-4 shadow-sm sm:min-w-[5rem]">
      <span
        className="font-mono text-3xl font-light tabular-nums tracking-tight text-foreground sm:text-4xl"
        suppressHydrationWarning
      >
        {ready ? String(value).padStart(2, "0") : "--"}
      </span>
      <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

type ServiceCountdownProps = {
  targetDate: string;
  serviceLabel: string;
  address: string;
};

export function ServiceCountdown({
  targetDate,
  serviceLabel,
  address,
}: ServiceCountdownProps) {
  const { messages } = useLocale();
  const t = messages.live;
  const [ready, setReady] = useState(false);
  const [parts, setParts] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setReady(true);
    const tick = () => setParts(getCountdownParts(targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

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
      className="mb-14 rounded-3xl border border-brand-gold/30 bg-brand-warm/80 px-6 py-10 text-center shadow-sm md:mb-16 md:px-10 md:py-12"
    >
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand-teal">
        {t.eyebrow}
      </p>
      <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
        {serviceLabel}
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
        {units.map((u) => (
          <CountdownUnit
            key={u.label}
            label={u.label}
            value={u.value}
            ready={ready}
          />
        ))}
      </div>
      <p className="mt-8 inline-flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
        {address}
      </p>
    </motion.div>
  );
}
