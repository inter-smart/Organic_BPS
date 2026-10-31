"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { INTRO_EVENT } from "@/components/common/intro";

const MIN_MS = 1400;

const finish = () => {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_EVENT));
};

/**
 * Intro loader: logo + 0-100 counter over the brand-black screen, then a curtain wipes up to reveal the hero.
 * Waits for the window `load` event (and at least MIN_MS) so the hero video/poster is ready behind it.
 * Server-rendered visible, so there is no flash of the page before it.
 */
export default function Preloader() {
  const root = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      finish();
      return;
    }

    const counter = el.querySelector("[data-count]");
    const bar = el.querySelector("[data-bar]");
    const state = { n: 0 };
    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const tl = gsap.timeline();
    // logo stays visible from the server HTML (it is the LCP element); only the counter animates in
    tl.to(
        state,
        {
          n: 100,
          duration: MIN_MS / 1000,
          ease: "power2.inOut",
          onUpdate: () => {
            // hold near 90% until the page has really loaded
            tl.timeScale(!loaded && state.n > 90 ? 0.15 : 1);
            const v = Math.round(state.n);
            counter.textContent = String(v).padStart(3, "0");
            bar.style.transform = `scaleX(${v / 100})`;
          },
        },
        0
      )
      .to("[data-logo], [data-meta]", { yPercent: -30, opacity: 0, duration: 0.5, ease: "power2.in" })
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power4.inOut" }, "-=0.1")
      .add(() => {
        finish();
        setGone(true);
      }, "-=0.45");

    return () => {
      window.removeEventListener("load", onLoad);
      tl.kill();
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="preloader fixed inset-0 z-100 flex flex-col items-center justify-center bg-basecolor4 text-white [clip-path:inset(0_0_0_0)]" role="status" aria-label="Loading">
      <div data-logo className="relative aspect-250/47 w-56 sm:w-72 xl:w-87.5">
        <Image src="/images/organic-bps-logo.png" alt="Organic BPS" fill loading="eager" fetchPriority="high" sizes="350px" className="object-contain" />
      </div>
      <div data-meta className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-6 sm:px-10 sm:pb-10">
        <span className="text-sm tracking-[0.14em] text-white/60 uppercase sm:text-base">Purpose is the journey</span>
        <span data-count className="font-inter text-5xl font-bold tabular-nums sm:text-7xl xl:text-8xl">000</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.75 bg-white/10">
        <div data-bar className="h-full origin-left scale-x-0 bg-basecolor" />
      </div>
    </div>
  );
}
