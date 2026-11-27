"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { INTRO_EVENT } from "@/components/common/intro";
import { INTRO_KEY } from "@/lib/intro-key";

const finish = () => {
  document.documentElement.dataset.intro = "done";
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // storage blocked: the intro simply plays again next time
  }
  window.dispatchEvent(new Event(INTRO_EVENT));
};

/**
 * Intro loader: logo + 0-100 counter over the brand-black screen, then a curtain wipes up to reveal the hero.
 * Runs for about a second and only on the first page load of a browser session; it never waits for page assets.
 * Server-rendered visible, so there is no flash of the page before it.
 * Below 960px the same sequence is CSS only (`[data-intro-lite]` in globals.css).
 */
export default function Preloader() {
  const root = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { introSkip, introLite } = document.documentElement.dataset;
    const seen = introSkip !== undefined;
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      finish();
      return;
    }
    if (introLite !== undefined) {
      finish();
      return;
    }

    const counter = el.querySelector("[data-count] > span");
    const bar = el.querySelector("[data-bar]");
    const state = { n: 0 };

    const tl = gsap.timeline();
    // logo stays visible from the server HTML (it is the LCP element); only the counter animates in
    tl.to(
        state,
        {
          n: 100,
          duration: 0.5,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(state.n);
            counter.textContent = String(v).padStart(3, "0");
            bar.style.transform = `scaleX(${v / 100})`;
          },
        },
        0
      )
      .to("[data-logo], [data-meta]", { yPercent: -30, opacity: 0, duration: 0.2, ease: "power2.in" })
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.4, ease: "power4.inOut" }, "-=0.05")
      .add(() => {
        finish();
        setGone(true);
      }, "-=0.2");

    return () => tl.kill();
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="preloader fixed inset-0 z-100 flex flex-col items-center justify-center bg-basecolor4 text-white [clip-path:inset(0_0_0_0)]" role="status" aria-label="Loading">
      <div data-logo className="relative aspect-250/47 w-56 sm:w-72 xl:w-87.5">
        <Image src="/images/organic-bps-logo.png" alt="Organic BPS" title="Organic BPS" fill loading="eager" fetchPriority="high" sizes="350px" className="object-contain" />
      </div>
      <div data-meta className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-6 sm:px-10 sm:pb-10">
        <span className="text-sm tracking-[0.14em] text-white/60 uppercase sm:text-base">Purpose is the journey</span>
        <span data-count className="font-inter text-5xl font-bold tabular-nums sm:text-7xl xl:text-8xl">
          <span>000</span>
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.75 bg-white/10">
        <div data-bar className="h-full origin-left scale-x-0 bg-basecolor" />
      </div>
    </div>
  );
}
