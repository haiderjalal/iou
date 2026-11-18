import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GetInvolvedBand } from "@/components/shared/GetInvolvedBand";
import { ThematicAreaDetail } from "@/features/thematic-areas/components/ThematicAreaDetail";
import { getThematicArea, THEMATIC_AREAS } from "@/features/thematic-areas/data/thematicAreas";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams(): Array<{ slug: string }> {
  return THEMATIC_AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps<"/thematic-areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = getThematicArea(slug);
  if (!area) return { title: "Thematic area not found", robots: { index: false } };

  return buildMetadata({
    title: `${area.title} (${area.code})`,
    description: area.summary,
    path: `/thematic-areas/${area.slug}`,
  });
}

/**
 * Every valid slug is prerendered by generateStaticParams. Params are awaited outside any
 * Suspense boundary so unknown slugs resolve to notFound() before streaming starts and
 * return a real HTTP 404 instead of a soft 404.
 */
export default async function ThematicAreaPage({ params }: PageProps<"/thematic-areas/[slug]">) {
  const { slug } = await params;
  const area = getThematicArea(slug);
  if (!area) notFound();

  return (
    <>
      <ThematicAreaDetail area={area} />
      <GetInvolvedBand />
    </>
  );
}
