"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIntroDone } from "@/components/common/intro";

const hidden = {
  up: { opacity: 0, y: 48 },
  down: { opacity: 0, y: -48 },
  left: { opacity: 0, x: -64 },
  right: { opacity: 0, x: 64 },
  scale: { opacity: 0, scale: 0.9 },
  fade: { opacity: 0 },
  blur: { opacity: 0, y: 24, filter: "blur(10px)" },
  clip: { opacity: 0, scale: 1.12, clipPath: "inset(100% 0% 0% 0%)" },
};
const shown = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

/**
 * Scroll-triggered entrance (Magic UI "BlurFade" style) for any server-rendered children.
 * variant: up | down | left | right | scale | fade | blur | clip (image wipe-up)
 * Nothing plays until the preloader curtain has lifted.
 */
export default function Reveal({
  as = "div",
  variant = "up",
  delay = 0,
  duration = 0.8,
  amount = 0.2,
  once = true,
  className,
  children,
  ...props
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  // clip-path: inset(100%) hides the element from IntersectionObserver, so "clip" watches its parent instead
  useEffect(() => {
    const el = variant === "clip" ? ref.current?.parentElement : ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting && once) io.disconnect();
      },
      { threshold: variant === "clip" ? 0.05 : amount }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant, amount, once]);
  const ready = useIntroDone();
  const target = variant === "clip" ? { ...shown, clipPath: "inset(0% 0% 0% 0%)" } : shown;
  return (
    <Tag
      ref={ref}
      className={className}
      initial={reduce ? false : hidden[variant]}
      animate={reduce || (ready && inView) ? target : hidden[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Tag>
  );
}
