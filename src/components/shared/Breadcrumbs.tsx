import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { breadcrumbJsonLd } from "@/lib/seo";

import { JsonLd } from "./JsonLd";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-white/70">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="text-leaf-300">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="rounded transition-colors hover:text-white">
                      {item.name}
                    </Link>
                    <ChevronRight className="size-4 text-white/40" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}
