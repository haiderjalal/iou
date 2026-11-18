import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE } from "@/content/site";
import logoWordmark from "@public/images/iou/logo-wordmark.png";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { NAVIGATION } from "./navigation";

export function SiteHeader() {
  return (
    <header
      className="header-scroll sticky top-0 z-50 border-b border-forest-900/5 bg-white/80 backdrop-blur-xl"
      // Keeps the header still while page content transitions underneath it.
      style={{ viewTransitionName: "site-header" }}
    >
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="shrink-0 rounded-md">
          <Image
            src={logoWordmark}
            alt={`${SITE.name} — ${SITE.tagline} (home)`}
            className="h-8 w-auto sm:h-10 lg:h-11"
            sizes="(min-width: 1024px) 320px, 260px"
            loading="eager"
          />
        </Link>

        <DesktopNav items={NAVIGATION} />

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href="/contact">
              <Mail className="size-4" aria-hidden />
              Get involved
            </ButtonLink>
          </div>
          <MobileNav items={NAVIGATION} email={SITE.email} />
        </div>
      </Container>
      <div
        aria-hidden
        className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-linear-to-r from-leaf-600 via-leaf-400 to-leaf-300"
      />
    </header>
  );
}
