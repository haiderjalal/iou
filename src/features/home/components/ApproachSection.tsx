import Image from "next/image";

import { ApproachGrid } from "@/components/shared/ApproachGrid";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import dialogueImage from "@public/images/stock/dialogue.jpg";

export function ApproachSection() {
  return (
    <section aria-labelledby="approach-heading" className="bg-leaf-50/70 py-20 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="approach-heading"
            eyebrow="How we work"
            title="Evidence in, action out."
            description="As a think tank with roots in civic activism, IoU connects empirical research with the people and institutions that shape our cities."
          />
          <div className="reveal relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-xl shadow-forest-900/15">
            <Image
              src={dialogueImage}
              alt="A group of people in a lively discussion during a community meeting"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-4">
          <ApproachGrid />
        </div>
      </Container>
    </section>
  );
}
