import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GetInvolvedBand } from "@/components/shared/GetInvolvedBand";
import { PageTransition } from "@/components/shared/PageTransition";
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
 * Every valid slug is prerendered by generateStaticParams. Unknown slugs render the
 * not-found UI with a noindex robots tag. (With Cache Components the static shell's
 * status is sent first, so the HTTP status is 200 rather than 404.)
 */
export default async function ThematicAreaPage({ params }: PageProps<"/thematic-areas/[slug]">) {
  const { slug } = await params;
  const area = getThematicArea(slug);
  if (!area) notFound();

  return (
    <PageTransition>
      <ThematicAreaDetail area={area} />
      <GetInvolvedBand />
    </PageTransition>
  );
}
