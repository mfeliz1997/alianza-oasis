"use client";

type HeroVideoBackgroundProps = {
  src: string;
  poster?: string;
};

/** Video de iglesia/adoración — translúcido sobre fondo blanco. */
export function HeroVideoBackground({ src, poster }: HeroVideoBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-[0.32]"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white" />
      <div
        className="absolute bottom-0 left-0 right-0 h-1 accent-bar opacity-80"
        aria-hidden
      />
    </div>
  );
}
