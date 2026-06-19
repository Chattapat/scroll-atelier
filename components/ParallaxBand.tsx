"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * A grand multi-layer parallax band. [teardown 3.2, sustained]
 *
 * The section is tall (180vh) and holds a sticky 100vh stage. As you scroll
 * through the section, each layer translates by its own `data-depth` (in
 * yPercent) — far layers barely move, near layers fly past — producing a deep,
 * cinematic "procession" while the stage stays pinned in view.
 */
export default function ParallaxBand() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".pb-mirror", { scaleX: -1 });
      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0");
        gsap.to(el, {
          yPercent: depth,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="procession" ref={root} className="band">
      <div className="band-stage">
        {/* eslint-disable @next/next/no-img-element */}
        <img className="pb pb-bg" data-depth="-8" src="/hero-bg.jpg" alt="" aria-hidden />
        <img className="pb pb-palazzo" data-depth="-20" src="/cutouts/arch/arch-1.png" alt="" aria-hidden />
        <img className="pb pb-colonnade" data-depth="-32" src="/cutouts/arch/arch-4.png" alt="" aria-hidden />
        <img className="pb pb-statue" data-depth="-46" src="/cutouts/medium/medium-3.png" alt="" aria-hidden />
        <img className="pb pb-col-l" data-depth="-64" src="/cutouts/arch/arch-5.png" alt="" aria-hidden />
        <img className="pb pb-col-r pb-mirror" data-depth="-64" src="/cutouts/arch/arch-5.png" alt="" aria-hidden />
        <img className="pb pb-chalice" data-depth="-90" src="/cutouts/small/small-5.png" alt="" aria-hidden />
        <img className="pb pb-hourglass" data-depth="-78" src="/cutouts/small/small-6.png" alt="" aria-hidden />
        {/* eslint-enable @next/next/no-img-element */}

        <div className="band-copy">
          <span className="eyebrow">Scene VII · Procession</span>
          <h2>Layers in depth</h2>
          <p>Far drifts slow, near races past — scroll through.</p>
        </div>
      </div>
    </section>
  );
}
