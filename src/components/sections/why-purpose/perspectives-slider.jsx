"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/common/reveal";
import { cn } from "@/lib/utils";

const ctrl =
  "flex size-10 items-center justify-center rounded-full border border-basecolor16 bg-white text-basecolor7 transition-colors duration-300 hover:border-basecolor14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none";

/** Looping Embla slider of article cards: 1 across on mobile, 2 on sm, 3 on lg. */
export default function PerspectivesSlider({ items = [], labels }) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const sync = () => {
      setSnaps(embla.scrollSnapList().length);
      setSelected(embla.selectedScrollSnap());
    };
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => embla.off("select", sync).off("reInit", sync);
  }, [embla]);

  return (
    <Reveal variant="up" delay={0.1} role="region" aria-roledescription="carousel" aria-label={labels?.label} className="mx-auto mt-10 lg:mt-[calc(32*var(--u))] lg:max-w-[calc(1132*var(--u))]">
      <div ref={viewportRef} className="-mx-4 -my-12 overflow-hidden px-4 py-12">
        <div className="-ml-6 flex lg:-ml-[calc(26*var(--u))]">
          {items.map((item, i) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
              className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] lg:pl-[calc(26*var(--u))]"
            >
              <article className="group/card flex h-full flex-col overflow-hidden rounded-[10px] bg-basecolor22 transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(0,0,0,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:min-h-[calc(512*var(--u))] lg:rounded-[calc(10*var(--u))]">
                <div className="aspect-[360/198] overflow-hidden rounded-lg">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 font-roboto lg:px-[calc(26*var(--u))] lg:pt-[calc(31*var(--u))] lg:pb-[calc(32*var(--u))]">
                  <h3 className="text-xl/[1.22] font-bold text-basecolor20 lg:text-[clamp(18px,calc(22*var(--u)),22px)]">{item.title}</h3>
                  <p className="mt-4 text-base/[1.35] text-basecolor21 lg:mt-[calc(23*var(--u))] lg:text-[clamp(14px,calc(20*var(--u)),20px)]">{item.summary}</p>
                  <a
                    href={item.cta.href}
                    className="group mt-6 flex w-fit items-center gap-4 text-base font-semibold text-basecolor14 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor3 lg:mt-auto lg:pt-[calc(24*var(--u))] lg:text-[clamp(14px,calc(18*var(--u)),18px)]"
                  >
                    {item.cta.label}
                    <span className="sr-only">: {item.title}</span>
                    <Image src="/images/why-purpose/arrow-right-red.svg" alt="" width={20} height={20} className="size-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {snaps > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-3 lg:mt-[calc(30*var(--u))]">
          <button type="button" aria-label={labels?.prev} onClick={() => embla?.scrollPrev()} className={ctrl}>
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <div className="flex items-center">
            {Array.from({ length: snaps }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${labels?.goTo} ${i + 1}`}
                aria-current={i === selected ? "true" : undefined}
                onClick={() => embla?.scrollTo(i)}
                className="group flex size-6 min-h-[24px] min-w-[24px] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-basecolor3"
              >
                <span className={cn("block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none", i === selected ? "w-6 bg-basecolor14" : "w-2 bg-basecolor16 group-hover:bg-basecolor9")} />
              </button>
            ))}
          </div>
          <button type="button" aria-label={labels?.next} onClick={() => embla?.scrollNext()} className={ctrl}>
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      ) : null}
    </Reveal>
  );
}
