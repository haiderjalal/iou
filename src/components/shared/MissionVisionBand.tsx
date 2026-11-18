import { Compass, Eye } from "lucide-react";
import Image from "next/image";

import { MISSION, VISION } from "@/content/site";
import islamabadHillImage from "@public/images/stock/islamabad-hill-portrait.jpg";

import { Container } from "./Container";
import { LogoMark } from "./LogoMark";

/** Mission and vision statements over a parallax view of Islamabad. */
export function MissionVisionBand() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="relative isolate overflow-hidden bg-forest-900 py-24 text-white lg:py-36"
    >
      <Image
        src={islamabadHillImage}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="parallax -z-20 scale-110 object-cover opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-forest-950/80 via-forest-900/70 to-forest-950/90"
      />

      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="reveal">
          <LogoMark tone="light" className="h-16 w-auto" />
          <h2 id="mission-heading" className="mt-8 text-4xl leading-tight font-semibold sm:text-5xl">
            Cities where nature is part of the plan.
          </h2>
        </div>

        <div className="space-y-6">
          <div className="reveal rounded-3xl bg-white/10 p-8 ring-1 ring-white/15 backdrop-blur-md">
            <h3 className="flex items-center gap-3 font-sans text-sm font-bold tracking-[0.2em] text-leaf-300 uppercase">
              <Compass className="size-5" aria-hidden />
              Our mission
            </h3>
            <p className="mt-4 font-display text-2xl leading-snug">{MISSION}</p>
          </div>
          <div className="reveal rounded-3xl bg-leaf-500 p-8 text-forest-950">
            <h3 className="flex items-center gap-3 font-sans text-sm font-bold tracking-[0.2em] uppercase">
              <Eye className="size-5" aria-hidden />
              Our vision
            </h3>
            <p className="mt-4 font-display text-3xl font-semibold">{VISION}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
