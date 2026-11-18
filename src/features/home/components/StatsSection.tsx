import Image from "next/image";

import { Container } from "@/components/shared/Container";
import { CountUp } from "@/components/shared/CountUp";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { STATS } from "@/content/site";
import smogImage from "@public/images/stock/smog-road.jpg";

export function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative isolate overflow-hidden bg-forest-950 py-20 text-white lg:py-32"
    >
      <Image
        src={smogImage}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="parallax -z-20 scale-110 object-cover opacity-35"
      />
      <div aria-hidden className="bg-topo absolute inset-0 -z-10 bg-forest-950/70" />

      <Container>
        <SectionHeading
          id="stats-heading"
          eyebrow="Why it matters"
          tone="light"
          title="Pakistan's cities are at a turning point."
          description="Urbanisation is outpacing planning. The choices made now — on roads, waste, consumption and jobs — will decide whether our cities breathe or choke."
        />

        <dl className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="reveal flex flex-col bg-forest-950/80 p-8 backdrop-blur-sm">
              <dt className="order-2 mt-4 leading-relaxed text-white/80">{stat.label}</dt>
              <dd className="order-1 font-display text-5xl font-semibold text-leaf-300 lg:text-6xl">
                <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </dd>
              <dd className="order-3 mt-auto pt-6 text-xs tracking-wide text-white/60">Source: {stat.source}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
