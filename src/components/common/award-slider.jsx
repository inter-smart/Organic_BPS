"use client";

import { useEffect, useRef } from "react";
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

  useScrubTrack(wrap, track, { lgUp: true });

  // below lg the row is native scroll; drift it back and forth until the user touches it
  useEffect(() => {
    const el = wrap.current;
    const mq = window.matchMedia("(max-width: 959.98px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    let paused = false;
    let resume;
    let pos = 0;
    let dir = 1;
    let last = 0;

    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (paused) pos = el.scrollLeft;
      else {
        const max = el.scrollWidth - el.clientWidth;
        pos += dir * 0.04 * dt;
        if (pos >= max || pos <= 0) {
          pos = Math.min(Math.max(pos, 0), max);
          dir = -dir;
        }
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    const hold = () => {
      paused = true;
      clearTimeout(resume);
    };
    const release = () => {
      clearTimeout(resume);
      resume = setTimeout(() => (paused = false), 2500);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (!mq.matches) return;
      pos = el.scrollLeft;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    start();
    mq.addEventListener("change", start);
    el.addEventListener("pointerdown", hold);
    el.addEventListener("pointerup", release);
    el.addEventListener("pointercancel", release);
    el.addEventListener("wheel", hold, { passive: true });
    el.addEventListener("wheel", release, { passive: true });
    el.addEventListener("focusin", hold);
    el.addEventListener("focusout", release);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resume);
      mq.removeEventListener("change", start);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("pointerup", release);
      el.removeEventListener("pointercancel", release);
      el.removeEventListener("wheel", hold);
      el.removeEventListener("wheel", release);
      el.removeEventListener("focusin", hold);
      el.removeEventListener("focusout", release);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="w-full overflow-x-auto [scrollbar-width:none] [--slider-gutter:16px] lg:overflow-x-clip [&::-webkit-scrollbar]:hidden motion-reduce:overflow-x-auto sm:[--slider-gutter:max(16px,calc((100vw-640px)/2+16px))] md:[--slider-gutter:max(16px,calc((100vw-768px)/2+16px))] lg:[--slider-gutter:max(16px,calc((100vw-960px)/2+16px))] xl:[--slider-gutter:max(16px,calc((100vw-1280px)/2+16px))] 2xl:[--slider-gutter:max(16px,calc((100vw-1536px)/2+16px))]"
    >
      <ul ref={track} aria-label="Awards" className="flex w-max gap-4 px-(--slider-gutter) will-change-transform lg:gap-[3vw]">
        {items?.map((item, i) => (
          <li key={item?.id ?? i} className="w-[78vw] shrink-0 sm:w-[416px] lg:w-[36vw]">
            <div className="group relative aspect-552/368 overflow-hidden rounded-[30px]">
              <Image
                src={item?.image}
                alt={item?.alt ?? ""}
                fill
                sizes="(min-width: 960px) 36vw, 78vw"
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
