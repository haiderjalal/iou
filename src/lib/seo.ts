import type { Metadata } from "next";

import { SITE } from "@/content/site";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/about". */
  path: string;
  /** Site-relative 1200×630 image path; defaults to the IoU share card. */
  image?: string;
}

export const DEFAULT_OG_IMAGE = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Institute of Urbanism — building nature-inclusive cities for Pakistan",
} as const;

/** Builds consistent per-page metadata: canonical URL, Open Graph and Twitter cards. */
export function buildMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const ogImage = image ? { url: image, width: 1200, height: 630, alt: title } : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_PK",
      siteName: SITE.name,
      title,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${absoluteUrl("/")}#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    slogan: SITE.tagline,
    description: SITE.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/iou/logo-wordmark.png"),
    email: SITE.email,
    foundingDate: SITE.foundingDate,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    areaServed: { "@type": "Country", name: "Pakistan" },
    knowsAbout: [
      "Urban mobility",
      "Sustainable consumption",
      "Solid waste management",
      "Green entrepreneurship",
      "Urban governance",
    ],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@type": "WebSite", name: SITE.name, url: absoluteUrl("/") },
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  };
}
