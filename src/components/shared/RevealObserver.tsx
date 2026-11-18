"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SUPPORTS_VIEW_TIMELINE = "(animation-timeline: view()) and (animation-range: entry)";

/**
 * Fallback for browsers without CSS scroll-driven animations: reveals `.reveal` elements
 * with an IntersectionObserver. Browsers with native support never run this logic, and
 * content stays visible when JavaScript is unavailable or motion is reduced.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (CSS.supports(SUPPORTS_VIEW_TIMELINE)) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    document.documentElement.classList.add("reveal-fallback");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
