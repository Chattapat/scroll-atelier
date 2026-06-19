"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scene "Assembly" — a scroll-scrubbed unboxing. [teardown 3.3 pinned + timeline]
 *
 * The section pins; as you scroll, scattered objects fly toward the centre and
 * collide (each eased with a slight overshoot). At impact a ring bursts outward
 * and a central artifact pops in with a back-ease bounce, then a title rises.
 * scrub:1 ties it to scroll and makes it fully reversible (scroll up = re-pack).
 *
 * Disabled under prefers-reduced-motion (everything rests assembled, no pin).
 */
const PIECES = [
  "/cutouts/small/small-1.png",
  "/cutouts/small/small-2.png",
  "/cutouts/small/small-4.png",
  "/cutouts/small/small-6.png",
  "/cutouts/aux/aux-1.png",
  "/cutouts/objects/object-1.png",
];

export default function Unboxing() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const pieces = gsap.utils.toArray<HTMLElement>(".ub-piece");
      pieces.forEach((el, i) => {
        const ang = (i / pieces.length) * Math.PI * 2;
        tl.from(
          el,
          {
            x: Math.cos(ang) * vw * 0.55,
            y: Math.sin(ang) * vh * 0.6,
            rotation: i % 2 ? 240 : -240,
            scale: 0.5,
            autoAlpha: 0,
            ease: "power2.inOut",
          },
          0
        );
      });

      // collide → pieces collapse into the impact
      tl.to(".ub-piece", { scale: 0.45, autoAlpha: 0, ease: "power1.in", duration: 0.18, stagger: 0.02 }, 0.5);
      // burst ring
      tl.fromTo(".ub-ring", { scale: 0, autoAlpha: 0.9 }, { scale: 3.4, autoAlpha: 0, ease: "power2.out", duration: 0.35 }, 0.5);
      // artifact pops in with a bounce
      tl.from(".ub-core", { scale: 0, autoAlpha: 0, rotation: -45, ease: "back.out(1.8)", duration: 0.4 }, 0.55);
      // title rises
      tl.from(".ub-title", { yPercent: 120, autoAlpha: 0, ease: "power3.out", duration: 0.3 }, 0.72);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="unboxing" ref={root} className="unbox">
      <div className="ub-stage">
        <span className="eyebrow ub-eyebrow">Scene VI · Assembly</span>
        <div className="ub-ring" aria-hidden />
        {/* eslint-disable @next/next/no-img-element */}
        {PIECES.map((p, i) => (
          <img key={i} className="ub-piece" src={p} alt="" aria-hidden />
        ))}
        <img className="ub-core" src="/cutouts/small/small-5.png" alt="" aria-hidden />
        {/* eslint-enable @next/next/no-img-element */}
        <h2 className="ub-title">Assembled</h2>
      </div>
    </section>
  );
}
