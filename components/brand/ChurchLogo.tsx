import Image from "next/image";
import { cn } from "@/lib/utils";
import { localMedia } from "@/lib/local-media";

const SIZES = {
  header: "relative block h-11 w-[8.75rem] shrink-0 sm:h-12 sm:w-40",
  footer: "relative h-11 w-36",
  loader: "relative h-[4.5rem] w-56 sm:h-20 sm:w-64",
  panel: "relative h-12 w-44",
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
  const logoSrc = src?.trim() || localMedia.logo.avif;
  const useLocal = !src || logoSrc.startsWith("/");

  return (
    <span className={cn(SIZES[size], className)}>
      <Image
        src={logoSrc}
        alt={alt}
        fill
        className="object-contain object-left drop-shadow-sm"
        sizes={
          size === "loader"
            ? "256px"
            : size === "header"
              ? "160px"
              : "144px"
        }
        priority={priority}
        unoptimized={!useLocal}
      />
    </span>
  );
}
