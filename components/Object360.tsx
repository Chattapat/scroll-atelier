"use client";

import { Suspense, Component, useEffect, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows, Center, Bounds } from "@react-three/drei";

/**
 * <Object360> — display a .glb model the user can spin, drag and zoom.
 *
 * Design choices:
 *  - Lighting is plain ambient + directional (no Environment HDR) so it works
 *    fully offline with no CDN asset fetch.
 *  - <Bounds>/<Center> auto-frame the model whatever its scale/origin, so we
 *    don't have to hand-tune camera distance per asset.
 *  - prefers-reduced-motion → we render the poster image instead of a canvas
 *    (no autospin, no WebGL). Accessibility floor.
 *  - If the .glb fails to load (e.g. not exported yet) the ErrorBoundary falls
 *    back to the poster, so the page never crashes while you're still working.
 */

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

class GLBErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function Object360({
  src,
  poster,
  alt = "3D artifact",
}: {
  src: string;
  poster: string;
  alt?: string;
}) {
  // Only mount the WebGL canvas on the client, after hydration.
  // WHY: <Canvas> touches WebGL/window — rendering it during SSR breaks the
  // build and causes hydration mismatches. Until mounted we show the poster.
  const [mounted, setMounted] = useState(false);
  const [reduce, setReduce] = useState(true);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
  }, []);

  const posterEl = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={poster} alt={alt} className="obj360-poster" />
  );

  if (!mounted || reduce) {
    return <div className="obj360">{posterEl}</div>;
  }

  return (
    <div className="obj360">
      <GLBErrorBoundary fallback={posterEl}>
        <Canvas camera={{ position: [0, 0, 4], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[-3, 5, 4]} intensity={1.6} />
          <directionalLight position={[4, 2, -3]} intensity={0.5} />
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.1}>
              <Model src={src} />
            </Bounds>
            <ContactShadows position={[0, -1.4, 0]} opacity={0.45} scale={8} blur={2.6} far={4} />
          </Suspense>
          <OrbitControls
            autoRotate
            autoRotateSpeed={1.2}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
            enableZoom
          />
        </Canvas>
      </GLBErrorBoundary>
    </div>
  );
}
