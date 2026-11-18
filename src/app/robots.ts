import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

/** Non-production deployments (Vercel previews) are kept out of search indexes. */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

  return {
    rules: isProduction ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
