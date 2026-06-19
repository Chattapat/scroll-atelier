"use client";

/**
 * Scene II — Marquee.  [teardown 3.5]
 * Pure-CSS infinite horizontal scroll: the track holds the items TWICE and
 * slides by -50%, so the loop is seamless. The duplicate set is aria-hidden
 * so screen readers don't read the words twice.
 * Animation pauses on hover and is disabled under prefers-reduced-motion
 * (handled in globals.css).
 */
const WORDS = [
  "sfumato",
  "chiaroscuro",
  "parallax",
  "scroll-driven",
  "generative",
  "Old Master",
  "pinned",
  "scrub",
];

export default function Marquee() {
  return (
    <section id="marquee" className="marquee-section" aria-label="Themes">
      <div className="marquee">
        <ul className="marquee-track">
          {WORDS.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
        <ul className="marquee-track" aria-hidden="true">
          {WORDS.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
