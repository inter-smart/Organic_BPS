"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import ArticleCard from "@/components/sections/blog/article-card";
import { cn } from "@/lib/utils";

const ctrl =
  "flex size-10 items-center justify-center rounded-full border border-basecolor16 bg-white text-basecolor7 transition-colors duration-300 hover:border-basecolor14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none";

/** "Related thinking": a looping Embla slider of article cards (3 across on desktop). */
export default function Related({ data, articles = [] }) {
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
    <section id="related" aria-labelledby="related-title" className="bg-basecolor15 py-16 sm:py-20 lg:pt-[calc(93*var(--u))] lg:pb-[calc(100*var(--u))]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="lg:max-w-[962px]">
            <Reveal as="p" variant="fade" className="text-xs font-bold tracking-[0.16em] text-basecolor14 uppercase lg:text-[clamp(13px,calc(20*var(--u)),20px)]">
              {data?.eyebrow}
            </Reveal>
            <Reveal variant="up" className="mt-3 lg:mt-[calc(35*var(--u))]">
              <Heading as="h2" id="related-title" size="display" className="text-basecolor7 lg:leading-[1.06] lg:tracking-[-0.023em]">
                {data?.title}
              </Heading>
            </Reveal>
          </div>
          <Button href={data?.cta?.href} className="lg:mb-[calc(40*var(--u))]">
            {data?.cta?.label}
          </Button>
        </div>

        <div role="region" aria-roledescription="carousel" aria-label={data?.slider?.label} className="mt-10 lg:mt-[calc(66*var(--u))]">
          <div ref={viewportRef} className="-mx-4 -my-12 overflow-hidden px-4 py-12">
            <div className="-ml-4 flex lg:-ml-[calc(32*var(--u))]">
              {articles.map((article, i) => (
                <div
                  key={article.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${articles.length}`}
                  className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] lg:pl-[calc(32*var(--u))]"
                >
                  <ArticleCard article={article} labels={data?.card} />
                </div>
              ))}
            </div>
          </div>

          {snaps > 1 ? (
            <div className="mt-6 flex items-center justify-center gap-3 lg:mt-[calc(30*var(--u))]">
              <button type="button" aria-label={data?.slider?.prev} onClick={() => embla?.scrollPrev()} className={ctrl}>
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <div className="flex items-center">
                {Array.from({ length: snaps }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${data?.slider?.goTo} ${i + 1}`}
                    aria-current={i === selected ? "true" : undefined}
                    onClick={() => embla?.scrollTo(i)}
                    className="group flex size-6 min-h-[24px] min-w-[24px] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-basecolor3"
                  >
                    <span className={cn("block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none", i === selected ? "w-6 bg-basecolor14" : "w-2 bg-basecolor16 group-hover:bg-basecolor9")} />
                  </button>
                ))}
              </div>
              <button type="button" aria-label={data?.slider?.next} onClick={() => embla?.scrollNext()} className={ctrl}>
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
