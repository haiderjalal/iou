"use client";

import { Pause, Play } from "lucide-react";
import { useSyncExternalStore } from "react";

import { MOTION_STORAGE_KEY } from "@/lib/motionPreference";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => observer.disconnect();
}

const getSnapshot = (): boolean => document.documentElement.dataset.motion === "paused";
const getServerSnapshot = (): boolean => false;

/**
 * Site-wide control to pause ambient animations (WCAG 2.2.2 Pause, Stop, Hide).
 * Hidden for visitors who already prefer reduced motion, since nothing loops for them.
 */
export function MotionToggle() {
  const paused = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const root = document.documentElement;
    if (paused) delete root.dataset.motion;
    else root.dataset.motion = "paused";

    try {
      localStorage.setItem(MOTION_STORAGE_KEY, paused ? "running" : "paused");
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-forest-900/85 px-3 py-2.5 text-xs font-semibold text-white shadow-lg ring-1 shadow-forest-950/30 ring-white/15 backdrop-blur-md transition-colors hover:bg-leaf-700 motion-reduce:hidden sm:px-4"
    >
      {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
      <span className="sr-only sm:not-sr-only">{paused ? "Play animations" : "Pause animations"}</span>
    </button>
  );
}
