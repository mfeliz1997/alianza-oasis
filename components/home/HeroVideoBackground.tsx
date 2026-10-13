"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { localMedia } from "@/lib/local-media";
import {
  extractYouTubeVideoId,
  youtubeBackgroundEmbedUrl,
} from "@/lib/youtube";

type HeroVideoBackgroundProps = {
  /** Local MP4 path — only used if no YouTube id. Prefer YouTube to avoid Vercel bandwidth. */
  src?: string | null;
  /** YouTube video id or full URL — preferred hero background. */
  youtubeId?: string | null;
  poster?: string;
};

function shouldPlayMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g") {
    return false;
  }
  // Mobile: poster only — lighter and no autoplay friction
  if (window.matchMedia("(max-width: 767px)").matches) return false;
  return true;
}

/** Video de fondo del hero — YouTube preferido (0 bytes en Vercel). */
export function HeroVideoBackground({
  src,
  youtubeId,
  poster = localMedia.heroPoster,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytId = extractYouTubeVideoId(youtubeId);
  const localSrc =
    src && !src.startsWith("http") ? src : ytId ? null : localMedia.heroVideo;

  const [ready, setReady] = useState(false);
  const [playMotion, setPlayMotion] = useState(false);

  useEffect(() => {
    setPlayMotion(shouldPlayMotion());
  }, []);

  useEffect(() => {
    if (!playMotion || ytId || !localSrc) return;
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
    video.load();
    tryPlay();

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, [localSrc, playMotion, ytId]);

  useEffect(() => {
    if (playMotion && ytId) {
      // YouTube iframe has no reliable ready event without API; fade in shortly
      const t = window.setTimeout(() => setReady(true), 600);
      return () => window.clearTimeout(t);
    }
  }, [playMotion, ytId]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: ready || !playMotion ? 1 : 0.85, scale: 1.02 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0">
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {playMotion && ytId && (
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              src={youtubeBackgroundEmbedUrl(ytId)}
              title=""
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
              loading="lazy"
            />
          </div>
        )}

        {playMotion && !ytId && localSrc && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={localSrc} type="video/mp4" />
          </video>
        )}
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
