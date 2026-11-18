import type { Metadata } from "next";

import { GetInvolvedBand } from "@/components/shared/GetInvolvedBand";
import { Marquee } from "@/components/shared/Marquee";
import { MissionVisionBand } from "@/components/shared/MissionVisionBand";
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
    <>
      <HeroSection />
      <Marquee items={CREDIBILITY_POINTS} label="About the Institute of Urbanism at a glance" />
      <StorySection />
      <StatsSection />
      <ThematicAreasSection />
      <ApproachSection />
      <MissionVisionBand />
      <GetInvolvedBand />
    </>
  );
}
