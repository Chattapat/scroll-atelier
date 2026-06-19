// Single place to register GSAP plugins.
// WHY: registering ScrollTrigger more than once (or on the server) throws warnings;
// importing from here guarantees it happens exactly once, client-side.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export { gsap, ScrollTrigger, MotionPathPlugin };
