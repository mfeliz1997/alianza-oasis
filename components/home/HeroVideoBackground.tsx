"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { localMedia } from "@/lib/local-media";

type HeroVideoBackgroundProps = {
  src: string;
  poster?: string;
};

function resolveHeroSrc(src: string | undefined): string {
  if (!src?.trim() || src.startsWith("http")) return localMedia.heroVideo;
  return src;
}

/** Video de fondo del hero — visible bajo overlay suave. */
export function HeroVideoBackground({
  src,
  poster = localMedia.community[0],
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const resolvedSrc = resolveHeroSrc(src);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => {
        /* autoplay blocked until interaction */
      });
    };

    const onReady = () => {
      setReady(true);
      tryPlay();
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    if (video.readyState >= 2) onReady();
    tryPlay();

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, [resolvedSrc]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: ready ? 1 : 0.4, scale: 1.02 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={resolvedSrc} type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-black/55 md:bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80 md:from-black/65 md:via-black/45 md:to-black/70" />
      <div
        className="absolute bottom-0 left-0 right-0 h-1 accent-bar opacity-80"
        aria-hidden
      />
    </div>
  );
}
