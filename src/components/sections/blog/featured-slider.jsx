"use client";
import Image from "next/image";
import Fade from "embla-carousel-fade";
import { formatDate } from "@/lib/format-date";
import Button from "@/components/common/button";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

function rng(seed) {
  let a = Math.floor(seed * 4294967296);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickRandom(items, seed) {
  const random = rng(seed);
  const groups = new Map();
  items.forEach((item) =>
    groups.set(item.category, [...(groups.get(item.category) ?? []), item]),
  );
  const picks = [...groups.values()].map(
    (g) => g[Math.floor(random() * g.length)],
  );
  for (let i = picks.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [picks[i], picks[j]] = [picks[j], picks[i]];
  }
  return picks;
}

let clientSeed;
const subscribe = () => () => {};
const getClientSeed = () => (clientSeed ??= Math.random());
const getServerSeed = () => 0;

const ctrl =
  "flex size-10 items-center justify-center rounded-full border border-basecolor16 bg-white text-basecolor7 transition-colors duration-300 hover:border-basecolor14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none";

export default function FeaturedSlider({ items = [], author, cta, labels }) {
  const seed = useSyncExternalStore(subscribe, getClientSeed, getServerSeed);
  const slides = useMemo(
    () => (seed ? pickRandom(items, seed) : items),
    [items, seed],
  );
  const [selected, setSelected] = useState(0);
  const [viewportRef, embla] = useEmblaCarousel(
    {
      loop: true,
      duration: 40,
      breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
    },
    [Fade()],
  );

  useEffect(() => {
    if (!embla) return;
    const sync = () => setSelected(embla.selectedScrollSnap());
    embla.reInit();
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => embla.off("select", sync).off("reInit", sync);
  }, [embla, slides]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels?.label}
      className="mx-auto lg:max-w-[1576px]"
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((item, i) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
              inert={i !== selected}
              className="min-w-0 flex-[0_0_100%]"
            >
              <article className="grid gap-4 lg:grid-cols-[995fr_556fr] lg:gap-[1.6%]">
                <div className="relative aspect-[995/683] overflow-hidden rounded-3xl bg-basecolor5 lg:rounded-[calc(50*var(--u))]">
                  <Image
                    src={item.image?.src}
                    alt={item.image?.alt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col rounded-3xl bg-basecolor15 p-6 sm:p-8 lg:rounded-[calc(50*var(--u))] lg:pt-[calc(48*var(--u))] lg:pr-[calc(54*var(--u))] lg:pb-[calc(67*var(--u))] lg:pl-[calc(54*var(--u))] lg:p-[30px]! 2xl:p-[40px]! 3xl:p-[50px]!">
                  <p className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold tracking-[0.14em] text-basecolor14 uppercase">
                      {item.category}
                    </span>
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-basecolor7/45"
                    />
                    <span className="text-xs text-basecolor9 lg:text-[clamp(12px,calc(13*var(--u)),13px)]">
                      <time dateTime={item.date}>
                        {formatDate(item.date, { long: true })}
                      </time>{" "}
                      · {item.readTime} min read
                    </span>
                  </p>
                  <h3 className="mt-4 text-3xl/[1.08] font-bold tracking-[-0.02em] text-balance text-basecolor7 lg:mt-[calc(20*var(--u))] lg:text-[clamp(26px,calc(44*var(--u)),44px)]/[1.08] 3xl:text-[44px]!">
                    {item.title}
                    {item.accent ? (
                      <span className="text-basecolor">{item.accent}</span>
                    ) : null}
                  </h3>
                  <p className="mt-4 text-base/[1.55] text-basecolor2 lg:mt-[calc(20*var(--u))] lg:text-[clamp(14px,calc(17*var(--u)),17px)]/[1.55] 3xl:text-[17px]! lg:max-w-[80%]">
                    {item.summary}
                  </p>
                  <div className="mt-6 flex items-center gap-3 lg:mt-[calc(44*var(--u))]">
                    <Image
                      src={author?.image?.src}
                      alt={author?.image?.alt ?? ""}
                      width={42}
                      height={42}
                      className="size-[42px] rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-basecolor7">
                        {author?.name}
                      </p>
                      <p className="text-xs text-basecolor9">{author?.role}</p>
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-[calc(46*var(--u))]">
                    <Button href={item.href}>
                      {cta?.label}
                      <span className="sr-only">
                        : {item.title}
                        {item.accent}
                      </span>
                    </Button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
