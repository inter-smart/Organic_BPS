"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-scrubbed vertical drift for media. `from`/`to` are yPercent of the element itself; `scale` oversizes it
 * so the drift never exposes an edge. start/end are ScrollTrigger positions relative to the parent.
 */
export default function Parallax({ from = -8, to = 8, scale = 1.18, start = "top bottom", end = "bottom top", className, children }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { yPercent: from, scale },
          { yPercent: to, scale, ease: "none", scrollTrigger: { trigger: ref.current.parentElement, start, end, scrub: true } }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
