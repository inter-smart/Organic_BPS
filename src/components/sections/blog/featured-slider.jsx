"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Button from "@/components/common/button";
import { formatDate } from "@/lib/format-date";
import { renderTitle } from "@/components/common/rich-text";

export default function FeaturedSlider({ items = [], cta, labels }) {
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
    // the slide set can change after mount, so re-measure before syncing
    embla.reInit();
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => embla.off("select", sync).off("reInit", sync);
  }, [embla, items]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels?.label}
      className="mx-auto lg:max-w-[1576px]"
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div className="flex">
          {items.map((item, i) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
              inert={i !== selected}
              className="min-w-0 flex-[0_0_100%]"
            >
              <article className="grid gap-4 lg:grid-cols-[995fr_556fr] lg:gap-[1.6%]">
                <div className="relative aspect-[995/683] overflow-hidden rounded-3xl bg-basecolor5 lg:rounded-[calc(50*var(--u))]">
                  <Image
                    src={item.image?.src}
                    alt={item.image?.alt ?? ""}
                    title={item.image?.alt ?? ""}
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
                    {renderTitle(item.title)}
                  </h3>
                  <p className="mt-4 text-base/[1.55] text-basecolor2 lg:mt-[calc(20*var(--u))] lg:text-[clamp(14px,calc(17*var(--u)),17px)]/[1.55] 3xl:text-[17px]! lg:max-w-[80%]">
                    {item.summary}
                  </p>
                  <div className="mt-6 flex items-center gap-3 lg:mt-[calc(44*var(--u))]">
                    {item.author?.image?.src ? (
                      <Image
                        src={item.author.image.src}
                        alt={item.author.image.alt ?? ""}
                        title={item.author.image.alt ?? ""}
                        width={42}
                        height={42}
                        className="size-[42px] rounded-full object-cover"
                      />
                    ) : null}
                    <div>
                      <p className="text-sm font-semibold text-basecolor7">
                        {item.author?.name}
                      </p>
                      <p className="text-xs text-basecolor9">
                        {item.author?.role}
                      </p>
                    </div>
                  </div>
                  {item.href ? (
                    <div className="mt-6 lg:mt-[calc(46*var(--u))]">
                      <Button href={item.href}>
                        {cta?.label}
                        <span className="sr-only">: {item.title}</span>
                      </Button>
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
