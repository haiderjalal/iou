import type { Milestone } from "@/content/site";
import { cn } from "@/lib/cn";
import { cssVars } from "@/lib/motion";

interface TimelineProps {
  milestones: Milestone[];
}

/** Alternating vertical timeline; the centre line fills as it scrolls into view. */
export function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      <div aria-hidden className="absolute top-0 bottom-0 left-5 w-0.5 bg-leaf-200 md:left-1/2 md:-translate-x-1/2">
        <div className="timeline-progress h-full w-full bg-leaf-600" />
      </div>

      <ol className="space-y-12">
        {milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;
          return (
            <li key={milestone.title} className="relative grid md:grid-cols-2 md:gap-16">
              <span aria-hidden className="absolute top-6 left-5 z-10 size-5 -translate-x-1/2 md:left-1/2">
                <span
                  className="anim-pulse-ring absolute inset-0 rounded-full bg-leaf-500"
                  style={cssVars({ "--delay": `${index * -0.7}s` })}
                />
                <span className="absolute inset-0 rounded-full border-4 border-leaf-50 bg-leaf-600 ring-4 ring-leaf-200" />
              </span>
              <div className={cn("reveal pl-14 md:pl-0", isEven ? "md:text-right" : "md:col-start-2")}>
                <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-forest-900/5">
                  <p className="font-display text-2xl font-semibold text-leaf-700">{milestone.year}</p>
                  <h3 className="mt-2 text-xl font-semibold text-forest-900">{milestone.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{milestone.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
