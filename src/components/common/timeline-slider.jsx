"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * Year-by-year timeline. Same pinning approach as InsightSlider: the section pins while vertical scroll scrubs the
 * track sideways, then releases. The year that sits on the focal line (24% of the viewport, where the design shows
 * the highlighted year) gets the filled circle, so the highlight steps from year to year as the row travels.
 * The row travels until the last year reaches the focal line. With reduced motion nothing pins and the row scrolls natively.
 */
export default function TimelineSlider({ items = [] }) {
  const [active, setActive] = useState(1);
  const wrap = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const build = (pinSection) => {
        const section = wrap.current.closest("section");
        const years = gsap.utils.toArray("[data-year]", track.current);
        const focal = () => window.innerWidth * 0.24;
        // screen-x of a year's centre with the row's current translation taken out
        const centre = (el) => {
          const r = el.getBoundingClientRect();
          return r.left + r.width / 2 - gsap.getProperty(track.current, "x");
        };
        const distance = () => Math.max(0, centre(years[years.length - 1]) - focal());
        const pinEl = pinSection ? section : wrap.current.parentElement;
        const pick = () => {
          let best = 0;
          let bestDist = Infinity;
          years.forEach((y, i) => {
            const r = y.getBoundingClientRect();
            const d = Math.abs(r.left + r.width / 2 - focal());
            if (d < bestDist) [best, bestDist] = [i, d];
          });
          setActive(best);
        };
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          // on the tween, not the trigger: the scrubbed row keeps easing after scrolling stops
          onUpdate: pick,
          scrollTrigger: {
            trigger: pinEl,
            pin: true,
            start: pinSection ? "top top" : "center center",
            end: () => `+=${Math.max(distance(), window.innerHeight * 0.9)}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: pick,
          },
        });
      };
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = wrap.current.closest("section");
        build(window.innerWidth >= 1024 && section.offsetHeight <= window.innerHeight + 1);
      });
      return () => mm.revert();
    },
    { scope: wrap },
  );

  return (
    <div
      ref={wrap}
      role="group"
      aria-label="Organic BPS timeline"
      tabIndex={0}
      className="relative w-full overflow-x-clip outline-none focus-visible:ring-2 focus-visible:ring-basecolor3 motion-reduce:overflow-x-auto"
    >
      {/* dashed guide line — fixed to the viewport so it fades out at both edges while the row moves */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[calc(88*var(--u))] border-t border-dashed border-basecolor [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] max-lg:top-11"
      />
      <div className="container mx-auto px-4">
        <ol ref={track} aria-label="Organic BPS milestones" className="relative flex w-max will-change-transform">
          {items?.map((item, i) => (
            <li key={item?.id ?? i} aria-current={active === i ? "step" : undefined} className="relative w-44 shrink-0 sm:w-52 lg:w-[calc(310*var(--u))]">
              <div data-year className="relative flex h-22 w-fit items-center px-2 lg:h-[calc(120*var(--u))] lg:px-[calc(19*var(--u))]">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 left-1/2 size-22 -translate-1/2 rounded-full bg-basecolor transition-transform duration-500 ease-out lg:size-[calc(120*var(--u))]",
                    active === i ? "scale-100" : "scale-0",
                  )}
                />
                <span className={cn("relative text-xl/[1.2] font-medium transition-colors duration-500 lg:text-year", active === i ? "text-white" : "text-basecolor")}>
                  {item?.year}
                </span>
              </div>
              <p className="mt-3 max-w-36 pl-2 text-base/[1.4] font-medium text-basecolor2 lg:mt-[calc(8*var(--u))] lg:pl-[calc(19*var(--u))] lg:max-w-[calc(180*var(--u))] lg:text-label">
                {item?.label}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
