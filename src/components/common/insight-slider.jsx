"use client";

import { useState } from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css/core";
import { cn } from "@/lib/utils";

/*
 * Purpose / insights cards slider. The track bleeds off the right edge of the viewport (as in the design)
 * while the first card lines up with the page container via --slider-gutter.
 * Card highlight (blue → red gradient) follows hover/focus; slide 2 is lit by default, as designed.
 * No overflow is set on the track — Splide's own core CSS handles clipping.
 */
export default function InsightSlider({ items = [] }) {
  const [hover, setHover] = useState(null);
  const lit = hover ?? 1;

  return (
    <div className="w-full [--slider-gutter:16px] sm:[--slider-gutter:max(16px,calc((100vw-540px)/2+16px))] md:[--slider-gutter:max(16px,calc((100vw-720px)/2+16px))] lg:[--slider-gutter:max(16px,calc((100vw-960px)/2+16px))] xl:[--slider-gutter:max(16px,calc((100vw-1140px)/2+16px))] 2xl:[--slider-gutter:max(16px,calc((100vw-1320px)/2+16px))] 3xl:[--slider-gutter:max(16px,calc((100vw-1480px)/2+16px))] 4xl:[--slider-gutter:max(16px,calc((100vw-1680px)/2+16px))]">
      <Splide
        aria-label="Purpose insights"
        options={{
          type: "slide",
          arrows: false,
          pagination: false,
          drag: true,
          snap: true,
          flickPower: 300,
          fixedWidth: "30.0625rem",
          gap: "2.5625rem",
          padding: { left: "var(--slider-gutter)", right: "var(--slider-gutter)" },
          speed: 650,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          breakpoints: {
            1199: { fixedWidth: "26rem", gap: "1.5rem" },
            767: { fixedWidth: "78vw", gap: "1rem", padding: { left: "var(--slider-gutter)", right: "1rem" } },
          },
        }}
      >
        {items?.map((item, i) => (
          <SplideSlide key={item?.id ?? i}>
            <article
              tabIndex={0}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className={cn(
                "group relative h-full rounded-[1.875rem] border border-white/10 bg-[rgba(75,74,74,0.2)] text-white outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-white/50",
                lit === i && "border-transparent bg-[linear-gradient(90deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(130.8deg,#2552aa_22.9%,#da4d47_58.3%,#da4d47_100%)]"
              )}
            >
              <div className="relative aspect-481/287 overflow-hidden rounded-[1.875rem]">
                <Image
                  src={item?.image}
                  alt={item?.alt ?? ""}
                  fill
                  sizes="(min-width: 1200px) 30rem, 80vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="px-5 pt-5 pb-6 xl:px-8 xl:pt-8 xl:pb-8">
                <h3 className="text-lg/[1.4] font-medium sm:text-xl/[1.4] xl:text-card">{item?.title}</h3>
                <p className="mt-3 text-sm/[1.6] sm:text-base/[1.6] xl:mt-5 xl:text-lg/[1.67] text-white/90 text-pretty">{item?.text}</p>
              </div>
            </article>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
