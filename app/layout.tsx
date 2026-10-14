import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppLoader } from "@/components/loading/AppLoader";
import { BrandStyles } from "@/components/providers/BrandStyles";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { SiteHeaderShell } from "@/components/layout/SiteHeaderShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { localMedia } from "@/lib/local-media";
import { siteContent } from "@/lib/site-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.alianzaoasis.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteContent.name} | ${siteContent.nameEn}`,
    template: `%s · Alianza Oasis`,
  },
  description: `${siteContent.tagline} / ${siteContent.taglineEn}`,
  openGraph: {
    type: "website",
    locale: "es_US",
    alternateLocale: ["en_US"],
    siteName: siteContent.name,
    title: `${siteContent.name} | ${siteContent.nameEn}`,
    description: siteContent.tagline,
    images: [
      {
        url: localMedia.heroPoster,
        width: 720,
        height: 1280,
        alt: siteContent.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteContent.name} | ${siteContent.nameEn}`,
    description: siteContent.tagline,
    images: [localMedia.heroPoster],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} min-h-screen font-sans`}>
        <LocaleProvider initialLocale={locale}>
          <BrandStyles />
          <AppLoader />
          <SiteHeaderShell />
          <main>{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
