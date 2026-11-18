import { useId } from "react";

import { cn } from "@/lib/cn";
import { cssVars } from "@/lib/motion";

interface LogoMarkProps {
  className?: string;
  /** Use the light variant on dark backgrounds. */
  tone?: "brand" | "light";
  title?: string;
  /** Slide the four pieces together as the mark scrolls into view. */
  assemble?: boolean;
}

/** Start offsets (SVG units) for each piece when the mark assembles. */
const PIECE_OFFSETS = [
  { "--from-x": "-140px", "--from-y": "-120px" },
  { "--from-x": "160px", "--from-y": "-120px" },
  { "--from-x": "-140px", "--from-y": "160px" },
  { "--from-x": "160px", "--from-y": "160px" },
] as const;

/** The IoU "IU" shield mark, redrawn from the official logo as a crisp, themeable SVG. */
export function LogoMark({ className, tone = "brand", title, assemble = false }: LogoMarkProps) {
  const clipId = useId();
  const green = "#7DAD42";
  const grey = tone === "light" ? "#C9CCD3" : "#94969F";

  return (
    <svg
      viewBox="0 0 250 272"
      className={cn(assemble && "logo-assemble", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M0 0H250V150C250 222 186 272 112 272 48 272 0 228 0 182Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {[
          { x: 0, y: 0, width: 56, height: 60, fill: green },
          { x: 70, y: 0, width: 180, height: 60, fill: grey },
          { x: 0, y: 74, width: 56, height: 220, fill: grey },
          { x: 70, y: 74, width: 180, height: 220, fill: green },
        ].map((piece, index) => (
          <rect
            key={`${piece.x}-${piece.y}`}
            {...piece}
            className={assemble ? "piece" : undefined}
            style={assemble ? cssVars(PIECE_OFFSETS[index] ?? {}) : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
