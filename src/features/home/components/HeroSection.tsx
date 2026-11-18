import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { delayStyle } from "@/lib/motion";
import heroImage from "@public/images/stock/hero.jpg";

import { HeroSkyline } from "./HeroSkyline";

/** Leaves drifting across the hero: [left %, top %, size px, duration s, delay ms]. */
const LEAVES: Array<[number, number, number, number, number]> = [
  [8, 22, 18, 13, 0],
  [86, 18, 22, 16, 1200],
  [72, 54, 14, 12, 600],
  [40, 12, 12, 15, 2000],
];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-forest-950 text-white lg:min-h-[calc(100svh-5rem)]"
    >
      <Image
        src={heroImage}
        alt="Aerial view of Islamabad with the green Margalla Hills rising behind the city"
        fill
        sizes="100vw"
        placeholder="blur"
        fetchPriority="high"
        loading="eager"
        quality={70}
        className="animate-ken-burns -z-20 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/95 via-forest-950/70 to-forest-950/20"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-forest-950 to-transparent"
      />

      {LEAVES.map(([left, top, size, duration, delay]) => (
        <svg
          key={`${left}-${top}`}
          viewBox="0 0 24 24"
          aria-hidden
          className="animate-drift pointer-events-none absolute -z-10 hidden fill-leaf-400/50 sm:block"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            ...delayStyle(delay, { "--duration": `${duration}s` }),
          }}
        >
          <path d="M5 21c.5-6.5 4-12.5 16-18-1 8.5-5.5 15-13 15.5-1.2.1-2.2.8-3 2.5Z" />
        </svg>
      ))}

      <Container className="relative pt-16 pb-48 sm:pb-56 lg:pt-20 lg:pb-64">
        <p
          className="animate-enter inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-leaf-200 uppercase ring-1 ring-white/15 backdrop-blur-md"
          style={delayStyle(0)}
        >
          <span aria-hidden className="size-2 rounded-full bg-leaf-400 shadow-[0_0_12px] shadow-leaf-400" />
          Policy research · Advocacy · Citizen action
        </p>

        <h1
          id="hero-heading"
          className="animate-enter mt-7 max-w-4xl text-[2.6rem] leading-[1.04] font-semibold sm:text-6xl lg:text-7xl"
          style={delayStyle(120)}
        >
          Building <em className="font-medium text-leaf-300">nature-inclusive</em> cities for Pakistan.
        </h1>

        <p
          className="animate-enter mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl"
          style={delayStyle(240)}
        >
          What began as citizens protecting Islamabad&apos;s trees is now a think tank. The Institute of Urbanism brings
          evidence, people and partners together for green, just urban development.
        </p>

        <div className="animate-enter mt-10 flex flex-wrap gap-4" style={delayStyle(360)}>
          <ButtonLink href="/thematic-areas" variant="secondary">
            Explore our work
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </ButtonLink>
          <ButtonLink href="/about" variant="ghost-light">
            Read our story
          </ButtonLink>
        </div>
      </Container>

      <HeroSkyline />

      <a
        href="#our-story"
        className="animate-scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white md:flex"
      >
        <ArrowDown className="size-4" aria-hidden />
        Scroll to our story
      </a>
    </section>
  );
}
