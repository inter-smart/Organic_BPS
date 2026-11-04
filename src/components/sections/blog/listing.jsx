"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import ArticleCard from "@/components/sections/blog/article-card";
import { useBlogFilter } from "@/components/sections/blog/blog-filter";
import { cn } from "@/lib/utils";

const pill =
  "rounded-full border px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none lg:border-[1.3px] lg:px-[calc(22.7*var(--u))] lg:py-[calc(14.7*var(--u))] lg:text-[clamp(13px,calc(17.4*var(--u)),17.4px)]";

/** "Latest thinking": topic filters, search and paged article grid. */
export default function Listing({ data }) {
  const { category: picked, setCategory, query, setQuery } = useBlogFilter();
  // an unknown topic in a shared link falls back to All
  const category = picked === "all" || data?.filters?.items?.includes(picked) ? picked : "all";
  const pageSize = data?.pageSize ?? 9;
  // any filter or search change starts again from the first page (state adjusted during render, no effect needed)
  const filterKey = `${category}|${query}`;
  const [limit, setLimit] = useState(pageSize);
  const [seenKey, setSeenKey] = useState(filterKey);
  if (seenKey !== filterKey) {
    setSeenKey(filterKey);
    setLimit(pageSize);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data?.articles ?? []).filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      return !q || [a.title, a.summary, a.category].some((t) => t.toLowerCase().includes(q));
    });
  }, [data?.articles, category, query]);

  const shown = filtered.slice(0, limit);

  return (
    <section id="latest-thinking" aria-labelledby="latest-title" className="relative scroll-mt-20 bg-basecolor15 py-16 sm:py-20 lg:py-[calc(100*var(--u))]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="lg:max-w-[962px]">
            <Reveal as="p" variant="fade" className="text-xs font-bold tracking-[0.18em] text-basecolor14 uppercase lg:text-[clamp(12px,calc(17.4*var(--u)),17.4px)]">
              {data?.eyebrow}
            </Reveal>
            <Reveal variant="up" className="mt-3 lg:mt-[calc(16*var(--u))]">
              <Heading as="h2" id="latest-title" size="display" className="text-basecolor7 lg:leading-[1.25] lg:tracking-[-0.025em]">
                {data?.title}
              </Heading>
            </Reveal>
          </div>
          <p role="status" className="text-sm text-basecolor9 lg:text-[clamp(13px,calc(18.7*var(--u)),18.7px)]">
            {data?.count?.replace("{shown}", shown.length).replace("{total}", filtered.length)}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:mt-[calc(58*var(--u))] lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label={data?.filters?.label} className="flex flex-wrap gap-2.5 lg:gap-[calc(13.4*var(--u))]">
            {["all", ...(data?.filters?.items ?? [])].map((item) => {
              const on = category === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCategory(item)}
                  className={cn(pill, on ? "border-basecolor14 bg-basecolor14 text-white" : "border-basecolor16 bg-white text-basecolor7 hover:border-basecolor14")}
                >
                  {item === "all" ? data?.filters?.all : item}
                </button>
              );
            })}
          </div>

          <form role="search" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3 rounded-full border border-basecolor16 bg-white px-5 py-3 focus-within:border-basecolor3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-basecolor3 lg:w-[347px] lg:gap-[calc(13.4*var(--u))] lg:border-[1.3px] lg:px-[calc(22.7*var(--u))] lg:py-[calc(16*var(--u))]">
            <Image src="/images/blog/search.svg" alt="" width={23} height={23} className="size-5 shrink-0 lg:size-[calc(22.7*var(--u))]" />
            <label htmlFor="blog-search" className="sr-only">
              {data?.search?.label}
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={data?.search?.placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-basecolor7 outline-none placeholder:text-basecolor9 lg:text-[clamp(13px,calc(17.4*var(--u)),17.4px)]"
            />
          </form>
        </div>

        {shown.length ? (
          <div className="mt-8 grid items-start gap-6 sm:grid-cols-2 lg:mt-[calc(59*var(--u))] lg:grid-cols-3 lg:gap-x-[calc(32*var(--u))] lg:gap-y-[calc(98*var(--u))]">
            {shown.map((article) => (
              <ArticleCard key={article.id} article={article} labels={data?.card} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-lg text-basecolor9 lg:mt-[calc(80*var(--u))]">{data?.empty}</p>
        )}

        {filtered.length > limit ? (
          <div className="mt-12 flex justify-center lg:mt-[calc(58*var(--u))]">
            <Button onClick={() => setLimit(limit + pageSize)}>{data?.loadMore}</Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
