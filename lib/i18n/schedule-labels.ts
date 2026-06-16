import type { Messages } from "./messages";

const TIME_KEYS = {
  "sunday-first": "timeSundayFirst",
  "sunday-second": "timeSundaySecond",
  friday: "timeFriday",
  saturday: "timeSaturday",
} as const;

const NOTE_KEYS = {
  friday: "noteFriday",
} as const;

export type ScheduleSlotId = keyof typeof TIME_KEYS;

export function getLocalizedTimeLabel(
  slotId: string,
  t: Messages
): string {
  const key = TIME_KEYS[slotId as ScheduleSlotId];
  if (!key) return "";
  return t.schedule[key as keyof typeof t.schedule] as string;
}

export function getLocalizedServiceLabel(
  slotId: string,
  t: Messages
): string {
  const titleKey =
    slotId === "sunday-first"
      ? "spanishService"
      : slotId === "sunday-second"
        ? "englishService"
        : slotId === "friday"
          ? "fridayService"
          : "saturdayService";

  const title = t.schedule[titleKey as keyof typeof t.schedule] as string;
  const time = getLocalizedTimeLabel(slotId, t);
  return `${title} · ${time}`;
}

export function getLocalizedNote(
  slotId: string,
  t: Messages
): string {
  const key = NOTE_KEYS[slotId as keyof typeof NOTE_KEYS];
  if (!key) return "";
  return t.schedule[key as keyof typeof t.schedule] as string;
}
