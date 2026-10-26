"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "What we do" stage. The section pins on a #e3514b background with the Hi lettermark enlarged in the centre and the
 * copy hidden; scrolling glides the mark into its column (scale 1), fades the background to white and the copy in,
 * then the section releases.
 * Children mark the parts with [data-hi] (the mark) and [data-copy] (the right-hand content).
 * Only pins when the whole section fits the screen (lg+); otherwise the normal stacked layout is untouched.
 */
export default function HiStage({ children, ...props }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current;
        const hi = section.querySelector("[data-hi]");
        const copy = section.querySelector("[data-copy]");
        if (!hi || !copy || section.offsetHeight > window.innerHeight + 1) return;

        // centre of the mark with its own transform stripped out, relative to the viewport it will be pinned in
        const home = () => {
          const r = hi.getBoundingClientRect();
          const x = Number(gsap.getProperty(hi, "x"));
          const y = Number(gsap.getProperty(hi, "y"));
          const s = Number(gsap.getProperty(hi, "scale"));
          return { cx: r.left + r.width / 2 - x, cy: r.top + r.height / 2 - y, w: r.width / s, h: r.height / s };
        };
        const from = () => {
          const h = home();
          const ratio = h.w / h.h;
          const target = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.96 * ratio);
          // pinned section starts at the top of the viewport, so only the section-relative y matters
          const secTop = section.getBoundingClientRect().top;
          return { x: window.innerWidth / 2 - h.cx, y: window.innerHeight / 2 - (h.cy - secTop), scale: target / h.w };
        };

        gsap.set(copy, { opacity: 0, y: 60 });
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 0.9)}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        // the section opens brand-red behind the enlarged mark and settles to white as the mark docks
        tl.fromTo(section, { backgroundColor: "#e3514b" }, { backgroundColor: "#ffffff", duration: 1 }, 0)
          .fromTo(hi, { ...from() }, { x: 0, y: 0, scale: 1, duration: 1 }, 0)
          .to(copy, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.55);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} {...props}>
      {children}
    </section>
  );
}
