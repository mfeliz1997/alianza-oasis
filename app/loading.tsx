import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
} from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export default async function Loading() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = getMessages(locale);

  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-5 px-6"
      role="status"
      aria-live="polite"
      aria-label={t.loader.ariaLabel}
    >
      <div className="relative h-1.5 w-36 overflow-hidden rounded-full bg-muted sm:w-40">
        <div className="absolute inset-y-0 left-0 w-1/3 animate-[shimmer_1.2s_ease-in-out_infinite] rounded-full bg-primary" />
      </div>
      <p className="text-sm text-muted-foreground">{t.loader.loading}</p>
    </div>
  );
}
