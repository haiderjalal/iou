"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

import { isActivePath, type NavEntry } from "./navigation";

interface DesktopNavProps {
  items: NavEntry[];
}

const LINK_CLASS =
  "relative rounded-full px-4 py-2 text-[0.94rem] font-semibold transition-colors after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-leaf-500 after:transition-transform after:duration-300 hover:text-leaf-700 hover:after:scale-x-100";

export function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);
          const linkClass = cn(LINK_CLASS, active ? "text-leaf-700 after:scale-x-100" : "text-forest-900");

          if (!item.children) {
            return (
              <li key={item.href}>
                <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className={cn(linkClass, "inline-flex items-center gap-1")}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
                <ChevronDown
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180"
                />
              </Link>
              {/* Opens on hover and on keyboard focus (focus-within) — no JavaScript required. */}
              <div className="invisible absolute top-full left-1/2 w-80 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-[opacity,translate,visibility] duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <ul className="overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-1 shadow-forest-900/15 ring-black/5">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        aria-current={pathname === child.href ? "page" : undefined}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-leaf-50 hover:text-leaf-800",
                          pathname === child.href ? "bg-leaf-50 text-leaf-800" : "text-forest-900",
                        )}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
