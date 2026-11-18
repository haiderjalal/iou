import { ViewTransition, type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Fades and lifts page content in and out on client-side navigation using the
 * browser View Transitions API. Must wrap each page (not the layout), because
 * layouts persist across navigations. Browsers without support simply navigate.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
