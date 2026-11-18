import { cn } from "@/lib/cn";
import { cssVars } from "@/lib/motion";

interface AuroraBackdropProps {
  className?: string;
}

/**
 * Slowly drifting pools of brand-green light for dark sections. Built from radial
 * gradients (no blur filters) and animated with transforms only, so it stays cheap.
 */
export function AuroraBackdrop({ className }: AuroraBackdropProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <span
        className="anim-aurora absolute -top-1/3 -left-1/4 size-[70vmax] rounded-full bg-[radial-gradient(circle,rgb(125_173_66/0.32),transparent_62%)]"
        style={cssVars({ "--duration": "26s" })}
      />
      <span
        className="anim-aurora absolute -top-1/4 -right-1/3 size-[60vmax] rounded-full bg-[radial-gradient(circle,rgb(174_209_119/0.2),transparent_60%)]"
        style={cssVars({ "--duration": "32s", "--delay": "-9s" })}
      />
      <span
        className="anim-aurora absolute -bottom-1/2 left-1/4 size-[65vmax] rounded-full bg-[radial-gradient(circle,rgb(75_108_38/0.35),transparent_60%)]"
        style={cssVars({ "--duration": "22s", "--delay": "-15s" })}
      />
    </div>
  );
}
