import { Compass, Eye } from "lucide-react";
import Image from "next/image";

import { MISSION, VISION } from "@/content/site";
import islamabadHillImage from "@public/images/stock/islamabad-hill-portrait.jpg";

import { AuroraBackdrop } from "./AuroraBackdrop";
import { Container } from "./Container";
import { LeafField } from "./LeafField";
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
      <AuroraBackdrop className="opacity-70" />
      <LeafField />

      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="reveal">
          <div className="relative grid size-36 place-items-center">
            {/* Slowly orbiting rings around the assembling IoU mark */}
            <svg viewBox="0 0 144 144" aria-hidden className="anim-spin absolute inset-0 size-full">
              <circle
                cx="72"
                cy="72"
                r="68"
                className="fill-none stroke-leaf-400/50"
                strokeWidth={1.5}
                strokeDasharray="4 10"
              />
              <circle cx="72" cy="4" r="4" className="fill-leaf-300" />
            </svg>
            <svg
              viewBox="0 0 144 144"
              aria-hidden
              className="anim-spin-reverse absolute inset-3 size-[calc(100%-1.5rem)]"
            >
              <circle
                cx="60"
                cy="60"
                r="56"
                transform="translate(12 12)"
                className="fill-none stroke-white/15"
                strokeWidth={1}
                strokeDasharray="1 7"
              />
            </svg>
            <span aria-hidden className="anim-pulse-ring absolute inset-8 rounded-full bg-leaf-500/30" />
            <LogoMark tone="light" assemble className="relative h-16 w-auto" />
          </div>
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
