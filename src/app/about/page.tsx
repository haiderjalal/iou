import { ArrowUpRight, FileText } from "lucide-react";
import Image from "next/image";

import { ApproachGrid } from "@/components/shared/ApproachGrid";
import { Container } from "@/components/shared/Container";
import { GetInvolvedBand } from "@/components/shared/GetInvolvedBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { KineticBand } from "@/components/shared/KineticBand";
import { MissionVisionBand } from "@/components/shared/MissionVisionBand";
import { PageHero } from "@/components/shared/PageHero";
import { PageTransition } from "@/components/shared/PageTransition";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MILESTONES, SITE } from "@/content/site";
import { Timeline } from "@/features/about/components/Timeline";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import faisalMosqueImage from "@public/images/stock/faisal-mosque.jpg";
import seedlingImage from "@public/images/stock/seedling.jpg";

const TITLE = "About us — from citizens' movement to think tank";
const DESCRIPTION =
  "The Institute of Urbanism grew out of Reclaiming Green Islamabad, a 2015 citizens' movement. Learn our story, mission, vision and how we work for nature-inclusive cities.";

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: "/about" });

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Who we are"
        title="Born on the streets of Islamabad. Built for every Pakistani city."
        description="IoU is a policy research institute and think tank that turns a citizens' fight for green spaces into evidence, policy options and social action."
        image={faisalMosqueImage}
        imageAlt="The Faisal Mosque in Islamabad set against the forested Margalla Hills"
        breadcrumbs={[{ name: "About", path: "/about" }]}
      />

      <section aria-labelledby="who-heading" className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading id="who-heading" eyebrow="Our story" title="A movement that became an institution." />
            <div className="reveal-wipe relative mt-10 aspect-square overflow-hidden rounded-[2rem] shadow-xl shadow-forest-900/15">
              <Image
                src={seedlingImage}
                alt="Cupped hands holding a young green seedling above the soil"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7 lg:pt-14">
            <p className="reveal first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.85] first-letter:font-semibold first-letter:text-leaf-700">
              The Institute of Urbanism (IoU) was established in April 2019 as a result of a citizens&apos; movement
              called <strong className="text-forest-900">Reclaiming Green Islamabad (RGI)</strong>. The movement came
              into existence in 2015 as a reaction to rapid road-infrastructure development in Islamabad, which resulted
              in the cutting of old trees, the loss of green and open spaces and poor air quality.
            </p>
            <p className="reveal">
              RGI staged several public demonstrations and filed public-interest litigation against the cutting of trees
              and the shrinking balance between green and grey in the city. The movement earned recognition and laid a
              foundation for participatory governance around urban environmental issues. Together, the media and a
              citizens&apos; alliance helped shelve infrastructure projects that conflicted with the principles of
              environmental conservation.
            </p>
            <p className="reveal">
              RGI has since become an important stakeholder in development projects in the city. To organise the social
              capital it created — and to bring a structured approach to sustainable urban development — a policy
              research institute was needed: a think tank that could provide empirical data to influence policy options
              and propel social action for improved urban governance that treats the environment as an integral part of
              the planning process.
            </p>
            <p className="reveal">
              With this context, IoU was registered with the Securities and Exchange Commission of Pakistan (SECP) in
              October 2024.
            </p>
          </div>
        </Container>
      </section>

      <KineticBand />

      <section aria-labelledby="timeline-heading" className="bg-leaf-50/70 py-20 lg:py-28">
        <Container>
          <SectionHeading id="timeline-heading" eyebrow="Milestones" title="Our journey so far." align="center" />
          <Timeline milestones={MILESTONES} />
        </Container>
      </section>

      <MissionVisionBand />

      <section aria-labelledby="how-heading" className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="how-heading"
              eyebrow="How we work"
              title="Research, advocacy, dialogue, partnership."
              description="We bring empirical evidence and the voices of citizens into the rooms where cities are planned."
            />
          </div>
          <div className="lg:col-span-8">
            <ApproachGrid />
          </div>
        </Container>
      </section>

      <section aria-labelledby="transparency-heading" className="pb-4">
        <Container>
          <div className="reveal flex flex-col items-start gap-6 rounded-[1.75rem] bg-white p-8 shadow-sm ring-1 ring-forest-900/5 sm:flex-row sm:items-center sm:p-10">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
              <FileText className="size-7" aria-hidden />
            </span>
            <div className="flex-1">
              <h2 id="transparency-heading" className="text-2xl font-semibold text-forest-900">
                Transparency
              </h2>
              <p className="mt-1 text-muted">
                We believe accountability builds trust. Read IoU&apos;s transparency document.
              </p>
            </div>
            <a
              href={SITE.transparencyDocument}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-leaf-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-leaf-800"
            >
              View document
              <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </div>
        </Container>
      </section>

      <GetInvolvedBand />
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/about" })} />
    </PageTransition>
  );
}
