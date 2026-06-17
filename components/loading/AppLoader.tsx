"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { localMedia } from "@/lib/local-media";

const MIN_VISIBLE_MS = 1100;
const LETTERS = "OASIS".split("");
const GRAY = "#9ca3af";
const NAVY = "#1e3a5f";
const TEAL = "#2a7f8f";

export function AppLoader() {
  const { messages } = useLocale();
  const t = messages.loader;
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const started = useRef(false);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.src = localMedia.heroVideo;

    const start = performance.now();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      setPhase("done");
      window.setTimeout(() => setVisible(false), wait + 500);
    };

    const onWindowLoad = () => finish();
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    video.addEventListener("canplaythrough", finish, { once: true });
    video.addEventListener(
      "loadeddata",
      () => {
        if (performance.now() - start > 500) finish();
      },
      { once: true }
    );

    const safety = window.setTimeout(finish, 3500);

    return () => {
      window.removeEventListener("load", onWindowLoad);
      window.clearTimeout(safety);
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label={t.ariaLabel}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-brand-sky/30 via-white to-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-8 px-8"
          >
            <div className="flex items-baseline justify-center" aria-hidden>
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  className="inline-block font-bold leading-none tracking-[0.18em] sm:tracking-[0.22em]"
                  style={{ fontSize: "clamp(2.75rem, 12vw, 5rem)" }}
                  initial={{ color: GRAY, opacity: 0.4, y: 6 }}
                  animate={{
                    color: [GRAY, GRAY, NAVY, phase === "done" ? TEAL : NAVY],
                    opacity: [0.4, 0.7, 1, 1],
                    y: [6, 2, 0, 0],
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.15 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.35, 0.7, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              <motion.div
                className="h-0.5 overflow-hidden rounded-full bg-border"
                style={{ width: "clamp(8rem, 40vw, 12rem)" }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--brand-navy)] via-brand-teal to-brand-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: phase === "done" ? "100%" : "65%" }}
                  transition={{
                    width: {
                      duration: phase === "done" ? 0.35 : 1.8,
                      ease: phase === "done" ? "easeOut" : "easeInOut",
                    },
                  }}
                />
              </motion.div>

              <motion.p
                className="text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:text-[11px]"
                animate={{ opacity: phase === "done" ? 0.5 : 0.85 }}
              >
                {t.loading}
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            className="accent-bar absolute inset-x-0 bottom-0 h-1"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "done" ? 1 : 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
