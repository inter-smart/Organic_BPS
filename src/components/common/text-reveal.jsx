"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PurposeWord from "@/components/common/ring";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-scrubbed text colour (Magic UI "TextReveal" idea, driven by GSAP ScrollTrigger).
 * Every word starts pale grey and fills to its own colour as the block scrolls through the viewport.
 * lines: [[{ t: "We", c: "#333" }, { t: "purpose", c: "#222", ring: true }, ...], ...]
 */
export default function TextReveal({ as: Tag = "h2", lines = [], from = "#dcdcdc", className }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray("[data-word]", root.current);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(words, {
          color: (i, el) => el.dataset.color,
          ease: "none",
          stagger: 0.25,
          scrollTrigger: { trigger: root.current, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        words.forEach((el) => (el.style.color = el.dataset.color));
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <Tag ref={root} className={className}>
      {lines?.map((line, li) => (
        <span key={li} className="block">
          {line?.map((w, wi) => (
            <span key={wi}>
              {wi > 0 && !w?.attach ? " " : null}
              <span data-word data-color={w?.c} style={{ color: from }}>
                {w?.ring !== undefined ? (
                  <PurposeWord word={w?.t} at={w.ring} />
                ) : (
                  w?.t
                )}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
