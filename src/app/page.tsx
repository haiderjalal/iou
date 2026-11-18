import type { Metadata } from "next";

import { GetInvolvedBand } from "@/components/shared/GetInvolvedBand";
import { KineticBand } from "@/components/shared/KineticBand";
import { Marquee } from "@/components/shared/Marquee";
import { MissionVisionBand } from "@/components/shared/MissionVisionBand";
import { PageTransition } from "@/components/shared/PageTransition";
import { CREDIBILITY_POINTS, SITE } from "@/content/site";
import { ApproachSection } from "@/features/home/components/ApproachSection";
import { HeroSection } from "@/features/home/components/HeroSection";
import { StatsSection } from "@/features/home/components/StatsSection";
import { StorySection } from "@/features/home/components/StorySection";
import { ThematicAreasSection } from "@/features/home/components/ThematicAreasSection";

export const metadata: Metadata = {
  // Absolute title: the home page should lead with the organisation name, not the template.
  title: { absolute: `${SITE.name} (IoU) — ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <Marquee items={CREDIBILITY_POINTS} label="About the Institute of Urbanism at a glance" />
      <StorySection />
      <StatsSection />
      <KineticBand />
      <ThematicAreasSection />
      <ApproachSection />
      <MissionVisionBand />
      <GetInvolvedBand />
    </PageTransition>
  );
}
