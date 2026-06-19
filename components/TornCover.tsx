"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-driven torn reveal. [teardown 3.3 scrubbed]
 *
 * A dark sheet (with a ragged bottom edge) covers the cream panel. As you
 * scroll INTO the section the sheet lifts away (scrubbed), so the paper
 * gradually tears open; scrolling back up re-seals it. scrub makes it fully
 * reversible and tied 1:1 to scroll position.
 *
 * Disabled under prefers-reduced-motion (sheet hidden → panel just shows).
 */
export default function TornCover() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.display = "none";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0 },
        {
          yPercent: -118,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return <div ref={ref} className="about-cover" aria-hidden />;
}
