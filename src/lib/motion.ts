import type { CSSProperties } from "react";

type CustomProperties = Record<`--${string}`, string | number>;

/** Typed helper for passing CSS custom properties through the `style` prop. */
export function cssVars(customProperties: CustomProperties): CSSProperties {
  return customProperties as CSSProperties;
}

/**
 * Sets the `--delay` custom property used by the staggered CSS entrance animations,
 * optionally merged with other CSS custom properties (e.g. `--length` for line drawing).
 */
export function delayStyle(milliseconds: number, customProperties: CustomProperties = {}): CSSProperties {
  return cssVars({ "--delay": `${milliseconds}ms`, ...customProperties });
}
