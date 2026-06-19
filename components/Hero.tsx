"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scene I — Hero (layered "assemble on scroll").  [teardown 3.2]
 *
 * The hero is built from separate transparent cut-outs (background plate,
 * figure, floating objects, foliage) — the same trick the Shopify Editions
 * hero uses. Two motions run on them:
 *
 *  1. INTRO (on load): each layer flies in from off-screen to its resting
 *     spot, so the scene visibly *assembles*.
 *  2. PARALLAX (on scroll): each layer drifts at its own speed as the hero
 *     scrolls away → depth.
 *
 * Conflict-free by construction: INTRO animates pixel translate (x/y) + alpha;
 * PARALLAX animates yPercent. GSAP composes px and % translate into one matrix,
 * so the two never overwrite each other.
 *
 * All of it is skipped under prefers-reduced-motion (layers just sit assembled).
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      const vw = () => window.innerWidth;
      const vh = () => window.innerHeight;

      // mirror the right framing column (GSAP owns transform, so set it here)
      gsap.set(".h-col-r", { scaleX: -1 });

      // 1) INTRO — assemble
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
      tl.from(".h-bg", { scale: 1.18, autoAlpha: 0, duration: 1.3 })
        .from(".h-foliage", { y: () => vh() * 0.25, autoAlpha: 0, duration: 1 }, 0.1)
        .from(".h-col-l", { x: () => -vw() * 0.35, autoAlpha: 0, duration: 1.1 }, 0.15)
        .from(".h-col-r", { x: () => vw() * 0.35, autoAlpha: 0, duration: 1.1 }, 0.15)
        .from(".h-figure", { x: () => vw() * 0.5, autoAlpha: 0, duration: 1.2 }, 0.2)
        .from(
          ".h-obj",
          { y: () => vh() * 0.55, autoAlpha: 0, duration: 1, stagger: 0.12 },
          0.4
        )
        .from(
          ".h-prop",
          { y: () => -vh() * 0.35, autoAlpha: 0, duration: 0.9, stagger: 0.1 },
          0.45
        )
        .from(".h-foliage-front", { y: () => vh() * 0.4, autoAlpha: 0, duration: 1 }, 0.3)
        .from(".hero-line", { yPercent: 120, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.55);

      // 2) PARALLAX — drift on scroll
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0");
        gsap.to(el, {
          yPercent: speed * -100,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
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
    <section id="hero" ref={root} className="hero">
      <div className="hero-stage">
        {/* eslint-disable @next/next/no-img-element */}
        <img className="h-layer h-bg" data-speed="0.12" src="/hero-bg.jpg" alt="" aria-hidden />
        <img className="h-layer h-foliage" data-speed="-0.08" src="/cutouts/foliage/foliage.png" alt="" aria-hidden />
        <img className="h-layer h-col h-col-l" data-speed="0.3" src="/cutouts/arch/arch-5.png" alt="" aria-hidden />
        <img className="h-layer h-col h-col-r" data-speed="0.3" src="/cutouts/arch/arch-5.png" alt="" aria-hidden />
        <img className="h-layer h-figure" data-speed="0.2" src="/cutouts/figure/right-figure.png" alt="" aria-hidden />
        <img className="h-layer h-prop h-scroll" data-speed="0.46" src="/cutouts/small/small-2.png" alt="" aria-hidden />
        <img className="h-layer h-obj h-skate" data-speed="0.42" src="/cutouts/objects/object-1.png" alt="" aria-hidden />
        <img className="h-layer h-obj h-bag" data-speed="0.52" src="/cutouts/objects/object-2.png" alt="" aria-hidden />
        <img className="h-layer h-foliage-front" data-speed="0.85" src="/cutouts/foliage/foliage.png" alt="" aria-hidden />
        {/* eslint-enable @next/next/no-img-element */}
      </div>

      <div className="hero-frame">
        <h1 className="hero-title">
          <span className="hero-line">The Ren</span>
          <span className="hero-line accent">ai</span>
          <span className="hero-line">ssance</span>
          <span className="hero-line">of Scroll</span>
        </h1>
        <p className="hero-sub">A generative motion atelier — built with Lenis &amp; GSAP.</p>
      </div>

      <div className="hero-hint" aria-hidden>scroll ↓</div>
    </section>
  );
}
