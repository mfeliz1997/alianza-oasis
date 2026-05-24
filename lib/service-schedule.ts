import { siteContent, type ServiceSlot } from "./site-content";

const TZ = "America/New_York";

type NYParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: number;
};

function getNYParts(date: Date): NYParts {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });
  const parts = fmt.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "0";

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    weekday: weekdayMap[get("weekday")] ?? 0,
  };
}

/** Convierte fecha/hora en NY a instante UTC (aproximación iterativa). */
function nyWallTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
): Date {
  let guess = new Date(Date.UTC(year, month - 1, day, hour + 5, minute));
  for (let i = 0; i < 4; i++) {
    const p = getNYParts(guess);
    const diffMin =
      (hour - p.hour) * 60 +
      (minute - p.minute) +
      (day - p.day) * 24 * 60;
    guess = new Date(guess.getTime() + diffMin * 60 * 1000);
  }
  return guess;
}

export type NextService = {
  targetDate: string;
  title: string;
  subtitle: string;
  slot: ServiceSlot;
};

export function getNextService(): NextService | null {
  const now = new Date();
  const candidates: NextService[] = [];

  for (let offset = 0; offset < 14; offset++) {
    const probe = new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);
    const ny = getNYParts(probe);

    for (const slot of siteContent.serviceSchedule) {
      if (slot.day !== ny.weekday) continue;

      const target = nyWallTimeToUtc(
        ny.year,
        ny.month,
        ny.day,
        slot.hour,
        slot.minute
      );

      if (target.getTime() > now.getTime() + 60_000) {
        candidates.push({
          targetDate: target.toISOString(),
          title: siteContent.youtube.countdownTitle,
          subtitle: `${slot.title} · ${slot.timeLabel}`,
          slot,
        });
      }
    }
  }

  if (!candidates.length) return null;
  candidates.sort(
    (a, b) =>
      new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
  );
  return candidates[0];
}

/** Ventana de “servicio en curso” (~2h15 desde el inicio). */
export function isDuringServiceWindow(slot: ServiceSlot, now = new Date()): boolean {
  const ny = getNYParts(now);
  if (ny.weekday !== slot.day) return false;

  const start = nyWallTimeToUtc(ny.year, ny.month, ny.day, slot.hour, slot.minute);
  const end = new Date(start.getTime() + (2 * 60 + 15) * 60 * 1000);
  return now >= start && now <= end;
}

export function getActiveStreamableService(): ServiceSlot | null {
  return (
    siteContent.serviceSchedule.find(
      (s) => s.streamed && isDuringServiceWindow(s)
    ) ?? null
  );
}
