"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChurchLogo } from "@/components/brand/ChurchLogo";
import { useLocale } from "@/components/providers/LocaleProvider";
import { localMedia } from "@/lib/local-media";
import { siteContent } from "@/lib/site-content";

const MIN_VISIBLE_MS = 900;

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
      window.setTimeout(() => setVisible(false), wait + 400);
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
          className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-warm"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label={t.ariaLabel}
        >
          <div className="accent-bar absolute inset-x-0 top-0 h-1 opacity-90" />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-10 px-8"
          >
            <ChurchLogo
              alt={siteContent.logo.alt}
              size="loader"
              priority
            />

            <div className="flex w-48 flex-col items-center gap-3">
              <div className="relative h-px w-full overflow-hidden rounded-full bg-border">
                <motion.span
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-teal"
                  animate={{ x: ["-100%", "320%"] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                {phase === "done" ? "…" : t.loading}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
