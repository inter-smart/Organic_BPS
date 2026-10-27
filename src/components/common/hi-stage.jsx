"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "What we do" stage. The section pins on a #e3514b background with the Hi lettermark enlarged in the centre and the
 * copy hidden; scrolling glides the mark into its column (scale 1), fades the background to white and the copy in,
 * then it STAYS fixed (sticky) while the next section rises over it like a curtain, with a slight parallax push-back.
 * Layout (lg+): wrapper = 100svh + 0.9svh scrub + 100svh cover, section is sticky top-0 h-svh, and the next section
 * pulls up by -100svh so it starts rising exactly when the Hi has docked.
 * Children mark the parts with [data-hi] (the mark) and [data-copy] (the right-hand content).
 * Only pins when the whole section fits the screen (lg+); otherwise the normal stacked layout is untouched.
 */
export default function HiStage({ children, ...props }) {
  const root = useRef(null);
  const wrap = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current;
        const hi = section.querySelector("[data-hi]");
        const copy = section.querySelector("[data-copy]");
        const inner = section.firstElementChild;
        if (!hi || !copy) return;
        const dist = () => Math.round(window.innerHeight * 0.9);

        // centre of the mark with its own transform stripped out, relative to the viewport it sits stuck in
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
          const secTop = section.getBoundingClientRect().top;
          return { x: window.innerWidth / 2 - h.cx, y: window.innerHeight / 2 - (h.cy - secTop), scale: target / h.w };
        };

        gsap.set(copy, { opacity: 0, y: 60 });
        // the section opens brand-red behind the enlarged mark and settles to white as the mark docks
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: wrap.current, start: "top top", end: () => `+=${dist()}`, scrub: 0.6, invalidateOnRefresh: true },
        });
        tl.fromTo(section, { backgroundColor: "#e3514b" }, { backgroundColor: "#ffffff", duration: 1 }, 0)
          .fromTo(hi, { ...from() }, { x: 0, y: 0, scale: 1, duration: 1 }, 0)
          .to(copy, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.55);

        // parallax: while the next section covers this one, it drifts up slower and dims back
        gsap.to(inner, {
          yPercent: -10,
          scale: 0.96,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: () => `top+=${dist()} top`, end: () => `+=${window.innerHeight}`, scrub: true, invalidateOnRefresh: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const { className, ...rest } = props;
  return (
    <div ref={wrap} className="lg:h-[290svh]">
      <section ref={root} className={`${className ?? ""} lg:sticky lg:top-0 lg:h-svh`} {...rest}>
        {children}
      </section>
    </div>
  );
}
