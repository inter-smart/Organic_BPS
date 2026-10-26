"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { INTRO_EVENT } from "@/components/common/intro";

gsap.registerPlugin(ScrollTrigger);

/** Lenis inertia scroll driven by the GSAP ticker so ScrollTrigger scrubs stay in sync. Locked until the intro finishes. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    if (document.documentElement.dataset.intro !== "done") lenis.stop();
    // layout was measured while the loader hid the scrollbar, so re-measure pins/triggers once it is back
    const start = () => {
      lenis.start();
      ScrollTrigger.refresh();
    };
    const tick = (t) => lenis.raf(t * 1000);

    window.addEventListener(INTRO_EVENT, start);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener(INTRO_EVENT, start);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
