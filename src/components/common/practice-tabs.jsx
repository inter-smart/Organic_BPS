"use client";
import { useEffect, useState } from "react";

export default function PracticeTabs({ items = [] }) {
  const [active, setActive] = useState(items?.[0]?.href);

  useEffect(() => {
    const sections = items
      .map((t) => document.querySelector(t.href))
      .filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Practices"
      className="flex flex-wrap items-center justify-center gap-x-2.5 lg:gap-y-3 sm:gap-x-2.5 lg:flex-nowrap lg:gap-x-[calc(72*var(--u))] max-sm:justify-between"
    >
      {items.map((t, i) => {
        const isActive = active === t.href;
        return (
          <span
            key={t.id}
            className="flex items-center gap-x-6 sm:gap-x-2.5 lg:gap-x-[calc(72*var(--u))] max-lg:text-center"
          >
            {i > 0 ? (
              <span
                aria-hidden="true"
                className="hidden h-7 w-0.5 lg:w-0.75 rounded-full bg-[#b9b9b9] sm:block"
              />
            ) : null}
            <a
              href={t.href}
              aria-current={isActive ? "true" : undefined}
              className={`relative py-2.5 sm:py-3.75 lg:py-5 2xl:py-7.5 text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-300 2xl:text-xl 3xl:text-[clamp(16px,calc(25*var(--u)),25px)] ${
                isActive ? "text-basecolor" : "text-basecolor2"
              } after:absolute after:inset-x-0 after:-bottom-0 after:h-0.75 after:origin-left after:bg-basecolor after:transition-transform after:duration-300 ${
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
