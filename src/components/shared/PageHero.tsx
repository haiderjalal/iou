import Image, { type StaticImageData } from "next/image";
import { ViewTransition, type ReactNode } from "react";

import { delayStyle } from "@/lib/motion";

import { AnimatedWords } from "./AnimatedWords";
import { AuroraBackdrop } from "./AuroraBackdrop";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { Container } from "./Container";
import { LeafField } from "./LeafField";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  image: StaticImageData;
  imageAlt: string;
  breadcrumbs: BreadcrumbItem[];
  /** Optional view-transition name so a matching image elsewhere morphs into this hero. */
  transitionName?: string;
  children?: ReactNode;
}

/** Image-backed hero used at the top of every inner page. The image is the LCP element. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  breadcrumbs,
  transitionName,
  children,
}: PageHeroProps) {
  const photo = (
    <div className="hero-sink absolute inset-0 -z-20">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        placeholder="blur"
        fetchPriority="high"
        loading="eager"
        className="animate-ken-burns object-cover opacity-55"
      />
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-white">
      {transitionName ? (
        <ViewTransition name={transitionName} share="morph" default="none">
          {photo}
        </ViewTransition>
      ) : (
        photo
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950 via-forest-950/80 to-forest-950/20"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-forest-950/70 to-transparent"
      />
      <AuroraBackdrop className="opacity-70 mix-blend-screen" />
      <LeafField />

      <Container className="hero-exit py-20 sm:py-24 lg:py-32">
        <div className="animate-enter">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <p
          className="animate-enter mt-10 text-xs font-bold tracking-[0.22em] text-leaf-300 uppercase"
          style={delayStyle(80)}
        >
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
          <AnimatedWords parts={title} startDelay={160} />
        </h1>
        <div
          className="animate-enter mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl"
          style={delayStyle(450)}
        >
          {description}
        </div>
        {children ? (
          <div className="animate-enter mt-10" style={delayStyle(560)}>
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
