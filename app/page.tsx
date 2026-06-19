import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Works from "@/components/Works";
import ParallaxBand from "@/components/ParallaxBand";
import About from "@/components/About";
import Object360 from "@/components/Object360";
import Traveler from "@/components/Traveler";

export default function Home() {
  return (
    <>
      <Nav />
      <Traveler />
      <main>
        <Hero />
        <Marquee />
        <Works />
        <ParallaxBand />

        <section id="artifact" className="artifact">
          <div className="artifact-copy">
            <span className="eyebrow">Scene V · Artifact</span>
            <h2>Spin the marble</h2>
            <p>Drag to rotate · scroll to zoom. A generated bust, turned into a real 3D model.</p>
          </div>
          <Object360
            src="/models/bust.glb"
            poster="/models/bust-poster.jpg"
            alt="Renaissance marble bust"
          />
        </section>

        <About />

        <section id="contact" className="contact">
          <span className="eyebrow">Scene VII</span>
          <h2>Let&apos;s build something that moves.</h2>
          <a className="contact-cta" href="mailto:dev@alpholagroup.com">
            dev@alpholagroup.com
          </a>
          <footer className="foot">
            <span>Scroll Atelier</span>
            <span>Lenis · GSAP · Next.js</span>
          </footer>
        </section>
      </main>
    </>
  );
}
