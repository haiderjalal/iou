import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost-light" | "outline";

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const BASE =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[background-color,color,box-shadow,translate] duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-leaf-700 text-white shadow-lg shadow-leaf-900/20 hover:bg-leaf-800 hover:shadow-xl hover:shadow-leaf-900/25",
  secondary: "bg-white text-forest-900 shadow-lg shadow-black/10 hover:bg-leaf-50",
  "ghost-light": "bg-white/10 text-white ring-1 ring-white/40 backdrop-blur-sm hover:bg-white/20",
  outline: "text-leaf-800 ring-1 ring-leaf-700/40 hover:bg-leaf-50 hover:ring-leaf-700",
};

/** Link styled as a button — every CTA on the site navigates, so no <button> variant is needed. */
export function ButtonLink({ children, variant = "primary", className, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(BASE, VARIANTS[variant], className)} {...props}>
      {children}
    </Link>
  );
}
