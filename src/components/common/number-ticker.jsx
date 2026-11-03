"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Count-up number (Magic UI "NumberTicker" style). Counts up every time it scrolls into view and drops back to 0 when it leaves. */
export default function NumberTicker({ value = 0, prefix = "", suffix = "", decimals = 0, duration = 2, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.6 });
  const reduce = useReducedMotion();
  const format = (n) => `${prefix}${n.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView) {
      if (!reduce) el.textContent = format(0);
      return;
    }
    if (reduce) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        el.textContent = format(n);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, reduce]);

  return (
    <span className={className}>
      <span className="sr-only">{format(value)}</span>
      <span ref={ref} aria-hidden="true">
        {format(value)}
      </span>
    </span>
  );
}
