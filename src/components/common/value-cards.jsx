"use client";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ValueCards({ items = [] }) {
  const list = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const section = list.current.closest("section");
      const cards = gsap.utils.toArray("[data-card]", list.current);
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 960px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(section, { minHeight: "100svh" });
          ScrollTrigger.create({
            trigger: section,
            pin: true,
            start: "top top",
            end: () =>
              `+=${Math.min(window.innerHeight, 1200) * 0.6 * cards.length}`,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              setActive(
                Math.min(
                  cards.length - 1,
                  Math.floor(self.progress * cards.length),
                ),
              ),
          });
        },
      );

      mm.add(
        "(max-width: 959px) and (prefers-reduced-motion: no-preference)",
        () => {
          cards.forEach((card, i) => {
            ScrollTrigger.create({
              trigger: card,
              start: "top 62%",
              end: "bottom 38%",
              onToggle: (self) => self.isActive && setActive(i),
            });
          });
        },
      );

      return () => mm.revert();
    },
    { scope: list },
  );

  return (
    <ol ref={list} className="w-full lg:max-w-[781px]">
      {items?.map((item, i) => (
        <li
          key={item?.id ?? i}
          data-card
          className={cn(
            "relative py-6 transition-[opacity,transform] duration-500 ease-out will-change-transform lg:py-12.5 2xl:py-17.5 not-last:border-b not-last:border-white/10",
            active === i && "border-b-0!",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "[--rounded:15px] 2xl:[--rounded:20px] pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out",
              active === i && "opacity-100",
            )}
          >
            <span className="absolute -inset-2 rounded-(--rounded) bg-linear-to-br from-basecolor/45 via-transparent to-basecolor3/25 blur-xl" />
            <span className="absolute inset-0 rounded-(--rounded) bg-linear-to-br from-basecolor via-basecolor3 to-basecolor3" />
            <span className="absolute inset-0.5 rounded-(--rounded) bg-basecolor7" />
          </span>
          <div className="relative flex items-center gap-5 px-5 lg:gap-[calc(52*var(--u))] lg:px-[calc(40*var(--u))]">
            <span
              className={cn(
                "w-12 shrink-0 text-3xl/[1] font-medium transition-colors duration-500 lg:w-[calc(64*var(--u))] lg:text-stat/[1] text-[#464646]",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-base/[1.4] font-medium text-white lg:text-label">
                {item?.kicker}
              </p>
              <h3 className="text-2xl/[1.15] font-bold text-white sm:text-4xl/[1.15] lg:text-value">
                {item?.title}
              </h3>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
