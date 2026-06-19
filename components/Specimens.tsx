import Reveal from "./Reveal";

/** A catalogue grid of the cut-out props — fills the page and shows the library. */
const ITEMS = [
  { img: "/cutouts/small/small-1.png", n: "I", tag: "Blade · steel" },
  { img: "/cutouts/small/small-5.png", n: "II", tag: "Chalice · gilt" },
  { img: "/cutouts/small/small-2.png", n: "III", tag: "Scroll · vellum" },
  { img: "/cutouts/small/small-6.png", n: "IV", tag: "Hourglass · brass" },
  { img: "/cutouts/small/small-4.png", n: "V", tag: "Folios · leather" },
  { img: "/cutouts/small/small-3.png", n: "VI", tag: "Laurel · gold" },
  { img: "/cutouts/medium/medium-1.png", n: "VII", tag: "Table · oak" },
  { img: "/cutouts/medium/medium-3.png", n: "VIII", tag: "Effigy · marble" },
  { img: "/cutouts/aux/aux-1.png", n: "IX", tag: "Engine · anachronism" },
];

export default function Specimens() {
  return (
    <section id="specimens" className="specimens">
      <header className="spec-head">
        <span className="eyebrow">Scene V · Specimens</span>
        <h2>The catalogue</h2>
        <p>Cut from generated plates, set on the page.</p>
      </header>
      <div className="spec-grid">
        {ITEMS.map((it, i) => (
          <Reveal key={it.n} delay={(i % 3) * 60} className="spec-card">
            <div className="spec-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.img} alt={it.tag} loading="lazy" />
            </div>
            <div className="spec-meta">
              <span className="spec-no">No. {it.n}</span>
              <span className="spec-tag">{it.tag}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
