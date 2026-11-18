import { cn } from "@/lib/cn";

const ROW_ONE = ["Urban mobility", "Sustainable consumption", "Waste as resource", "Eco-entrepreneurship"];
const ROW_TWO = ["Nature inclusive cities", "Clean air", "Green jobs", "Just urban development", "Citizen action"];

interface KineticRowProps {
  words: string[];
  direction: "left" | "right";
}

function KineticRow({ words, direction }: KineticRowProps) {
  // Repeated so the row stays filled while it slides by up to 30% of its width.
  const repeated = [...words, ...words, ...words];

  return (
    <div
      className={cn(
        "flex w-max items-center gap-8 font-display text-5xl font-semibold whitespace-nowrap sm:gap-12 sm:text-7xl lg:text-8xl",
        direction === "left" ? "kinetic-left" : "kinetic-right",
      )}
    >
      {repeated.map((word, index) => (
        <span key={`${word}-${index}`} className="flex items-center gap-8 sm:gap-12">
          <span
            className={
              index % 2 === 0 ? "text-forest-900" : "text-transparent [-webkit-text-stroke:1.5px_var(--color-leaf-600)]"
            }
          >
            {word}
          </span>
          <svg viewBox="0 0 24 24" className="size-8 shrink-0 fill-leaf-500 sm:size-12">
            <path d="M5 21c.5-6.5 4-12.5 16-18-1 8.5-5.5 15-13 15.5-1.2.1-2.2.8-3 2.5Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/**
 * Oversized typography that slides sideways as the visitor scrolls (scroll-linked,
 * so it never moves on its own). Purely decorative — it repeats the thematic areas.
 */
export function KineticBand() {
  return (
    <div aria-hidden className="overflow-hidden py-14 select-none sm:py-20">
      <div className="space-y-4 sm:space-y-6">
        <KineticRow words={ROW_ONE} direction="left" />
        <KineticRow words={ROW_TWO} direction="right" />
      </div>
    </div>
  );
}
