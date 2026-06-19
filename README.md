# Scroll Atelier

A one-page playground for learning **scroll-driven motion** end to end —
Renaissance-themed, with **generated** artwork (no borrowed assets).

Stack: **Next.js (App Router) + TypeScript · Lenis · GSAP ScrollTrigger**

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## The five scenes (each = one technique)

| Scene | File | Technique |
|------|------|-----------|
| I · Hero | `components/Hero.tsx` | Parallax layers + headline reveal |
| II · Marquee | `components/Marquee.tsx` | CSS infinite horizontal loop |
| III · Works | `components/Works.tsx` | **Pinned horizontal scroll** (GSAP) |
| IV · About | `components/About.tsx` | Sticky column + IntersectionObserver reveal |
| V · Contact | `app/page.tsx` | Static close |
| (global) | `components/Nav.tsx` | Scroll-spy navigation |
| (global) | `components/SmoothScrollProvider.tsx` | Lenis smooth scroll ↔ ScrollTrigger sync |

Full technique breakdown lives in the teardown doc:
`~/Documents/Claude/shopify-editions-winter26-scroll-teardown.md`

## Principles baked in

- **Transform/opacity only** for animation (GPU-friendly, no layout thrash).
- **`prefers-reduced-motion`** disables Lenis, parallax, scrub and reveals.
- **Pinned horizontal scroll is disabled on touch** → native swipe + scroll-snap fallback.
- Images are optimized JPEGs in `public/` (~200 KB each).

## Artwork

`public/hero.jpg` and `public/works/*` are AI-generated Renaissance pastiche
(Old Master style with anachronistic modern elements), made for this project.
