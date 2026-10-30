"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * Numbered value cards. On lg+ the section pins (it is sized to the screen) and scroll scrubs one timeline:
 * the lit card (blue → red frame, white number) hands over to the next one, dimming and nudging the one it leaves.
 * Below lg nothing pins; each card lights up while it is in the middle of the screen instead.
 * With reduced motion every card is shown plainly.
 */
const dim = { opacity: 0.85, scale: 0.96, x: -20 };
const lit = { opacity: 1, scale: 1, x: 0 };

export default function ValueCards({ items = [] }) {
  const list = useRef(null);

  useGSAP(
    () => {
      const section = list.current.closest("section");
      const cards = gsap.utils.toArray("[data-card]", list.current);
      const glows = gsap.utils.toArray("[data-glow]", list.current);
      const nums = gsap.utils.toArray("[data-num]", list.current);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(cards.slice(1), dim);
        gsap.set(glows.slice(1), { opacity: 0 });
        gsap.set(nums.slice(1), { color: "rgba(255,255,255,0.6)" });
        gsap.set(glows[0], { opacity: 1 });
        gsap.set(nums[0], { color: "#ffffff" });
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: { trigger: section, pin: true, start: "top top", end: () => `+=${window.innerHeight * 0.7 * cards.length}`, scrub: 0.6, invalidateOnRefresh: true },
        });
        tl.to({}, { duration: 0.4 });
        cards.slice(0, -1).forEach((card, i) => {
          tl.to(card, dim, ">")
            .to(glows[i], { opacity: 0 }, "<")
            .to(nums[i], { color: "rgba(255,255,255,0.6)" }, "<")
            .to(cards[i + 1], lit, "<")
            .to(glows[i + 1], { opacity: 1 }, "<")
            .to(nums[i + 1], { color: "#ffffff" }, "<")
            .to({}, { duration: 0.4 });
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 62%",
            end: "bottom 38%",
            onToggle: (self) => {
              gsap.to(glows[i], { opacity: self.isActive ? 1 : 0, duration: 0.5 });
              gsap.to(nums[i], { color: self.isActive ? "#ffffff" : "rgba(255,255,255,0.6)", duration: 0.5 });
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: list },
  );

  return (
    <ol ref={list} className="w-full lg:max-w-[calc(781*var(--u))]">
      {items?.map((item, i) => (
        <li
          key={item?.id ?? i}
          data-card
          className={cn("relative py-6 will-change-transform lg:py-[calc(36*var(--u))]", i > 0 && i < items.length - 1 && "border-b border-white/10")}
        >
          {/* lit frame + soft red halo; faded in/out by the scroll timeline */}
          <span data-glow aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
            <span className="absolute -inset-2 rounded-[40px] bg-linear-to-br from-basecolor/45 via-transparent to-basecolor3/25 blur-xl" />
            <span className="absolute inset-0 rounded-[30px] bg-linear-to-br from-basecolor via-basecolor3 to-basecolor3" />
            <span className="absolute inset-0.5 rounded-[28px] bg-basecolor7" />
          </span>
          <div className="relative flex items-center gap-5 px-5 lg:gap-[calc(52*var(--u))] lg:px-[calc(40*var(--u))]">
            <span data-num className="w-12 shrink-0 text-3xl/[1] font-medium text-white/60 lg:w-[calc(64*var(--u))] lg:text-stat/[1]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-base/[1.4] font-medium text-white lg:text-label">{item?.kicker}</p>
              <h3 className="text-2xl/[1.15] font-bold text-white sm:text-4xl/[1.15] lg:text-value">{item?.title}</h3>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
