"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

type MinistryPhotoSliderProps = {
  images: readonly string[];
  alt: string;
};

export function MinistryPhotoSlider({ images, alt }: MinistryPhotoSliderProps) {
  const { messages } = useLocale();
  const t = messages.ministriesPage;
  const [index, setIndex] = useState(0);
  const total = images.length;

  const goTo = useCallback(
    (next: number) => {
      if (total <= 1) return;
      setIndex((next + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => goTo(index + 1), 5000);
    return () => clearInterval(timer);
  }, [goTo, index, total]);

  if (!total) return null;

  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-lg md:aspect-[5/4]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={t.prevImage}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground opacity-100 shadow transition hover:bg-white sm:left-3 sm:h-9 sm:w-9 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={t.nextImage}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground opacity-100 shadow transition hover:bg-white sm:right-3 sm:h-9 sm:w-9 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`${t.goToImage} ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all sm:h-1.5 ${
                  i === index
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/80 sm:w-1.5"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
