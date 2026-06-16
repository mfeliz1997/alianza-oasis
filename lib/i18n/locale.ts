export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_COOKIE = "oasis-locale";
export const DEFAULT_LOCALE: Locale = "es";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "es" || value === "en";
}

/** Prefer Spanish unless the browser clearly prefers English. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: qPart ? parseFloat(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    if (tag.startsWith("en")) return "en";
    if (tag.startsWith("es")) return "es";
  }
  return DEFAULT_LOCALE;
}
