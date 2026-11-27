"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import useScrubTrack from "@/components/common/use-scrub-track";

/*
 * Recognition cards, scrubbed sideways by use-scrub-track like the home insights row. The row starts inside a page
 * container so the first card lines up with the section heading, then runs on past the right edge of the container.
 */

export default function AwardSlider({ items = [] }) {
  const wrap = useRef(null);
  const track = useRef(null);

  useScrubTrack(wrap, track, {
    distance: (t) => {
      const box = t.parentElement;
      const style = getComputedStyle(box);
      const content =
        box.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      return Math.max(0, t.offsetWidth - content);
    },
  });

  return (
    <div
      ref={wrap}
      className="w-full overflow-x-clip motion-reduce:overflow-x-auto"
    >
      <div className="container mx-auto px-4">
        <ul
          ref={track}
          aria-label="Awards"
          className="flex w-max gap-4 will-change-transform lg:gap-[3vw]"
        >
          {items?.map((item, i) => (
            <li
              key={item?.id ?? i}
              className="w-[78vw] shrink-0 sm:w-[416px] lg:w-[36vw]"
            >
              <div className="group relative aspect-552/368 overflow-hidden rounded-[30px]">
                <Image
                  src={item?.image}
                  alt={item?.title || "Award"}
                  title={item?.title || "Award"}
                  fill
                  sizes="(min-width: 1024px) 36vw, 78vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-xl/[1.3] font-medium text-basecolor2 lg:mt-[calc(26*var(--u))] lg:text-card/[1.3]">
                {item?.title}
              </h3>
              <p className="mt-1 text-sm/[1.6] font-medium text-basecolor2 sm:text-base/[1.6] lg:mt-[calc(8*var(--u))] lg:text-body">
                {item?.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
