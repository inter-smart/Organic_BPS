"use client";

import { useRef } from "react";
import Image from "next/image";
import useScrubTrack from "@/components/common/use-scrub-track";

/*
 * Recognition cards, scrubbed sideways by use-scrub-track like the home insights row. Cards are wider than a third of
 * the screen so the row overflows and there is something to scrub; the first one lines up with the page container
 * via --slider-gutter and the last one ends on it.
 */
export default function AwardSlider({ items = [] }) {
  const wrap = useRef(null);
  const track = useRef(null);

  useScrubTrack(wrap, track);

  return (
    <div
      ref={wrap}
      className="w-full overflow-x-clip [--slider-gutter:16px] motion-reduce:overflow-x-auto sm:[--slider-gutter:max(16px,calc((100vw-640px)/2+16px))] md:[--slider-gutter:max(16px,calc((100vw-768px)/2+16px))] lg:[--slider-gutter:max(16px,calc((100vw-1024px)/2+16px))] xl:[--slider-gutter:max(16px,calc((100vw-1280px)/2+16px))] 2xl:[--slider-gutter:max(16px,calc((100vw-1536px)/2+16px))]"
    >
      <ul ref={track} aria-label="Awards" className="flex w-max gap-4 px-(--slider-gutter) will-change-transform lg:gap-[3vw]">
        {items?.map((item, i) => (
          <li key={item?.id ?? i} className="w-[78vw] shrink-0 sm:w-[416px] lg:w-[36vw]">
            <div className="group relative aspect-552/368 overflow-hidden rounded-[30px]">
              <Image
                src={item?.image}
                alt={item?.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 36vw, 78vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 text-xl/[1.3] font-medium text-basecolor2 lg:mt-[calc(26*var(--u))] lg:text-card/[1.3]">{item?.title}</h3>
            <p className="mt-1 text-sm/[1.6] font-medium text-basecolor2 sm:text-base/[1.6] lg:mt-[calc(8*var(--u))] lg:text-body">{item?.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
