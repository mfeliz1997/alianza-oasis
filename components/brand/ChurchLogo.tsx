import Image from "next/image";
import { cn } from "@/lib/utils";
import { localMedia } from "@/lib/local-media";

const SIZES = {
  header: "relative block h-10 w-[11.5rem] shrink-0 sm:h-11 sm:w-[13rem]",
  footer: "relative h-10 w-44 sm:h-11 sm:w-48",
  panel: "relative h-11 w-48 sm:w-52",
} as const;

export type ChurchLogoSize = keyof typeof SIZES;

type ChurchLogoProps = {
  alt: string;
  size?: ChurchLogoSize;
  className?: string;
  priority?: boolean;
  /** Override default local logo (e.g. Sanity URL). */
  src?: string;
};

export function ChurchLogo({
  alt,
  size = "header",
  className,
  priority = false,
  src,
}: ChurchLogoProps) {
  const logoSrc = src?.trim() || localMedia.logo;
  const useLocal = !src || logoSrc.startsWith("/");

  return (
    <span className={cn(SIZES[size], className)}>
      <Image
        src={logoSrc}
        alt={alt}
        fill
        className="object-contain object-left"
        sizes={
          size === "header"
            ? "208px"
            : size === "panel"
              ? "208px"
              : "192px"
        }
        priority={priority}
        unoptimized={!useLocal}
      />
    </span>
  );
}
