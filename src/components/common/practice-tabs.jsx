"use client";

import { useEffect, useState } from "react";

/** Discipline tabs above the practice list; the active one tracks whichever practice section is centred in view. */
export default function PracticeTabs({ items = [] }) {
  const [active, setActive] = useState(items?.[0]?.href);

  useEffect(() => {
    const sections = items.map((t) => document.querySelector(t.href)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Practices" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10 lg:flex-nowrap lg:gap-x-[calc(72*var(--u))]">
      {items.map((t, i) => {
        const isActive = active === t.href;
        return (
          <span key={t.id} className="flex items-center gap-x-6 sm:gap-x-10 lg:gap-x-[calc(72*var(--u))]">
            {i > 0 ? <span aria-hidden="true" className="hidden h-7 w-px rounded-full bg-[#b9b9b9] sm:block" /> : null}
            <a
              href={t.href}
              aria-current={isActive ? "true" : undefined}
              className={`relative pb-1.5 text-base font-medium whitespace-nowrap transition-colors duration-300 sm:text-lg lg:text-[clamp(16px,calc(25*var(--u)),25px)] ${
                isActive ? "text-basecolor" : "text-basecolor2"
              } after:absolute after:inset-x-0 after:-bottom-0 after:h-px after:origin-left after:bg-basecolor after:transition-transform after:duration-300 ${
                isActive ? "after:scale-x-100" : "after:scale-x-0"
              }`}
            >
              {t.label}
            </a>
          </span>
        );
      })}
    </nav>
  );
}
