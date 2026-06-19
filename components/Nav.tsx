"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", name: "Overture", num: "I" },
  { id: "marquee", name: "Lexicon", num: "II" },
  { id: "works", name: "Works", num: "III" },
  { id: "procession", name: "Procession", num: "IV" },
  { id: "artifact", name: "Artifact", num: "V" },
  { id: "about", name: "Atelier", num: "VI" },
  { id: "contact", name: "Contact", num: "VII" },
];

/**
 * Persistent left nav (Shopify-Editions style): always-visible list with a
 * dotted leader to a Roman numeral; the active section is bold + full opacity.
 * `mix-blend-mode: difference` makes the white text legible over BOTH the dark
 * panels and the light torn panel without us switching colours per section.
 */
export default function Nav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="nav" aria-label="Sections">
      <ul>
        {SECTIONS.map(({ id, name, num }) => (
          <li key={id}>
            <a href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "true" : undefined}>
              <span className="nav-name">{name}</span>
              <span className="nav-leader" aria-hidden />
              <span className="nav-num">{num}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
