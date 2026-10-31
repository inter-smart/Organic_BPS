"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * Pins a section (or just the card row) and scrubs the track sideways with vertical scroll, then releases.
 * lg+ screens tall enough for the whole section pin the section; smaller ones pin only the row.
 * Whether the section fits depends on the viewport, so everything is torn down and rebuilt (after the pin spacer
 * is gone, so the section is measured at its natural height) once the window stops resizing.
 * onUpdate runs on every scrub tick, onRefresh after each layout refresh. `measure` overrides how far the row travels.
 * Nothing is pinned with reduced motion.
 */
export default function useScrubTrack(wrap, track, { onUpdate, onRefresh, distance: measure } = {}) {
  useGSAP(
    () => {
      let mm;
      const build = () => {
        mm?.revert();
        mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const section = wrap.current.closest("section");
          const pinSection = window.innerWidth >= 1024 && section.offsetHeight <= window.innerHeight + 1;
          // a section shorter than a tall window would leave the pin spacer showing underneath it
          if (pinSection) gsap.set(section, { minHeight: "100svh" });
          const distance = measure ? () => measure(track.current) : () => Math.max(0, track.current.scrollWidth - wrap.current.clientWidth);
          gsap.to(track.current, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: pinSection ? section : wrap.current.parentElement,
              pin: true,
              start: pinSection ? "top top" : "center center",
              // hold at least ~one screen of scroll even when the row only overflows a little (laptops)
              end: () => `+=${Math.max(distance(), Math.min(window.innerHeight, 1200) * 0.9)}`,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate,
              onRefresh,
            },
          });
        });
      };
      build();

      let timer;
      let size = [window.innerWidth, window.innerHeight];
      const onResize = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const next = [window.innerWidth, window.innerHeight];
          // touch browsers fire resize when the address bar collapses; that is not a real layout change
          if (next[0] === size[0] && Math.abs(next[1] - size[1]) < 120) return;
          size = next;
          build();
        }, 300);
      };
      window.addEventListener("resize", onResize);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", onResize);
        mm?.revert();
      };
    },
    { scope: wrap }
  );
}
