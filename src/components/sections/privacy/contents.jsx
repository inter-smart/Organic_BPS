"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** "On this page" card; the highlighted entry follows the policy section currently in view. */
export default function Contents({ data, items = [] }) {
  const name = data?.name;
  const [active, setActive] = useState(items?.[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const heads = items.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!heads.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let current = heads[0].id;
      heads.forEach((h) => {
        if (h.getBoundingClientRect().top <= line) current = h.id;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <div className="rounded-3xl border border-basecolor13 bg-basecolor12 p-6 shadow-[0_17px_52px_rgba(0,0,0,0.08)] sm:p-8 lg:rounded-[calc(26*var(--u))] lg:px-[calc(40.4*var(--u))] lg:pt-[calc(40.4*var(--u))] lg:pb-[calc(43.3*var(--u))]">
      <div className="flex items-center justify-between pb-5 lg:pb-[calc(28.9*var(--u))]">
        <p className="text-sm font-bold tracking-[0.14em] text-basecolor7 uppercase lg:text-[clamp(14px,calc(20.2*var(--u)),20.2px)]">
          On this page
        </p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="policy-contents-list"
          aria-label={`${open ? "Collapse" : "Expand"} ${name.toLowerCase()} contents`}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center rounded-full p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 min-[992px]:hidden"
        >
          <Image src="/images/icon-list.svg" alt="Contents list" title="Contents list" width={26} height={26} className="size-5" />
        </button>
        <Image src="/images/icon-list.svg" alt="Contents list" title="Contents list" width={26} height={26} className="hidden min-[992px]:block lg:size-[calc(26*var(--u))]" />
      </div>

      <nav id="policy-contents-list" aria-label={`${name} contents`} className={cn(!open && "max-[992px]:hidden")}>
        <ol>
          {items.map((s, i) => {
            const on = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-4 border-b py-3.5 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none lg:gap-[calc(17.3*var(--u))] lg:py-[calc(15.9*var(--u))]",
                    on ? "border-basecolor" : "border-basecolor11"
                  )}
                >
                  <span
                    className={cn(
                      "w-8 shrink-0 text-sm font-bold lg:w-[calc(34.7*var(--u))] lg:text-[clamp(12px,calc(15.9*var(--u)),15.9px)]",
                      on ? "text-basecolor14" : "text-basecolor9"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-base/[1.3] lg:text-[clamp(14px,calc(20.2*var(--u)),20.2px)]/[1.3]",
                      on ? "font-bold text-basecolor7" : "font-medium text-basecolor9"
                    )}
                  >
                    {s.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="pt-6 lg:pt-[calc(34.7*var(--u))]">
        <p className="text-base font-bold text-basecolor14 lg:text-[clamp(14px,calc(18.8*var(--u)),18.8px)]">{data?.note?.title}</p>
        <p className="mt-2 text-base/[1.5] text-basecolor9 lg:mt-[calc(11.6*var(--u))] lg:text-[clamp(14px,calc(18.8*var(--u)),18.8px)]/[1.5]">
          {data?.note?.text}
        </p>
      </div>
    </div>
  );
}
