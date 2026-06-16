import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppLoader } from "@/components/loading/AppLoader";
import { BrandStyles } from "@/components/providers/BrandStyles";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { SiteHeaderShell } from "@/components/layout/SiteHeaderShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { siteContent } from "@/lib/site-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteContent.name} | ${siteContent.nameEn}`,
    template: `%s · Alianza Oasis`,
  },
  description: `${siteContent.tagline} Iglesia en Washington Heights, NYC.`,
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
