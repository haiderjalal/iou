import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/shared/Container";
import { LogoMark } from "@/components/shared/LogoMark";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-24 lg:py-36">
      <Container className="max-w-2xl text-center">
        <LogoMark className="mx-auto h-16 w-auto" />
        <p className="mt-8 text-xs font-bold tracking-[0.22em] text-leaf-700 uppercase">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold text-forest-900 sm:text-5xl">This path isn&apos;t on the map.</h1>
        <p className="mt-5 text-lg text-muted">
          The page you&apos;re looking for may have moved or no longer exists. Let&apos;s get you back on a green route.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">
            <ArrowLeft className="size-4" aria-hidden />
            Back to home
          </ButtonLink>
          <ButtonLink href="/thematic-areas" variant="outline">
            Explore our work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
