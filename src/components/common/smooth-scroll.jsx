"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Lenis inertia scroll driven by the GSAP ticker so ScrollTrigger scrubs stay in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    // touch scrolling is never smoothed by Lenis, so phones skip its frame loop
    const query = "(prefers-reduced-motion: reduce), (pointer: coarse)";
    if (window.matchMedia(query).matches) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    const tick = (t) => lenis.raf(t * 1000);

    // Hero snap: one downward scroll/key press inside the hero glides to the next section's top (where its pin
    // starts); one upward scroll from there returns to the very top. Only real user input triggers it, so anchor
    // links and everything further down the page scroll normally.
    let snapping = false;
    const snap = (dir) => {
      const hero = document.getElementById("home");
      const next = document.getElementById("what-we-do");
      if (snapping || !hero || !next || lenis.isStopped || document.querySelector('[role="dialog"]')) return;
      const y = lenis.scroll;
      const edge = hero.offsetHeight;
      const target = dir > 0 && y < edge - 2 ? next : dir < 0 && y > 2 && y <= edge + 1 ? 0 : null;
      if (target === null) return;
      snapping = true;
      lenis.scrollTo(target, { duration: 1.2, easing: (p) => 1 - Math.pow(1 - p, 4), lock: true, onComplete: () => (snapping = false) });
    };
    const onWheel = (e) => e.deltaY && snap(Math.sign(e.deltaY));
    const onKey = (e) => {
      if (e.target.closest?.("input,textarea,select,[contenteditable]")) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) snap(e.shiftKey && e.key === " " ? -1 : 1);
      else if (["ArrowUp", "PageUp"].includes(e.key)) snap(-1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
