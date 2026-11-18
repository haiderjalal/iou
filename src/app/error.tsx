"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/shared/Container";
import { SITE } from "@/content/site";

interface ErrorPageProps {
  error: unknown;
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    // Only the digest is logged; the message may contain internal details.
    const digest = error instanceof Error && "digest" in error ? String(error.digest) : undefined;
    console.error(JSON.stringify({ level: "error", message: "Unhandled UI error", digest }));
  }, [error]);

  return (
    <section className="py-24 lg:py-36">
      <Container className="max-w-2xl text-center">
        <p className="text-xs font-bold tracking-[0.22em] text-leaf-700 uppercase">Something went wrong</p>
        <h1 className="mt-4 text-4xl font-semibold text-forest-900 sm:text-5xl">We hit an unexpected bump.</h1>
        <p className="mt-5 text-lg text-muted">
          Please try again. If the problem continues, email us at{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-leaf-700 underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center gap-2 rounded-full bg-leaf-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-leaf-800"
          >
            <RotateCcw className="size-4" aria-hidden />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-leaf-800 ring-1 ring-leaf-700/40 transition-colors hover:bg-leaf-50"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </section>
  );
}
