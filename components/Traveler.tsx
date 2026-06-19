"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, MotionPathPlugin } from "@/lib/gsap";

/**
 * Continuous "travelers" — objects that thread the ENTIRE scroll as one journey.
 * [teardown: shared-element continuity]
 *
 * Each traveler lives in a FIXED, full-viewport layer at the page root, so it is
 * never clipped by a section. ONE scrubbed ScrollTrigger spans the whole page
 * (#hero → #contact); each object follows its own MotionPath curve (computed
 * from viewport size), winding left/right/centre as it descends, rotating and
 * shrinking, then fading right at the end. Lenis + scrub:1.2 = buttery.
 *
 * Disabled under prefers-reduced-motion (objects rest at their start spots).
 */
export default function Traveler() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !layer.current) return;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const make = (
        sel: string,
        pts: Array<[number, number]>,
        rotation: number
      ) => {
        const path = pts.map(([fx, fy]) => ({ x: fx * vw, y: fy * vh }));
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            endTrigger: "#contact",
            end: "bottom bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
        tl.to(sel, {
          motionPath: { path, curviness: 1.5 },
          rotation,
          scale: 0.7,
          ease: "none",
          duration: 1,
        }).to(sel, { autoAlpha: 0, duration: 0.08 }, 0.94);
      };

      // coffee cup — weaves right, then back through centre
      make(
        ".t-cup",
        [
          [0, 0],
          [0.45, 0.10],
          [0.52, 0.34],
          [0.06, 0.50],
          [-0.08, 0.64],
          [0.38, 0.74],
          [0.12, 0.58],
        ],
        540
      );

      // laurel — mirror phase, drifts left then crosses
      make(
        ".t-laurel",
        [
          [0, 0],
          [-0.40, 0.16],
          [-0.50, 0.40],
          [0, 0.55],
          [0.12, 0.66],
          [-0.30, 0.78],
          [-0.05, 0.60],
        ],
        -420
      );

      ScrollTrigger.refresh();
    }, layer);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={layer} className="traveler-layer" aria-hidden>
      {/* eslint-disable @next/next/no-img-element */}
      <img className="t-obj t-cup" src="/cutouts/objects/object-3.png" alt="" />
      <img className="t-obj t-laurel" src="/cutouts/small/small-3.png" alt="" />
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
}
