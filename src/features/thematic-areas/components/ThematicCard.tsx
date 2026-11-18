import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

import type { ThematicArea } from "../types/thematicArea";

interface ThematicCardProps {
  area: ThematicArea;
  /** Heading level inside the card, so the card fits any page outline. */
  headingLevel?: "h2" | "h3";
  className?: string;
}

export function ThematicCard({ area, headingLevel: Heading = "h3", className }: ThematicCardProps) {
  return (
    <article
      className={cn(
        "reveal group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-forest-900 text-white shadow-xl shadow-forest-900/10",
        className,
      )}
    >
      <Image
        src={area.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        placeholder="blur"
        className="-z-20 object-cover transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950 via-forest-950/70 to-forest-950/10 transition-opacity duration-500 group-hover:opacity-95"
      />

      <span className="absolute top-6 left-6 rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-[0.2em] backdrop-blur-md">
        {area.code}
      </span>
      <span
        aria-hidden
        className="absolute top-6 right-6 grid size-11 place-items-center rounded-full bg-leaf-500 text-forest-950 transition-transform duration-500 group-hover:rotate-45"
      >
        <ArrowUpRight className="size-5" />
      </span>

      <div className="p-7 sm:p-8">
        <Heading className="text-2xl leading-tight font-semibold sm:text-3xl">
          <Link
            href={`/thematic-areas/${area.slug}`}
            className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-[-6px] focus-visible:after:outline-leaf-400"
          >
            {area.title}
          </Link>
        </Heading>
        <p className="mt-3 max-w-md leading-relaxed text-white/80">{area.summary}</p>
        <p className="mt-5 flex items-baseline gap-3 border-t border-white/15 pt-5 text-sm text-white/70">
          <span className="font-display text-2xl font-semibold text-leaf-300">{area.keyFact.value}</span>
          {area.keyFact.label}
        </p>
      </div>
    </article>
  );
}
