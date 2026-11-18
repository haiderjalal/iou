import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** Heading level — keeps the document outline correct when reused. */
  as?: "h1" | "h2";
  /** Id for the heading, so sections can reference it with aria-labelledby. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div className={cn("reveal max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em]",
          isLight ? "text-leaf-300" : "text-leaf-700",
        )}
      >
        <span aria-hidden className={cn("h-px w-8", isLight ? "bg-leaf-300" : "bg-leaf-600")} />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={cn(
          "text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl",
          isLight ? "text-white" : "text-forest-900",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn("mt-5 text-lg leading-relaxed", isLight ? "text-white/75" : "text-muted")}>{description}</p>
      ) : null}
    </div>
  );
}
