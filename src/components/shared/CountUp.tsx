"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
}

const DURATION_MS = 1800;

function formatValue(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Animates a number from 0 when it scrolls into view. The final value is server-rendered
 * (good for SEO and no-JS users) and exposed to assistive tech via a visually hidden copy.
 */
export function CountUp({ value, decimals = 0, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    // Only animate numbers that start below the fold, so visible numbers never flash to 0.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    setDisplay(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(2, -10 * progress);
          setDisplay(progress === 1 ? value : value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {formatValue(display, decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {formatValue(value, decimals)}
        {suffix}
      </span>
    </>
  );
}
