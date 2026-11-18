import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { delayStyle } from "@/lib/motion";

import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { Container } from "./Container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  image: StaticImageData;
  imageAlt: string;
  breadcrumbs: BreadcrumbItem[];
  children?: ReactNode;
}

/** Image-backed hero used at the top of every inner page. The image is the LCP element. */
export function PageHero({ eyebrow, title, description, image, imageAlt, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-white">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        placeholder="blur"
        fetchPriority="high"
        loading="eager"
        className="animate-ken-burns -z-20 object-cover opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950 via-forest-950/80 to-forest-950/20"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-forest-950/70 to-transparent"
      />

      <Container className="py-20 sm:py-24 lg:py-32">
        <div className="animate-enter">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <p
          className="animate-enter mt-10 text-xs font-bold tracking-[0.22em] text-leaf-300 uppercase"
          style={delayStyle(80)}
        >
          {eyebrow}
        </p>
        <h1
          className="animate-enter mt-4 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl"
          style={delayStyle(160)}
        >
          {title}
        </h1>
        <div
          className="animate-enter mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl"
          style={delayStyle(260)}
        >
          {description}
        </div>
        {children ? (
          <div className="animate-enter mt-10" style={delayStyle(360)}>
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
