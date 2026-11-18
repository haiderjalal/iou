import type { CSSProperties } from "react";

/**
 * Sets the `--delay` custom property used by the staggered CSS entrance animations,
 * optionally merged with other CSS custom properties (e.g. `--length` for line drawing).
 */
export function delayStyle(
  milliseconds: number,
  customProperties: Record<`--${string}`, string | number> = {},
): CSSProperties {
  return { "--delay": `${milliseconds}ms`, ...customProperties } as CSSProperties;
}
