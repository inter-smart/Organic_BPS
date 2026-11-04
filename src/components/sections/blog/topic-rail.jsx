"use client";

import Image from "next/image";
import { useBlogFilter } from "@/components/sections/blog/blog-filter";

/** Banner topic links: picking one filters the listing and scrolls down to it. */
export default function TopicRail({ data }) {
  const { category, selectTopic } = useBlogFilter();

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/13 py-6 lg:h-[calc(118*var(--u))] lg:flex-nowrap lg:gap-x-[calc(163*var(--u))] lg:py-0 lg:pl-[calc(76*var(--u))]">
      <p className="w-full text-xs font-bold tracking-[0.16em] text-basecolor8 uppercase lg:w-auto lg:text-[clamp(11px,calc(13*var(--u)),13px)]">
        {data?.label}
      </p>
      {data?.items?.map((topic) => (
        <button
          key={topic}
          type="button"
          aria-pressed={category === topic}
          onClick={() => selectTopic(topic)}
          className="group flex items-center gap-2.5 rounded-sm text-base font-medium text-white transition-opacity duration-300 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none lg:text-[clamp(14px,calc(16*var(--u)),16px)]"
        >
          {topic}
          <Image src="/images/blog/arrow-up-right.svg" alt="" width={14} height={14} className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </button>
      ))}
    </div>
  );
}
