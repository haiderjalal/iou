import { ArrowUpRight, FileText, Mail, MapPin } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";

import { AuroraBackdrop } from "@/components/shared/AuroraBackdrop";
import { Container } from "@/components/shared/Container";
import { LeafField } from "@/components/shared/LeafField";
import { LogoMark } from "@/components/shared/LogoMark";
import { MAIN_NAV, MISSION, SITE } from "@/content/site";
import { THEMATIC_AREAS } from "@/features/thematic-areas/data/thematicAreas";

/** Reading the clock during prerender is not allowed with Cache Components, so cache it daily. */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const FOOTER_LINK =
  "inline-flex items-center gap-1 text-white/70 transition-colors hover:text-leaf-300 focus-visible:text-leaf-300";

export function SiteFooter() {
  return (
    <footer className="bg-topo relative isolate overflow-hidden bg-forest-950 text-white">
      <AuroraBackdrop className="opacity-50" />
      <LeafField />
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3 rounded-md">
            <LogoMark tone="light" assemble className="h-12 w-auto" />
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold">{SITE.name}</span>
              <span className="block text-sm text-leaf-300">{SITE.tagline}</span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm leading-relaxed text-white/70">{MISSION}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="text-sm font-bold tracking-[0.18em] text-white uppercase">Explore</h2>
          <ul className="mt-5 space-y-3">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={FOOTER_LINK}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Thematic areas" className="lg:col-span-3">
          <h2 className="text-sm font-bold tracking-[0.18em] text-white uppercase">Our work</h2>
          <ul className="mt-5 space-y-3">
            {THEMATIC_AREAS.map((area) => (
              <li key={area.slug}>
                <Link href={`/thematic-areas/${area.slug}`} className={FOOTER_LINK}>
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-bold tracking-[0.18em] text-white uppercase">Get in touch</h2>
          <ul className="mt-5 space-y-4">
            <li className="flex items-start gap-3 text-white/70">
              <MapPin className="mt-0.5 size-5 shrink-0 text-leaf-400" aria-hidden />
              {SITE.location}
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-leaf-400" aria-hidden />
              <a href={`mailto:${SITE.email}`} className={FOOTER_LINK}>
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="mt-0.5 size-5 shrink-0 text-leaf-400" aria-hidden />
              <a href={SITE.transparencyDocument} className={FOOTER_LINK} target="_blank" rel="noopener">
                Transparency document
                <ArrowUpRight className="size-4" aria-hidden />
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {SITE.name}. All rights reserved.
          </p>
          <p>Nature inclusive urban settings.</p>
        </Container>
      </div>
    </footer>
  );
}
