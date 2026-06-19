"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scene III — Works (pinned horizontal scroll).  [teardown 3.6]
 * The section is pinned; vertical scroll progress is translated into a
 * horizontal translateX of the track, so cards glide left as you scroll down.
 *
 * Key details that make it robust:
 *  - end is computed from the track's real overflow width, recomputed on
 *    resize via invalidateOnRefresh (otherwise start/end go stale).
 *  - on mobile / reduced-motion we DON'T pin — we fall back to a native
 *    swipeable row (handled by .works-track in globals.css). Pinned
 *    horizontal scroll feels broken on touch.
 */
const WORKS = [
  { img: "/works/coronation.jpg", title: "Coronation of Code", tag: "allegory · oil" },
  { img: "/works/pair-programmers.jpg", title: "The Pair Programmers", tag: "scene · loggia" },
  { img: "/works/birth-of-machine.jpg", title: "Birth of the Machine", tag: "allegory · gold" },
  { img: "/works/thinker.jpg", title: "The Thinker's Feed", tag: "portrait · tenebrism" },
  { img: "/works/skater-saint.jpg", title: "The Skater Saint", tag: "portrait · street" },
];

export default function Works() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(max-width: 820px)").matches;
    if (reduce || isTouch || !root.current || !track.current) return;

    const ctx = gsap.context(() => {
      const el = track.current!;
      gsap.to(el, {
        x: () => -(el.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: () => "+=" + (el.scrollWidth - window.innerWidth),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="works" ref={root} className="works">
      <div ref={track} className="works-track">
        <div className="works-intro">
          <span className="eyebrow">Scene III</span>
          <h2>Selected Works</h2>
          <p>Scroll to move through the gallery →</p>
        </div>

        {WORKS.map((w) => (
          <figure className="card" key={w.img}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.img} alt={w.title} loading="lazy" />
            <figcaption>
              <span className="card-title">{w.title}</span>
              <span className="card-tag">{w.tag}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
