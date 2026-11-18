import { Fragment } from "react";

import { cn } from "@/lib/cn";
import { cssVars, delayStyle } from "@/lib/motion";

export interface WordPart {
  text: string;
  /** Highlighted parts get the animated leaf-green gradient. */
  highlight?: boolean;
}

interface AnimatedWordsProps {
  parts: WordPart[] | string;
  /** Delay before the first word starts, in milliseconds. */
  startDelay?: number;
  highlightClassName?: string;
}

/**
 * Splits a heading into words that rise into place one after another.
 * Words stay real text (selectable, indexable, read normally by screen readers);
 * with reduced motion they simply render statically.
 */
export function AnimatedWords({ parts, startDelay = 0, highlightClassName }: AnimatedWordsProps) {
  const segments: WordPart[] = typeof parts === "string" ? [{ text: parts }] : parts;
  const words = segments.flatMap((segment) =>
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, highlight: segment.highlight ?? false })),
  );

  return (
    <span className="animate-words" style={delayStyle(startDelay)}>
      {words.map(({ word, highlight }, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className={cn("word", highlight && cn("text-shimmer", highlightClassName))}
            style={cssVars({ "--w": index })}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
