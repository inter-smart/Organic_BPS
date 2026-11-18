"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

/*
 * 3D ring carousel: the centre card is flat, neighbours face inward (concave arc) so the outer cards
 * sit closer to the viewer and read larger, as in the design. Autoplay 3s, 700ms transition, endless loop.
 *
 * Poses (|offset| 0..3) are measured from the design for a 156px-wide slide; every length is scaled
 * by (our card width / 156) so it holds at any size.
 */
const BASE_W = 156;
const PERSPECTIVE = 585; // for BASE_W
// x = distance from the centre in card widths.
const poses = [
  { rot: 0, x: 0, z: 0 },
  { rot: 40, x: 1.04, z: -37 },
  { rot: 58, x: 1.81, z: 45 },
  { rot: 60, x: 2.4, z: 140 },
];

function wrap(offset, count) {
  const half = count / 2;
  if (offset > half) return offset - count;
  if (offset < -half) return offset + count;
  return offset;
}

export default function ClientCarousel({
  items = [],
  autoplay = 3000,
  label = "Our clients",
}) {
  const reduce = useReducedMotion();
  const total = items?.length ?? 0;
  // Doubled so the slide that wraps around does so while invisible (|offset| >= 3).
  const slides = total ? [...items, ...items] : [];
  const count = slides.length;

  const [active, setActive] = useState(Math.floor(total / 2));
  const [hovered, setHovered] = useState(false);
  const [cw, setCw] = useState(348);
  const stageRef = useRef(null);

  const go = useCallback(
    (dir) => setActive((i) => (i + dir + count) % count),
    [count],
  );

  useLayoutEffect(() => {
    const el = stageRef.current?.querySelector("[role=group]");
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
        className="relative mx-auto h-[calc(min(52vw,348px)*1.786)] w-full max-w-[1920px] touch-pan-y sm:h-[calc(min(40vw,348px)*1.786)] lg:h-[calc(min(348*var(--u),18.2vw)*1.786)]"
        style={{ perspective: PERSPECTIVE * k }}
        onPanEnd={(_, info) => {
          if (info.offset.x < -50) go(1);
          else if (info.offset.x > 50) go(-1);
        }}
      >
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          aria-live="off"
        >
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
                aria-label={`${(i % total) + 1} of ${total}: ${item?.image_alt_tag}`}
                aria-hidden={far || copy || undefined}
                className="absolute top-1/2 left-1/2 h-[76%] w-[min(52vw,348px)] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] sm:w-[min(40vw,348px)] lg:w-[min(calc(348*var(--u)),18.2vw)]"
                style={{
                  zIndex: 100 - abs * 10,
                  pointerEvents: far ? "none" : "auto",
                }}
                initial={false}
                animate={{
                  x: sign * (p.x + Math.max(0, abs - 3)) * cw,
                  z: p.z * k,
                  rotateY: -sign * p.rot,
                  opacity: far ? 0 : 1,
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                }
                onClick={() => !far && setActive(i)}
              >
                <div className="flex size-full items-center justify-center rounded-[15px] bg-basecolor5">
                  <div className="relative h-1/2 w-[68%]">
                    <Image
                      src={item?.image}
                      alt={copy ? "" : (item?.image_alt_tag ?? "")}
                      title={copy ? "" : (item?.image_alt_tag ?? "")}
                      fill
                      sizes="(min-width: 1200px) 18vw, 50vw"
                      className="object-contain"
                    />
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
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-10 lg:h-24 bg-[url('/images/carousel-curve.svg')] bg-size-[100%_100%] bg-no-repeat"
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous client"
          className="grid size-14 place-items-center rounded-full bg-[#E6E6E6] text-white transition-colors duration-300 hover:bg-basecolor focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor sm:size-16 lg:size-15 2xl:size-17.5 3xl:size-22.5"
        >
          <ArrowLeft strokeWidth={1.4} className="size-5 2xl:size-8" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next client"
          className="ml-1 grid size-14 place-items-center rounded-full bg-[#E6E6E6] text-white transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor sm:size-16 lg:size-15 2xl:size-17.5 3xl:size-22.5 hover:bg-basecolor"
        >
          <ArrowRight strokeWidth={1.4} className="size-5 2xl:size-8" />
        </button>
      </div>
    </div>
  );
}
