import type { MetadataRoute } from "next";

import { THEMATIC_AREAS } from "@/features/thematic-areas/data/thematicAreas";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/thematic-areas", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...THEMATIC_AREAS.map((area) => ({
      url: absoluteUrl(`/thematic-areas/${area.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
