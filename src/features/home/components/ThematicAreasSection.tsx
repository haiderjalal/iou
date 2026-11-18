import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ThematicCard } from "@/features/thematic-areas/components/ThematicCard";
import { THEMATIC_AREAS } from "@/features/thematic-areas/data/thematicAreas";

export function ThematicAreasSection() {
  return (
    <section aria-labelledby="thematic-heading" className="py-20 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="thematic-heading"
            eyebrow="Thematic areas"
            title="Four pathways to greener, fairer cities."
            description="Our programmes tackle the forces shaping Pakistan's urban environment — how we move, what we consume, what we throw away and who builds the solutions."
          />
          <ButtonLink href="/thematic-areas" variant="outline" className="reveal shrink-0 self-start lg:self-auto">
            All thematic areas
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </ButtonLink>
        </div>

        <div className="stagger mt-14 grid gap-6 md:grid-cols-2">
          {THEMATIC_AREAS.map((area) => (
            <ThematicCard key={area.slug} area={area} />
          ))}
        </div>
      </Container>
    </section>
  );
}
