import Reveal from "./Reveal";

const STATS = [
  { n: "XI", l: "scenes, one scroll" },
  { n: "24", l: "assets cut by hand" },
  { n: "01", l: "continuous journey" },
  { n: "00", l: "hard cuts" },
];

/** A big-number ethos strip — rhythm + breathing room between heavy scenes. */
export default function Ethos() {
  return (
    <section id="ethos" className="ethos">
      <div className="ethos-grid">
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 70} className="ethos-cell">
            <span className="ethos-num">{s.n}</span>
            <span className="ethos-label">{s.l}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
