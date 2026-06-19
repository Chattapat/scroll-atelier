import Reveal from "./Reveal";

/** Full-bleed statement over generative art. Lines rise in on scroll. */
const LINES = [
  "Motion is a material.",
  "We cut it, layer it, set it in time.",
  "Scroll is the hand that turns the page.",
  "Everything here is made — not borrowed.",
];

export default function Manifesto() {
  return (
    <section id="manifesto" className="manifesto">
      <div className="manifesto-veil" aria-hidden />
      <div className="manifesto-inner">
        <span className="eyebrow">Scene III · Manifesto</span>
        {LINES.map((l, i) => (
          <Reveal as="p" key={i} delay={i * 80} className="manifesto-line">
            {l}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
