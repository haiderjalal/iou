import { cn } from "@/lib/cn";
import { cssVars } from "@/lib/motion";

/** [left %, top %, size px, duration s, delay s (negative = start mid-cycle)] */
export type LeafSpec = [number, number, number, number, number];

const DEFAULT_LEAVES: LeafSpec[] = [
  [6, 18, 18, 13, 0],
  [88, 14, 22, 16, -4],
  [74, 58, 14, 12, -7],
  [38, 10, 12, 15, -2],
  [18, 70, 16, 17, -9],
  [55, 82, 12, 14, -5],
];

interface LeafFieldProps {
  leaves?: LeafSpec[];
  className?: string;
}

/** Leaves drifting gently across a section — decorative ambient motion. */
export function LeafField({ leaves = DEFAULT_LEAVES, className }: LeafFieldProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 hidden sm:block", className)}>
      {leaves.map(([left, top, size, duration, delay]) => (
        <svg
          key={`${left}-${top}`}
          viewBox="0 0 24 24"
          className="animate-drift absolute fill-leaf-400/45"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            ...cssVars({ "--duration": `${duration}s`, "--delay": `${delay}s` }),
          }}
        >
          <path d="M5 21c.5-6.5 4-12.5 16-18-1 8.5-5.5 15-13 15.5-1.2.1-2.2.8-3 2.5Z" />
        </svg>
      ))}
    </div>
  );
}
