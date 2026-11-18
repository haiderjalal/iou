"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

interface MarqueeProps {
  items: string[];
  label: string;
}

/** Continuously scrolling credibility strip with a pause control (WCAG 2.2.2). */
export function Marquee({ items, label }: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label={label}
      data-paused={paused}
      className="marquee relative overflow-hidden border-y border-leaf-800/40 bg-forest-900 py-5 text-white"
    >
      <div className="marquee-track flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={
              copy === 1
                ? "flex shrink-0 items-center motion-reduce:hidden"
                : "flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2"
            }
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 px-6 text-sm font-semibold tracking-wide whitespace-nowrap"
              >
                <svg viewBox="0 0 12 12" aria-hidden className="size-2.5 fill-leaf-400">
                  <path d="M6 0c.7 3.2 2.8 5.3 6 6-3.2.7-5.3 2.8-6 6-.7-3.2-2.8-5.3-6-6 3.2-.7 5.3-2.8 6-6Z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-forest-800/90 text-white ring-1 ring-white/20 transition-colors hover:bg-leaf-700 motion-reduce:hidden"
      >
        {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
        <span className="sr-only">{paused ? "Play scrolling highlights" : "Pause scrolling highlights"}</span>
      </button>
    </section>
  );
}
