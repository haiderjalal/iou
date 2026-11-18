import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";

import { AnimatedWords } from "@/components/shared/AnimatedWords";
import { AuroraBackdrop } from "@/components/shared/AuroraBackdrop";
import { Container } from "@/components/shared/Container";
import { LeafField } from "@/components/shared/LeafField";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { delayStyle } from "@/lib/motion";
import heroImage from "@public/images/stock/hero.jpg";

import { HeroSkyline } from "./HeroSkyline";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-forest-950 text-white lg:min-h-[calc(100svh-5rem)]"
    >
      {/* The photo sinks slower than the page scrolls (parallax) while slowly zooming. */}
      <div className="hero-sink absolute inset-0 -z-20">
        <Image
          src={heroImage}
          alt="Aerial view of Islamabad with the green Margalla Hills rising behind the city"
          fill
          sizes="100vw"
          placeholder="blur"
          fetchPriority="high"
          loading="eager"
          quality={70}
          className="animate-ken-burns object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/95 via-forest-950/70 to-forest-950/20"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-forest-950 to-transparent"
      />
      <AuroraBackdrop className="opacity-80 mix-blend-screen" />
      <LeafField />

      <Container className="hero-exit relative pt-16 pb-52 sm:pb-60 lg:pt-20 lg:pb-72">
        <p
          className="animate-enter inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-leaf-200 uppercase ring-1 ring-white/15 backdrop-blur-md"
          style={delayStyle(0)}
        >
          <span aria-hidden className="relative flex size-2">
            <span className="anim-pulse-ring absolute inset-0 rounded-full bg-leaf-400" />
            <span className="relative size-2 rounded-full bg-leaf-400" />
          </span>
          Policy research · Advocacy · Citizen action
        </p>

        <h1
          id="hero-heading"
          className="mt-7 max-w-4xl text-[2.6rem] leading-[1.06] font-semibold sm:text-6xl lg:text-7xl"
        >
          <AnimatedWords
            startDelay={150}
            highlightClassName="font-medium italic"
            parts={[
              { text: "Building" },
              { text: "nature-inclusive", highlight: true },
              { text: "cities for Pakistan." },
            ]}
          />
        </h1>

        <p
          className="animate-enter mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl"
          style={delayStyle(650)}
        >
          What began as citizens protecting Islamabad&apos;s trees is now a think tank. The Institute of Urbanism brings
          evidence, people and partners together for green, just urban development.
        </p>

        <div className="animate-enter mt-10 flex flex-wrap gap-4" style={delayStyle(800)}>
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
        className="animate-scroll-cue absolute top-6 right-6 hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white/75 uppercase ring-1 ring-white/15 backdrop-blur-md transition-colors hover:text-white lg:flex"
      >
        <ArrowDown className="size-4" aria-hidden />
        Scroll to our story
      </a>
    </section>
  );
}
