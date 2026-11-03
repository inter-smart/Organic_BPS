"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "@/lib/globe/globe.css";

export default function GlobeView({
  pins = [],
  className = "",
  label = "Interactive 3D globe showing partner locations worldwide",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let api = null;
    let disposed = false;
    let visible = false;
    let seen = false;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const hide = () => {
      if (!motion) return;
      gsap.killTweensOf(el);
      gsap.set(el, { scale: 0.55, opacity: 0, transformOrigin: "50% 50%" });
      if (api) {
        gsap.killTweensOf(api.globe.earthGroup.rotation);
        api.globe.earthGroup.rotation.y = Math.PI * 1.5;
      }
    };
    hide();

    const playIntro = () => {
      if (!api || !seen || !motion) return;
      gsap.to(el, {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(api.globe.earthGroup.rotation, {
        y: 0,
        duration: 2.6,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.3 && !seen) {
            seen = true;
            playIntro();
          } else if (!entry.isIntersecting && seen) {
            seen = false;
            hide();
          }
        }
      },
      { threshold: [0, 0.3] },
    );
    reveal.observe(el);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!api) return;
      if (visible) {
        if (!api.globe._raf) api.globe.start();
      } else api.globe.stop();
    });

    const boot = async () => {
      const { createGlobeComponent } = await import("@/lib/globe");
      if (disposed) return;
      try {
        const instance = await createGlobeComponent({
          container: el,
          pins,
          theme: "dark",
          showStars: false,
          showBloom: false,
          enableZoom: true,
        });
        if (disposed) {
          instance.destroy();
          return;
        }
        api = instance;
        if (!visible) api.globe.stop();
        if (seen) playIntro();
        else hide();
      } catch (err) {
        console.error("Globe failed to initialise", err);
        const status = el.querySelector(".globe-loader__status");
        if (status) status.textContent = "Globe unavailable";
      }
    };

    let booted = false;
    const bootOnce = () => {
      if (booted) return;
      booted = true;
      starter.disconnect();
      boot();
    };
    const starter = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && bootOnce(),
      { rootMargin: "600px" },
    );
    starter.observe(el);
    visibility.observe(el);

    const stopWheel = (e) => {
      e.stopPropagation();
      if (
        !document.documentElement.classList.contains("lenis") ||
        !e.cancelable
      )
        return;
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
  }, []);

  return (
    <div
      ref={ref}
      className={`globe ${className}`}
      role="region"
      aria-label={label}
      data-theme="dark"
    >
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
