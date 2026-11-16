"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/common/reveal";
import { cn } from "@/lib/utils";

const ctrl =
  "flex size-10 items-center justify-center rounded-full border border-basecolor16 bg-white text-basecolor7 transition-colors duration-300 hover:border-basecolor14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none";

export default function DistinctionsSlider({ items = [], label }) {
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
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={viewportRef}
        tabIndex={0}
        className="overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor3"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") embla?.scrollPrev();
          if (event.key === "ArrowRight") embla?.scrollNext();
        }}
      >
        <ul className="mt-12 -ml-4 flex touch-pan-y lg:mt-[calc(88*var(--u))] lg:-ml-[calc(38.8*var(--u))]">
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              as="li"
              variant="up"
              delay={0.1 * i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
              className={cn(
                "min-w-0 shrink-0 flex-[0_0_50%] pl-4 lg:flex-[0_0_25%] lg:pl-[calc(38.8*var(--u))]",
              )}
            >
              <div
                className={cn(
                  "group relative flex h-full flex-col items-center justify-center rounded-xl border border-basecolor11 bg-white py-6 text-center transition-colors duration-300 hover:border-basecolor19 hover:bg-basecolor18 motion-reduce:transition-none lg:h-[calc(222*var(--u))] lg:gap-[calc(8.6*var(--u))] lg:rounded-[calc(8.6*var(--u))] lg:border-0 lg:px-0 lg:py-0 lg:after:absolute lg:after:top-[calc(23*var(--u))] lg:after:-right-[calc(19.4*var(--u))] lg:after:h-[calc(167*var(--u))] lg:after:w-[2px] lg:after:bg-basecolor23",
                )}
              >
                <div className="size-15 aspect-square overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt=""
                    width={57}
                    height={57}
                    unoptimized
                    className="size-full object-contain"
                  />
                </div>
                <p
                  className={cn(
                    "text-base sm:text-xl font-bold text-basecolor20 transition-colors duration-300 group-hover:text-basecolor14 lg:text-[clamp(18px,calc(30.8*var(--u)),30.8px)]",
                  )}
                >
                  {item.title}
                </p>
                <p
                  className={cn(
                    "text-sm sm:text-base font-medium text-basecolor21 transition-colors duration-300 group-hover:text-basecolor14 lg:text-[clamp(14px,calc(25*var(--u)),25px)]",
                  )}
                >
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
      {snaps > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-3 lg:mt-[calc(30*var(--u))]">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => embla?.scrollPrev()}
            className={ctrl}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <div className="flex items-center">
            {Array.from({ length: snaps }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selected ? "true" : undefined}
                onClick={() => embla?.scrollTo(i)}
                className="group flex size-6 min-h-[24px] min-w-[24px] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-basecolor3"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none",
                    i === selected
                      ? "w-6 bg-basecolor14"
                      : "w-2 bg-basecolor16 group-hover:bg-basecolor9",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => embla?.scrollNext()}
            className={ctrl}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
