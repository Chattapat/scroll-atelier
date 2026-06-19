"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Drives Lenis smooth scroll and keeps GSAP ScrollTrigger in sync.
 *
 * WHY this shape:
 * - Lenis hijacks the scroll position, so ScrollTrigger must be told to
 *   update on every Lenis tick (`lenis.on('scroll', ScrollTrigger.update)`),
 *   otherwise pinned/scrubbed animations drift out of sync.
 * - We drive Lenis from gsap.ticker (one RAF loop for the whole app) instead
 *   of a second requestAnimationFrame loop — fewer loops, perfectly in step.
 * - prefers-reduced-motion: we skip Lenis entirely and fall back to native
 *   scroll. Accessibility floor — never ship motion that can't be turned off.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
