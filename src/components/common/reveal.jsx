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
 * Nothing plays until the preloader curtain has lifted. It replays each time the element scrolls back into view
 * (pass once to keep it final after the first play).
 */
export default function Reveal({
  as = "div",
  variant = "up",
  delay = 0,
  duration = 0.8,
  amount = 0.2,
  once = false,
  immediate = false,
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
    const need = variant === "clip" ? 0.05 : amount;
    // visible once `need` of it is on screen; back to hidden only when it has fully left (no pop while partly visible)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= need) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!e.isIntersecting) setInView(false);
      },
      { threshold: [0, need] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant, amount, once]);
  const introReady = useIntroDone();
  // `immediate` is for the one LCP element per page (the hero <h1>) only. The preloader's own opaque
  // curtain already hides everything until it lifts, so skipping the entrance animation there is
  // invisible to users — but it matters for Lighthouse/Core Web Vitals. Gating `animate` on `inView`
  // (set by an IntersectionObserver effect) means the server-rendered HTML — and the first client
  // paint, before that effect has run — is stuck at `hidden[variant]` (opacity:0) regardless of
  // `initial`, since `inView` starts `false` on both. Chrome can't count the heading as painted until
  // client JS hydrates, the observer fires, and the intro curtain finishes — several seconds under
  // throttled conditions. `immediate` bypasses both the intro gate and the inView gate so the element
  // is simply always shown, matching what the preloader already guarantees is hidden from the user.
  const ready = immediate || introReady;
  const target = variant === "clip" ? { ...shown, clipPath: "inset(0% 0% 0% 0%)" } : shown;
  return (
    <Tag
      ref={ref}
      className={className}
      initial={reduce || immediate ? false : hidden[variant]}
      animate={reduce || immediate || (ready && inView) ? target : hidden[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Tag>
  );
}
