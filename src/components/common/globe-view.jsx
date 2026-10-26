"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "@/lib/globe/globe.css";

/**
 * Interactive 3D globe (three.js) with partner pins. Booted the first time it nears the viewport,
 * and its render loop pauses whenever it is scrolled out of view.
 * Intro: once it is ready and scrolled into view it scales in and spins from a turned-away angle round to the
 * default view, then the normal auto-rotate takes over.
 */
export default function GlobeView({ pins = [], className = "", label = "Interactive 3D globe showing partner locations worldwide" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let api = null;
    let disposed = false;
    let visible = false;
    let seen = false;
    let played = false;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motion) gsap.set(el, { scale: 0.55, opacity: 0, transformOrigin: "50% 50%" });

    const playIntro = () => {
      if (played || !api || !seen) return;
      played = true;
      if (!motion) return;
      gsap.to(el, { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out", clearProps: "transform,opacity" });
      gsap.fromTo(api.globe.earthGroup.rotation, { y: Math.PI * 1.5 }, { y: 0, duration: 2.6, ease: "power3.out" });
    };

    const reveal = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen = true;
        reveal.disconnect();
        playIntro();
      },
      { threshold: 0.3 }
    );
    reveal.observe(el);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!api) return;
      if (visible) {
        if (!api.globe._raf) api.globe.start();
      }
      else api.globe.stop();
    });

    const boot = async () => {
      const { createGlobeComponent } = await import("@/lib/globe");
      if (disposed) return;
      try {
        const instance = await createGlobeComponent({ container: el, pins, theme: "dark", showStars: false, showBloom: false, enableZoom: true });
        if (disposed) {
          instance.destroy();
          return;
        }
        api = instance;
        if (!visible) api.globe.stop();
        playIntro();
      } catch (err) {
        console.error("Globe failed to initialise", err);
        const status = el.querySelector(".globe-loader__status");
        if (status) status.textContent = "Globe unavailable";
      }
    };

    const starter = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          starter.disconnect();
          boot();
        }
      },
      { rootMargin: "400px" }
    );
    starter.observe(el);
    visibility.observe(el);

    // Pinch zoom stays; wheel zoom is blocked so the page keeps scrolling over the globe. Lenis owns page scroll,
    // so the wheel is re-sent to it (swallowing it left native and smooth scroll fighting = stuck/jumpy page).
    const stopWheel = (e) => {
      e.stopPropagation();
      if (!document.documentElement.classList.contains("lenis") || !e.cancelable) return;
      e.preventDefault();
      window.dispatchEvent(new WheelEvent("wheel", e));
    };
    el.addEventListener("wheel", stopWheel, { capture: true });

    return () => {
      el.removeEventListener("wheel", stopWheel, { capture: true });
      disposed = true;
      starter.disconnect();
      visibility.disconnect();
      reveal.disconnect();
      gsap.killTweensOf(el);
      api?.destroy();
    };
    // pins are static page data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={`globe ${className}`} role="region" aria-label={label} data-theme="dark">
      <div className="globe-loader">
        <div className="globe-loader__spinner" aria-hidden="true" />
        <div className="globe-loader__track">
          <div className="globe-loader__bar" />
        </div>
        <p className="globe-loader__status">Loading globe…</p>
      </div>
    </div>
  );
}
