"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/lib/site-content";

const SESSION_KEY = "ao-loader-done";

export function AppLoader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    setVisible(true);
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);

      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
        setTimeout(() => setVisible(false), 280);
      }
    };

    requestAnimationFrame(tick);
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
          aria-label="Cargando sitio"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center gap-8 px-6"
          >
            <motion.div
              className="relative h-24 w-52"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={siteContent.logo.src}
                alt={siteContent.logo.alt}
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </motion.div>

            <div className="w-40">
              <div className="h-px overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full bg-primary transition-[width] duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                {progress}%
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
