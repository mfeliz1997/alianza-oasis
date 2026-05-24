import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppLoader } from "@/components/loading/AppLoader";
import { BrandStyles } from "@/components/providers/BrandStyles";
import { SiteHeaderShell } from "@/components/layout/SiteHeaderShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} min-h-screen font-sans`}>
        <BrandStyles />
        <AppLoader />
        <SiteHeaderShell />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
