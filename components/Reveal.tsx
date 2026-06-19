"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Fade + rise an element in when it enters the viewport.
 * Uses IntersectionObserver (cheap, no scroll-event spam) and reveals once.
 * The visible/hidden states live in globals.css (.reveal / .reveal.in).
 *
 * `as` lets the caller pick the rendered tag (e.g. "p"); we build it with
 * createElement so the ref attaches cleanly without fighting React 19's JSX types.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return createElement(as, { ref, className: `reveal ${className}` }, children);
}
