"use client";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * lg and above: the section pins and vertical scroll scrubs the row sideways.
 * Below lg: a plain row that autoplays; hover or focus pauses it.
 */

export default function TimelineSlider({ items = [] }) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const wrap = useRef(null);
  const track = useRef(null);
  const stRef = useRef(null);
  const paused = useRef(false);
  const raf = useRef(0);
  const gliding = useRef(false);

  useGSAP(
    () => {
      let mm;

      const build = () => {
        mm?.revert();
        mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const section = wrap.current?.closest("section");
          if (!section || !track.current) return;

            const itemEls = gsap.utils.toArray("li", track.current);
            const count = itemEls.length;
            if (count === 0) return;

            const pinSection =
              window.innerWidth >= 1024 &&
              section.offsetHeight <= window.innerHeight + 1;
            if (pinSection) gsap.set(section, { minHeight: "100svh" });

          const availWidth = wrap.current.clientWidth;
          const trackWidth = track.current.scrollWidth;
          const maxScroll = Math.max(0, trackWidth - availWidth);

            // For each item, compute how far the track needs to translate left (targetX)
            // so that the item is comfortably visible within the container.
            // Items that fit on screen at x = 0 need targetX = 0.
            // Subsequent items scroll left just enough so their right edge stays within the container,
            // with the final item capped exactly at maxScroll.
            const targetX = itemEls.map((el) => {
              const itemRight = el.offsetLeft + el.offsetWidth;
              if (itemRight <= availWidth + 2) return 0;
              return Math.min(maxScroll, Math.max(0, itemRight - availWidth));
            });

            // Pacing: allocate generous vertical scroll distance (~500px per milestone)
            // so milestones don't switch too quickly on scroll.
            const scrollDistance = Math.max(
              maxScroll * 2,
              Math.min(window.innerHeight, 1000) * (count * 0.55),
            );

            const proxy = { p: 0 };

            const applyProgress = (p) => {
              // Pick active milestone based on equal slices of scroll progress
              const activeIdx = Math.min(count - 1, Math.floor(p * count));
              if (activeRef.current !== activeIdx) {
                activeRef.current = activeIdx;
                setActive(activeIdx);
              }

            // Piecewise smooth interpolation for track horizontal position
            // Uses smoothstep (cubic Hermite) for organic gliding with zero sudden jerk
            const u = Math.max(0, Math.min(count - 1, p * count - 0.5));
            const baseIdx = Math.floor(u);
            const rawFrac = u - baseIdx;
            const smoothFrac = rawFrac * rawFrac * (3 - 2 * rawFrac);
            const nextIdx = Math.min(count - 1, baseIdx + 1);
            const currentX =
              targetX[baseIdx] +
              smoothFrac * (targetX[nextIdx] - targetX[baseIdx]);

              gsap.set(track.current, { x: -currentX });
            };

            // The tween controls proxy.p with scrub easing so flicking or fast scrolling
            // remains buttery smooth and buffered rather than jumping erratically.
            const tween = gsap.to(proxy, {
              p: 1,
              ease: "none",
              scrollTrigger: {
                trigger: pinSection ? section : wrap.current.parentElement,
                pin: true,
                start: pinSection ? "top top" : "center center",
                end: () => `+=${scrollDistance}`,
                scrub: 0.9,
                invalidateOnRefresh: true,
                onRefresh: (self) => {
                  proxy.p = self.progress;
                  applyProgress(self.progress);
                },
              },
              onUpdate: () => applyProgress(proxy.p),
            });

            stRef.current = tween.scrollTrigger;
          },
        );
      };

      build();

      let timer;
      let size = [window.innerWidth, window.innerHeight];
      const onResize = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          const next = [window.innerWidth, window.innerHeight];
          const touch = window.matchMedia("(pointer: coarse)").matches;
          const heightMoved = touch
            ? Math.abs(next[1] - size[1]) >= 120
            : next[1] !== size[1];
          if (next[0] === size[0] && !heightMoved) return;
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
    { scope: wrap, dependencies: [items] },
  );

  const scrollToItem = (i) => {
    const st = stRef.current;
    if (st && window.innerWidth >= 1024 && items?.length) {
      const targetP = (i + 0.5) / items.length;
      window.scrollTo({
        top: st.start + targetP * (st.end - st.start),
        behavior: "smooth",
      });
      return;
    }
    const itemEl = track.current?.querySelectorAll("li")[i];
    const box = wrap.current;
    if (!itemEl || !box) return;

    activeRef.current = i;
    setActive(i);
    const itemRect = itemEl.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();
    const from = box.scrollLeft;
    const to =
      from +
      itemRect.left -
      boxRect.left -
      (box.clientWidth - itemRect.width) / 2;
    cancelAnimationFrame(raf.current);
    gliding.current = true;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / 900);
      box.scrollLeft = from + (to - from) * (t * t * (3 - 2 * t));
      if (t < 1) raf.current = requestAnimationFrame(step);
      else gliding.current = false;
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (items.length < 2) return;
    const mobile = window.matchMedia("(max-width: 959px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const id = setInterval(() => {
      if (!mobile.matches || still.matches || paused.current) return;
      scrollToItem((activeRef.current + 1) % items.length);
    }, 3000);
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf.current);
    };
  }, [items.length]);

  const onNativeScroll = () => {
    if (
      gliding.current ||
      window.innerWidth >= 1024 ||
      !wrap.current ||
      !track.current
    )
      return;

    const itemEls = track.current.querySelectorAll("li");
    if (!itemEls.length) return;

    const wrapRect = wrap.current.getBoundingClientRect();
    const wrapCenter = wrapRect.left + wrapRect.width / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    itemEls.forEach((itemEl, i) => {
      const itemRect = itemEl.getBoundingClientRect();
      const distance = Math.abs(
        wrapCenter - (itemRect.left + itemRect.width / 2),
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    });

    if (activeRef.current !== nearestIndex) {
      activeRef.current = nearestIndex;
      setActive(nearestIndex);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToItem(Math.min(items.length - 1, active + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToItem(Math.max(0, active - 1));
    }
  };

  return (
    <div
      ref={wrap}
      role="group"
      aria-label="Organic BPS timeline"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative ml-[calc(-1*var(--bleed))] w-[calc(100%+var(--bleed))] overflow-x-clip outline-none [--bleed:16px] lg:[--bleed:calc(27*var(--u))] focus-visible:ring-2 focus-visible:ring-basecolor3 motion-reduce:overflow-x-auto"
    >
      {/* dashed guide line — fixed to the viewport so it fades out at both edges while the row moves */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[88px] lg:top-[calc(88*var(--u))] border-t border-dashed border-basecolor [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      />
      <ol
        ref={track}
        aria-label="Organic BPS milestones"
        className="relative flex w-max will-change-transform"
      >
        {items?.map((item, i) => (
          <li
            key={item?.id ?? i}
            aria-current={active === i ? "step" : undefined}
            onClick={() => scrollToItem(i)}
            className="relative w-44 shrink-0 cursor-pointer select-none sm:w-52 lg:w-[calc(310*var(--u))]"
          >
            <div
              data-year
              className="relative flex h-22 w-fit items-center px-4 lg:h-[calc(120*var(--u))] lg:px-[calc(27*var(--u))]"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1/2 left-1/2 size-18 -translate-1/2 rounded-full bg-basecolor transition-transform duration-700 ease-out lg:size-[calc(120*var(--u))]",
                  active === i ? "opacity-100" : "opacity-0",
                )}
              />
              <span
                className={cn(
                  "relative text-xl/[1.2] font-medium transition-colors duration-500 lg:text-year",
                  active === i ? "text-white" : "text-basecolor",
                )}
              >
                {item?.year}
              </span>
            </div>
            <p className="mt-3 max-w-36 pl-4 text-base/[1.4] font-medium text-basecolor2 lg:mt-[calc(8*var(--u))] lg:pl-[calc(27*var(--u))] lg:max-w-[calc(180*var(--u))] lg:text-label">
              {item?.label}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
