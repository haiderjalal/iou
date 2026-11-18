import { useId } from "react";

interface LogoMarkProps {
  className?: string;
  /** Use the light variant on dark backgrounds. */
  tone?: "brand" | "light";
  title?: string;
}

/** The IoU "IU" shield mark, redrawn from the official logo as a crisp, themeable SVG. */
export function LogoMark({ className, tone = "brand", title }: LogoMarkProps) {
  const clipId = useId();
  const green = "#7DAD42";
  const grey = tone === "light" ? "#C9CCD3" : "#94969F";

  return (
    <svg
      viewBox="0 0 250 272"
      className={className}
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
        <rect width="56" height="60" fill={green} />
        <rect x="70" width="180" height="60" fill={grey} />
        <rect y="74" width="56" height="220" fill={grey} />
        <rect x="70" y="74" width="180" height="220" fill={green} />
      </g>
    </svg>
  );
}
