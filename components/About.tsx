"use client";

import Reveal from "./Reveal";
import TornCover from "./TornCover";

/**
 * Scene IV — About (sticky text + revealed lines).  [teardown 3.3 + 3.4]
 * Left column is position:sticky (stays put while the right column scrolls).
 * Right column paragraphs fade up via the Reveal component (IntersectionObserver).
 */
const LINES = [
  "This is a practice ground — one page to learn scroll-driven motion end to end.",
  "Every effect here is in the teardown doc: parallax, marquee, pinned horizontal scroll, scroll-spy, reveal.",
  "Smooth scrolling is Lenis. Timelines and pinning are GSAP ScrollTrigger.",
  "All artwork is generated, not borrowed — Renaissance pastiche made for this build.",
  "Motion is opt-out: everything respects prefers-reduced-motion.",
];

export default function About() {
  return (
    <section id="about" className="about">
      <TornCover />
      <div className="about-grid">
        <aside className="about-sticky">
          <span className="eyebrow">Scene VI</span>
          <h2>
            An atelier
            <br /> for motion
          </h2>
        </aside>

        <div className="about-body">
          {LINES.map((line, i) => (
            <Reveal as="p" key={i} delay={i * 60} className="about-line">
              {line}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
