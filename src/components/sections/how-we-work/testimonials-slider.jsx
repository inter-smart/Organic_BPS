"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/common/reveal";
import TestimonialCard from "@/components/common/testimonial-card";
import { cn } from "@/lib/utils";

const ctrl =
  "flex size-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-300 hover:border-basecolor focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none";

/** Embla slider of testimonial cards: 1 across below lg, 2 across on lg. Controls only show when there is more to scroll to. */
export default function TestimonialsSlider({ items = [], labels }) {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
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
    <Reveal variant="up" delay={0.1} role="region" aria-roledescription="carousel" aria-label={labels?.label} className="mt-6 lg:mt-[calc(40*var(--u))]">
      <div ref={viewportRef} className="-mx-4 -my-12 overflow-hidden px-4 py-12">
        <div className="-ml-6 flex lg:-ml-[91px]">
          {items.map((item, i) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
              className="min-w-0 flex-[0_0_100%] pl-6 lg:flex-[0_0_50%] lg:pl-[91px]"
            >
              <TestimonialCard
                quote={item.quote}
                name={item.name}
                role={item.role}
                logo={item.logo}
              />
            </div>
          ))}
        </div>
      </div>

      {snaps > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
          <button
            type="button"
            aria-label={labels?.prev}
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
                aria-label={`${labels?.goTo} ${i + 1}`}
                aria-current={i === selected ? "true" : undefined}
                onClick={() => embla?.scrollTo(i)}
                className="group flex size-6 min-h-[24px] min-w-[24px] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-basecolor3"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none",
                    i === selected
                      ? "w-6 bg-basecolor"
                      : "w-2 bg-white/40 group-hover:bg-white/70",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={labels?.next}
            onClick={() => embla?.scrollNext()}
            className={ctrl}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      ) : null}
    </Reveal>
  );
}
