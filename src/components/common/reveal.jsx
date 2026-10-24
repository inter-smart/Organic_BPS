"use client";

import { motion, useReducedMotion } from "framer-motion";

const hidden = {
  up: { opacity: 0, y: 48 },
  down: { opacity: 0, y: -48 },
  left: { opacity: 0, x: -64 },
  right: { opacity: 0, x: 64 },
  scale: { opacity: 0, scale: 0.9 },
  fade: { opacity: 0 },
  blur: { opacity: 0, y: 24, filter: "blur(10px)" },
};
const shown = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

/**
 * Scroll-triggered entrance (Magic UI "BlurFade" style) for any server-rendered children.
 * variant: up | down | left | right | scale | fade | blur
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
  return (
    <Tag
      className={className}
      initial={reduce ? false : hidden[variant]}
      whileInView={shown}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Tag>
  );
}
