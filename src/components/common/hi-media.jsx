"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The "Hi" lettermark: an SVG mask that clips a looping video (or a poster image until a video is supplied).
 * Scroll animation: the media inside the mask slowly zooms out and drifts as the section scrolls past.
 */
export default function HiMedia({ video, poster, alt = "", className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.25, 1.05, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      role="img"
      aria-label={alt}
      className={`relative aspect-834/669 w-full ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        WebkitMaskImage: "url(/images/hi-mask.svg)",
        maskImage: "url(/images/hi-mask.svg)",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        {video ? (
          <video
            className="size-full object-cover"
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <Image src={poster} alt="" fill sizes="(min-width: 1200px) 45vw, 100vw" className="object-cover" />
        )}
      </motion.div>
    </motion.div>
  );
}
