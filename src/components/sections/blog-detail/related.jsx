"use client";

import useEmblaCarousel from "embla-carousel-react";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import ArticleCard from "@/components/sections/blog/article-card";

/** "Related thinking": a looping Embla slider of article cards (3 across on desktop). */
export default function Related({ data, articles = [] }) {
  const [viewportRef] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <section
      id="related"
      aria-labelledby="related-title"
      className="bg-basecolor15 py-16 sm:py-20 lg:pt-[calc(93*var(--u))] lg:pb-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="lg:max-w-[962px]">
            <Reveal
              as="p"
              variant="fade"
              className="text-xs font-bold tracking-[0.16em] text-basecolor14 uppercase lg:text-[clamp(13px,calc(20*var(--u)),20px)]"
            >
              {data?.eyebrow}
            </Reveal>
            <Reveal variant="up" className="mt-3 lg:mt-[calc(35*var(--u))]">
              <Heading
                as="h2"
                id="related-title"
                size="display"
                className="text-basecolor7 lg:leading-[1.06] lg:tracking-[-0.023em] 2xl:text-[80px]! 3xl:text-[100px]! 2xl:max-w-[700px]! 3xl:max-w-[900px]!"
              >
                {data?.title}
              </Heading>
            </Reveal>
          </div>
          <Button href="/blog" className="lg:mb-[calc(40*var(--u))]">
            View More
          </Button>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Related perspectives"
          className="mt-10 lg:mt-[calc(66*var(--u))]"
        >
          <div
            ref={viewportRef}
            className="-mx-4 -my-12 overflow-hidden px-4 py-12"
          >
            <div className="-ml-4 flex lg:-ml-[calc(32*var(--u))]">
              {articles.map((article, i) => (
                <div
                  key={article.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${articles.length}`}
                  className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]! lg:pl-[calc(32*var(--u))]"
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
