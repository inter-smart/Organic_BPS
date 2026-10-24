"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Hero background: any mix of videos and images, cross-faded in sequence.
 * slides: [{ id, type: "image" | "video", src, poster?, alt?, duration? }]
 * Images stay `duration` ms (default 6000); videos advance when they finish playing.
 */
export default function HeroMedia({ slides = [] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = slides?.length ?? 0;
  const slide = slides?.[index];
  const next = () => setIndex((i) => (i + 1) % count);

  useEffect(() => {
    if (count < 2 || slide?.type === "video") return;
    const t = setTimeout(next, slide?.duration ?? 6000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count, slide?.type, slide?.duration]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-basecolor4">
      <AnimatePresence initial={false}>
        {slide ? (
          <motion.div
            key={slide.id ?? index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.2, ease: "easeInOut" }}
          >
            {slide.type === "video" ? (
              <video
                className="size-full object-cover"
                src={slide.src}
                poster={slide.poster}
                autoPlay
                muted
                playsInline
                loop={count < 2}
                preload="auto"
                onEnded={count > 1 ? next : undefined}
                aria-hidden="true"
              />
            ) : (
              <motion.div
                className="relative size-full"
                initial={{ scale: reduce ? 1 : 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "easeOut" }}
              >
                <Image src={slide.src} alt={slide.alt ?? ""} fill priority={index === 0} sizes="100vw" className="object-cover object-[72%_center] xl:object-center" />
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/* legibility overlay: darkens the left (copy) side and the bottom edge */}
      <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent" />

      {count > 1 ? (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Hero media">
          {slides.map((s, i) => (
            <button
              key={s?.id ?? i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
