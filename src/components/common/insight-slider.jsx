"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import useScrubTrack from "@/components/common/use-scrub-track";
import { cn } from "@/lib/utils";

/*
 * Purpose / insights cards, scrubbed sideways by use-scrub-track. Card width/gap follow the viewport width (481/1920)
 * rather than the min(width,height) scale, so the row always overflows the screen and there is something to scrub,
 * even on short laptop windows. The first card lines up with the page container via --slider-gutter and the last one ends on it.
 * Card highlight (blue → red gradient) follows hover/focus, otherwise the card nearest the screen centre.
 */
export default function InsightSlider({ items = [] }) {
  const [hover, setHover] = useState(null);
  const [auto, setAuto] = useState(1);
  const lit = hover ?? auto;
  const wrap = useRef(null);
  const track = useRef(null);

  useScrubTrack(wrap, track, {
    onUpdate: () => {
      const mid = window.innerWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      gsap.utils.toArray("li", track.current).forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) [best, bestDist] = [i, d];
      });
      setAuto(best);
    },
  });

  return (
    <div
      ref={wrap}
      className="w-full overflow-x-clip [--slider-gutter:16px] motion-reduce:overflow-x-auto sm:[--slider-gutter:max(16px,calc((100vw-640px)/2+16px))] md:[--slider-gutter:max(16px,calc((100vw-768px)/2+16px))] lg:[--slider-gutter:max(16px,calc((100vw-960px)/2+16px))] xl:[--slider-gutter:max(16px,calc((100vw-1280px)/2+16px))] 2xl:[--slider-gutter:max(16px,calc((100vw-1536px)/2+16px))]"
    >
      <ul ref={track} aria-label="Purpose insights" className="flex w-max gap-4 px-(--slider-gutter) will-change-transform lg:gap-[2.135vw]">
        {items?.map((item, i) => (
          <li key={item?.id ?? i} className="flex w-[78vw] shrink-0 sm:w-[416px] lg:w-[25.052vw]">
            <article
              tabIndex={0}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className={cn(
                "group relative w-full rounded-[30px] border border-white/10 bg-[rgba(75,74,74,0.2)] text-white outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-white/50",
                lit === i && "border-transparent bg-[linear-gradient(90deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(130.8deg,#2552aa_22.9%,#da4d47_58.3%,#da4d47_100%)]"
              )}
            >
              <div className="relative aspect-481/287 overflow-hidden rounded-[30px]">
                <Image
                  src={item?.image}
                  alt={item?.alt ?? ""}
                  fill
                  sizes="(min-width: 1280px) 480px, 80vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="px-5 pt-5 pb-6 lg:px-8 lg:pt-8 lg:pb-8">
                <h3 className="text-lg/[1.4] font-medium sm:text-xl/[1.4] lg:text-card">{item?.title}</h3>
                <p className="mt-3 text-sm/[1.6] sm:text-base/[1.6] lg:mt-5 lg:text-[clamp(13px,calc(18*var(--u)),18px)]/[1.6] text-white/90 text-pretty">{item?.text}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
