import { ArrowRight, TreeDeciduous } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import faisalMosqueImage from "@public/images/stock/faisal-mosque.jpg";
import greenStreetImage from "@public/images/stock/green-street.jpg";

const STORY_POINTS = [
  { year: "2015", text: "Citizens form Reclaiming Green Islamabad to defend the city's trees and open spaces." },
  { year: "2019", text: "The movement's social capital becomes the Institute of Urbanism, a policy think tank." },
  { year: "Today", text: "IoU turns evidence into policy options and social action for better urban governance." },
];

export function StorySection() {
  return (
    <section id="our-story" aria-labelledby="story-heading" className="scroll-mt-24 py-20 lg:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="reveal-wipe relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-forest-900/20 sm:w-4/5">
            <Image
              src={greenStreetImage}
              alt="A quiet, tree-lined city road with a footpath shaded by mature trees"
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="reveal-wipe absolute right-0 -bottom-10 hidden aspect-[4/3] w-1/2 overflow-hidden rounded-[1.5rem] border-8 border-paper shadow-xl sm:block">
            <Image
              src={faisalMosqueImage}
              alt="The Faisal Mosque in Islamabad against the Margalla Hills"
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="anim-bob absolute top-8 -right-2 max-w-60 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5 sm:right-6 lg:-right-6">
            <TreeDeciduous className="size-7 text-leaf-500" aria-hidden />
            <p className="mt-2 font-display text-lg leading-snug text-forest-900">
              Restoring the balance between green and grey.
            </p>
            <p className="mt-3 text-xs font-bold tracking-[0.18em] text-leaf-700 uppercase">Since 2015</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            id="story-heading"
            eyebrow="Our story"
            title={
              <>
                From a citizens&apos; movement <span className="text-leaf-700 italic">to a think tank.</span>
              </>
            }
            description="In 2015, rapid road construction in Islamabad cut down old trees, shrank green spaces and worsened air quality. Citizens responded with Reclaiming Green Islamabad — demonstrations, public-interest litigation and a new culture of participatory governance."
          />

          <ol className="stagger mt-10 space-y-6 border-l-2 border-leaf-200 pl-8">
            {STORY_POINTS.map((point) => (
              <li key={point.year} className="reveal relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[2.4rem] size-4 rounded-full border-4 border-paper bg-leaf-500 ring-2 ring-leaf-200"
                />
                <p className="font-display text-xl font-semibold text-leaf-700">{point.year}</p>
                <p className="mt-1 text-muted">{point.text}</p>
              </li>
            ))}
          </ol>

          <ButtonLink href="/about" variant="outline" className="reveal mt-10">
            Who we are
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
