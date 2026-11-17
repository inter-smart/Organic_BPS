"use client";

import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import Spinner from "@/components/common/spinner";
import ArticleCard from "@/components/sections/blog/article-card";
import { useBlogFilter } from "@/components/sections/blog/blog-filter";
import useBlogList from "@/components/sections/blog/use-blog-list";
import { cn } from "@/lib/utils";

const pill =
  "rounded-full border px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none lg:border-[1.3px] lg:px-[calc(22.7*var(--u))] lg:py-[calc(14.7*var(--u))] lg:text-[clamp(13px,calc(17.4*var(--u)),17.4px)]";

const errorText = "We couldn’t load the perspectives. Please try again.";
const emptyText =
  "No perspectives match your search yet. Try another topic or clear the search.";

/** "Latest thinking": topic filters, search and paged article grid, all served by the API. */
export default function Listing({ data }) {
  const { category, setCategory, query, setQuery } = useBlogFilter();
  const { list, status, loadMore } = useBlogList({
    initial: data.initial,
    category,
    search: query.trim(),
  });

  const shown = list.articles;
  const hasMore = list.page < list.lastPage;
  const loading = status === "loading";
  const failed = status === "error";
  const countLabel = loading
    ? "Loading perspectives"
    : `Showing ${shown.length} of ${list.total} perspectives`;

  return (
    <section
      id="latest-thinking"
      aria-labelledby="latest-title"
      className="relative scroll-mt-20 bg-basecolor15 py-16 sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="lg:max-w-[962px]">
            <Reveal
              as="p"
              variant="fade"
              className="text-xs font-bold tracking-[0.18em] text-basecolor14 uppercase lg:text-[clamp(12px,calc(17.4*var(--u)),17.4px)]"
            >
              {data.eyebrow}
            </Reveal>
            <Reveal variant="up" className="mt-3 lg:mt-[calc(16*var(--u))]">
              <Heading
                as="h2"
                id="latest-title"
                size="display"
                className="text-basecolor7 lg:leading-[1.25] lg:tracking-[-0.025em] 3xl:max-w-[900px]! 2xl:max-w-[700px] lg:max-w-[600px]"
              >
                {data.title}
              </Heading>
            </Reveal>
          </div>
          <p
            role="status"
            className="text-sm text-basecolor9 lg:text-[clamp(13px,calc(18.7*var(--u)),18.7px)]"
          >
            {countLabel}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:mt-[calc(58*var(--u))] lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter by topic"
            className="flex flex-wrap gap-2.5 lg:gap-[calc(13.4*var(--u))]"
          >
            {data.filters.items.map((item) => {
              const on = category === item.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCategory(item.slug)}
                  className={cn(
                    pill,
                    on
                      ? "border-basecolor14 bg-basecolor14 text-white"
                      : "border-basecolor16 bg-white text-basecolor7 hover:border-basecolor14 3xl:text-lg",
                  )}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 rounded-full border border-basecolor16 bg-white px-5 py-3 focus-within:border-basecolor3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-basecolor3 lg:w-[347px] lg:gap-[calc(13.4*var(--u))] lg:border-[1.3px] lg:px-[calc(22.7*var(--u))] lg:py-[calc(16*var(--u))]"
          >
            <Image
              src="/images/blog/search.svg"
              alt=""
              width={23}
              height={23}
              className="size-5 shrink-0 lg:size-[calc(22.7*var(--u))]"
            />
            <label htmlFor="blog-search" className="sr-only">
              Search perspectives
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search perspectives"
              className="min-w-0 flex-1 bg-transparent text-sm text-basecolor7 outline-none placeholder:text-basecolor9 lg:text-[clamp(13px,calc(17.4*var(--u)),17.4px)]"
            />
          </form>
        </div>

        {loading ? (
          <div className="mt-8 flex min-h-[320px] items-center justify-center lg:mt-[calc(59*var(--u))]">
            <Spinner />
          </div>
        ) : shown.length ? (
          <div className="mt-8 grid items-start gap-6 sm:grid-cols-2 lg:mt-[calc(59*var(--u))] lg:grid-cols-3! lg:gap-x-[calc(32*var(--u))] lg:gap-y-[calc(98*var(--u))]">
            {shown.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p
            role={failed ? "alert" : undefined}
            className="mt-12 text-center text-lg text-basecolor9 lg:mt-[calc(80*var(--u))]"
          >
            {failed ? errorText : emptyText}
          </p>
        )}
        {failed && shown.length ? (
          <p
            role="alert"
            className="mt-8 text-center text-base text-basecolor9"
          >
            {errorText}
          </p>
        ) : null}
        {hasMore && !loading ? (
          <div className="mt-12 flex justify-center lg:mt-[calc(58*var(--u))]">
            {status === "more" ? (
              <div className="flex h-12 items-center sm:h-14 lg:h-[calc(84*var(--u))]">
                <Spinner />
              </div>
            ) : (
              <Button onClick={loadMore}>View More</Button>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
