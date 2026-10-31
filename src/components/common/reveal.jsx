"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-triggered entrance (Magic UI "BlurFade" style) for any server-rendered children.
 * variant: up | down | left | right | scale | fade | blur | clip (image wipe-up)
 * Nothing plays until the preloader curtain has lifted (html[data-intro="done"]). It replays each time the element
 * scrolls back into view (pass once to keep it final after the first play).
 * Purely CSS-driven (see `[data-reveal]` in globals.css): the observer only flips an attribute, so there is no React
 * state, re-render or JS animation when the curtain lifts — that keeps the main thread free during load.
 * `immediate` is for the one LCP element per page (the hero <h1>): it is always shown, since the preloader's opaque
 * curtain already hides it from users.
 */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration = 0.8,
  amount = 0.2,
  once = false,
  immediate = false,
  className,
  style,
  children,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (immediate) return;
    // clip-path: inset(100%) hides the element from IntersectionObserver, so "clip" watches its parent instead
    const el = variant === "clip" ? ref.current?.parentElement : ref.current;
    if (!el) return;
    const need = variant === "clip" ? 0.05 : amount;
    // visible once `need` of it is on screen; back to hidden only when it has fully left (no pop while partly visible)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= need) {
          ref.current.dataset.in = "1";
          if (once) io.disconnect();
        } else if (!e.isIntersecting) ref.current.dataset.in = "0";
      },
      { threshold: [0, need] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant, amount, once, immediate]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-immediate={immediate ? "" : undefined}
      className={className}
      style={{ "--rv-delay": `${delay}s`, "--rv-dur": `${duration}s`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
