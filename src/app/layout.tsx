import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/shared/JsonLd";
import { MotionToggle } from "@/components/shared/MotionToggle";
import { RevealObserver } from "@/components/shared/RevealObserver";
import { SITE } from "@/content/site";
import { MOTION_INIT_SCRIPT } from "@/lib/motionPreference";
import { DEFAULT_OG_IMAGE, organizationJsonLd } from "@/lib/seo";

import "./globals.css";

const headingFont = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} (IoU) — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Institute of Urbanism",
    "IoU",
    "urban planning Pakistan",
    "Islamabad think tank",
    "sustainable cities",
    "urban mobility",
    "waste management Pakistan",
    "Reclaiming Green Islamabad",
    "climate action NGO",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: SITE.name,
    url: "/",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#14261c",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the init script may set data-motion before React hydrates.
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col">
        <script dangerouslySetInnerHTML={{ __html: MOTION_INIT_SCRIPT }} />
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-full bg-leaf-700 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MotionToggle />
        <RevealObserver />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
