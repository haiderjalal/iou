import { MAIN_NAV, type NavItem } from "@/content/site";
import { THEMATIC_AREAS } from "@/features/thematic-areas/data/thematicAreas";

export interface NavEntry extends NavItem {
  children?: NavItem[];
}

/** Primary navigation with the thematic areas nested under their index page. */
export const NAVIGATION: NavEntry[] = MAIN_NAV.map((item) =>
  item.href === "/thematic-areas"
    ? {
        ...item,
        children: THEMATIC_AREAS.map((area) => ({
          label: area.title,
          href: `/thematic-areas/${area.slug}`,
        })),
      }
    : item,
);

export function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
