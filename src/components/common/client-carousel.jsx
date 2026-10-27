"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

/*
 * 3D ring carousel modelled on the vivo "umx-figure" slider (vivo.com/in/products/v80, Pet Pals):
 * the centre card is flat; neighbours swing away on the Y axis (≈21° → 48° → 60°), pull toward the
 * centre and recede in depth under one shared perspective. Autoplay 3s, 700ms transition, endless loop.
 *
 * The pose table below is vivo's measured transform per slide (|offset| 0..3) for a 156px-wide
 * slide; every length is scaled by (our card width / 156) so it holds at any size.
 */
const BASE_W = 156;
const PERSPECTIVE = 1200; // for BASE_W
// x = distance from the centre in card widths, tuned so the receding cards still line up with the
// Figma spacing once perspective has pulled them toward the vanishing point.
const poses = [
  { rot: 0, x: 0, z: 0, sx: 1, sy: 1 },
  { rot: 20.9, x: 1.03, z: -35, sx: 1.046, sy: 1.04 },
  { rot: 48.2, x: 2.2, z: -92, sx: 1.334, sy: 1.16 },
  { rot: 60, x: 3.2, z: -163, sx: 1, sy: 1 },
];

function wrap(offset, count) {
  const half = count / 2;
  if (offset > half) return offset - count;
  if (offset < -half) return offset + count;
  return offset;
}

export default function ClientCarousel({ items = [], autoplay = 3000, label = "Our clients" }) {
  const reduce = useReducedMotion();
  const total = items?.length ?? 0;
  // Doubled so the slide that wraps around does so while invisible (|offset| >= 3).
  const slides = total ? [...items, ...items] : [];
  const count = slides.length;

  const [active, setActive] = useState(Math.floor(total / 2));
  const [hovered, setHovered] = useState(false);
  const [cw, setCw] = useState(348);
  const stageRef = useRef(null);

  const go = useCallback((dir) => setActive((i) => (i + dir + count) % count), [count]);

  useLayoutEffect(() => {
    const el = stageRef.current?.querySelector("li");
    if (!el) return;
    const measure = () => setCw(el.offsetWidth || 348);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [count]);

  useEffect(() => {
    if (!autoplay || reduce || hovered || count < 2) return;
    const t = setInterval(() => go(1), autoplay);
    return () => clearInterval(t);
  }, [autoplay, reduce, hovered, count, go]);

  const k = cw / BASE_W;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-basecolor3/50"
    >
      <motion.div
        ref={stageRef}
        className="relative mx-auto h-[calc(min(52vw,348px)*1.786)] w-full max-w-[1920px] touch-pan-y sm:h-[calc(min(40vw,348px)*1.786)] lg:h-[calc(621.5*var(--u))]"
        style={{ perspective: PERSPECTIVE * k }}
        onPanEnd={(_, info) => {
          if (info.offset.x < -50) go(1);
          else if (info.offset.x > 50) go(-1);
        }}
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]" aria-live="off">
          {slides.map((item, i) => {
            const offset = wrap(i - active, count);
            const abs = Math.abs(offset);
            const sign = Math.sign(offset);
            const p = poses[Math.min(abs, 3)];
            const far = abs >= 3;
            const copy = i >= total;
            return (
              <motion.div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${(i % total) + 1} of ${total}: ${item?.name}`}
                aria-hidden={far || copy || undefined}
                className="absolute top-1/2 left-1/2 h-[76%] w-[min(52vw,348px)] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] sm:w-[min(40vw,348px)] lg:w-[calc(348*var(--u))]"
                style={{ zIndex: 100 - abs * 10, pointerEvents: far ? "none" : "auto" }}
                initial={false}
                animate={{
                  x: sign * (p.x + Math.max(0, abs - 3)) * cw,
                  z: p.z * k,
                  rotateY: -sign * p.rot,
                  scaleX: p.sx,
                  scaleY: p.sy,
                  opacity: far ? 0 : 1,
                }}
                transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => !far && setActive(i)}
              >
                <div className="flex size-full items-center justify-center rounded-[15px] bg-basecolor5 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.25)]">
                  <div className="relative h-1/2 w-[68%]">
                    <Image src={item?.logo} alt={copy ? "" : (item?.name ?? "")} fill sizes="(min-width: 1200px) 18vw, 50vw" className="object-contain" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="relative mt-4 flex items-center justify-center lg:mt-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-24 -translate-y-1/2 bg-[url('/images/carousel-curve.svg')] bg-size-[100%_100%] bg-no-repeat lg:h-[calc(112*var(--u))]"
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous client"
          className="grid size-14 place-items-center rounded-full bg-[#e4e4e4] text-white transition-colors duration-300 hover:bg-basecolor/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor sm:size-16 lg:size-[91.2px]"
        >
          <ArrowLeft strokeWidth={1.4} className="size-6 lg:size-8" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next client"
          className="-ml-1 grid size-14 place-items-center rounded-full bg-basecolor text-white transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor sm:size-16 lg:size-[91.2px]"
        >
          <ArrowRight strokeWidth={1.4} className="size-6 lg:size-8" />
        </button>
      </div>
    </div>
  );
}
