"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";

export type ScheduleSlotCard = {
  id: string;
  title: string;
  timeLabel: string;
  languages: string;
  note: string;
  streamed: boolean;
  image: string | null;
};

export function ServiceScheduleCards({
  slots,
  liveLabel,
}: {
  slots: ScheduleSlotCard[];
  liveLabel: string;
}) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {slots.map((slot, index) => (
        <motion.li
          key={slot.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-24px" }}
          transition={{ delay: index * 0.06, duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:border-brand-gold hover:shadow-md"
        >
          {slot.image && (
            <div className="relative aspect-[16/9] bg-muted">
              <Image
                src={slot.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-start justify-between gap-2">
              <div>
                {slot.title ? (
                  <h3 className="font-medium">{slot.title}</h3>
                ) : null}
                <p
                  className={
                    slot.title
                      ? "mt-1 text-sm font-medium text-brand-teal"
                      : "text-sm font-medium text-brand-teal"
                  }
                >
                  {slot.timeLabel}
                </p>
              </div>
              {slot.streamed && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-brand-gold">
                  <Radio className="h-3 w-3" />
                  {liveLabel}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">
              {slot.languages}
            </p>
            {slot.note ? (
              <p className="mt-1 text-xs text-muted-foreground/80">{slot.note}</p>
            ) : null}
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
