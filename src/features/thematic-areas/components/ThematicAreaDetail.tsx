import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { webPageJsonLd } from "@/lib/seo";

import { THEMATIC_AREAS } from "../data/thematicAreas";
import type { ThematicArea } from "../types/thematicArea";

interface ThematicAreaDetailProps {
  area: ThematicArea;
}

export function ThematicAreaDetail({ area }: ThematicAreaDetailProps) {
  const path = `/thematic-areas/${area.slug}`;
  const otherAreas = THEMATIC_AREAS.filter((other) => other.slug !== area.slug);

  return (
    <>
      <PageHero
        eyebrow={`Thematic area · ${area.code}`}
        title={area.title}
        description={area.summary}
        image={area.image}
        imageAlt={area.imageAlt}
        breadcrumbs={[
          { name: "Thematic Areas", path: "/thematic-areas" },
          { name: area.title, path },
        ]}
      />

      <section aria-labelledby="context-heading" className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <p className="reveal text-xs font-bold tracking-[0.22em] text-leaf-700 uppercase">The challenge</p>
            <h2
              id="context-heading"
              className="reveal mt-4 text-3xl leading-tight font-semibold text-forest-900 sm:text-4xl"
            >
              Why {area.title.toLowerCase()} matters
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
              {area.context.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="reveal">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="reveal sticky top-28 overflow-hidden rounded-[1.75rem] bg-forest-900 p-8 text-white">
              <p className="font-display text-6xl font-semibold text-leaf-300">{area.keyFact.value}</p>
              <p className="mt-3 text-lg text-white/80">{area.keyFact.label}</p>
              <div className="mt-8 border-t border-white/15 pt-8">
                <p className="text-sm font-bold tracking-[0.18em] text-leaf-300 uppercase">
                  Work with us on {area.code}
                </p>
                <p className="mt-2 text-white/75">
                  Researchers, policymakers, private sector partners and young leaders — let&apos;s talk.
                </p>
                <Link
                  href="/contact"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-leaf-500 px-5 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-leaf-400"
                >
                  Get in touch
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="objectives-heading" className="bg-leaf-50/70 py-20 lg:py-28">
        <Container>
          <p className="reveal text-xs font-bold tracking-[0.22em] text-leaf-700 uppercase">Our response</p>
          <h2
            id="objectives-heading"
            className="reveal mt-4 max-w-2xl text-3xl leading-tight font-semibold text-forest-900 sm:text-4xl"
          >
            What IoU aims to do
          </h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {area.objectives.map((objective, index) => (
              <li
                key={objective.slice(0, 40)}
                className="reveal flex gap-5 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-forest-900/5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-leaf-700 font-display text-lg font-semibold text-white">
                  {index + 1}
                </span>
                <p className="leading-relaxed text-forest-900">{objective}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="related-heading" className="pt-20 lg:pt-28">
        <Container>
          <h2 id="related-heading" className="reveal text-2xl font-semibold text-forest-900">
            Explore other thematic areas
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {otherAreas.map((other) => (
              <li key={other.slug} className="reveal">
                <Link
                  href={`/thematic-areas/${other.slug}`}
                  className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-forest-900/5 transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-900/10 motion-reduce:hover:translate-y-0"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-leaf-700">{other.code}</span>
                  <span className="mt-2 font-display text-xl font-semibold text-forest-900">{other.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{other.summary}</span>
                  <ArrowRight
                    className="mt-4 size-5 text-leaf-700 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <JsonLd data={webPageJsonLd({ name: area.title, description: area.summary, path })} />
    </>
  );
}
