"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { localMedia } from "@/lib/local-media";

type HeroVideoBackgroundProps = {
  /** Local compressed MP4 (~1.4 MB). YouTube embeds look poor as backgrounds. */
  src?: string | null;
  poster?: string;
};

function shouldPlayVideo(): boolean {
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
  // Mobile + tablet portrait: poster only — biggest bandwidth win
  if (window.matchMedia("(max-width: 1023px)").matches) return false;
  return true;
}

/** Hero background: poster everywhere; compressed MP4 only on desktop. */
export function HeroVideoBackground({
  src,
  poster = localMedia.heroPoster,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const localSrc =
    src && !src.startsWith("http") ? src : localMedia.heroVideo;

  const [ready, setReady] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    setPlayVideo(shouldPlayVideo());
  }, []);

  useEffect(() => {
    if (!playVideo || !localSrc) return;
    const video = videoRef.current;
    const root = containerRef.current;
    if (!video || !root) return;

    const tryPlay = () => {
      void video.play().catch(() => {
        /* autoplay blocked */
      });
    };

    const onReady = () => {
      setReady(true);
      tryPlay();
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    // Only fetch when hero is on screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
            video.load();
          }
          tryPlay();
        } else {
          video.pause();
        }
      },
      { rootMargin: "80px", threshold: 0.05 }
    );
    io.observe(root);

    if (video.readyState >= 2) onReady();

    return () => {
      io.disconnect();
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, [localSrc, playVideo]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: ready || !playVideo ? 1 : 0.85, scale: 1.02 }}
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

        {playVideo && localSrc && (
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
