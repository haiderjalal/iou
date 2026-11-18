"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

import { isActivePath, type NavEntry } from "./navigation";

interface MobileNavProps {
  items: NavEntry[];
  email: string;
}

const PANEL_ID = "mobile-navigation";

/** Mobile menu built on the native Popover API (light dismiss, Esc and focus return for free). */
export function MobileNav({ items, email }: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // Client-side navigation keeps the layout mounted, so close the menu when the route changes.
  useEffect(() => {
    const panel = panelRef.current;
    if (panel?.matches(":popover-open")) panel.hidePopover();
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        popoverTarget={PANEL_ID}
        className="grid size-11 place-items-center rounded-full text-forest-900 ring-1 ring-forest-900/10 transition-colors hover:bg-leaf-50"
      >
        <Menu className="size-5" aria-hidden />
        <span className="sr-only">Open menu</span>
      </button>

      <div ref={panelRef} id={PANEL_ID} popover="auto" role="dialog" aria-label="Site menu" className="mobile-panel">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-semibold text-white">Menu</p>
          <button
            type="button"
            popoverTarget={PANEL_ID}
            popoverTargetAction="hide"
            className="grid size-11 place-items-center rounded-full text-white ring-1 ring-white/20 transition-colors hover:bg-white/10"
          >
            <X className="size-5" aria-hidden />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-8">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "block rounded-2xl px-4 py-3 font-display text-2xl font-semibold transition-colors",
                      active ? "bg-white/10 text-leaf-300" : "text-white hover:bg-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <ul className="mt-1 mb-3 ml-4 space-y-1 border-l border-white/15 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-[0.95rem] font-semibold transition-colors",
                              pathname === child.href ? "text-leaf-300" : "text-white/75 hover:text-white",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={`mailto:${email}`}
          className="mt-10 block rounded-2xl bg-leaf-500 px-5 py-4 text-center font-semibold text-forest-950"
        >
          {email}
        </a>
      </div>
    </div>
  );
}
