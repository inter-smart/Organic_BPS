import Image from "next/image";
import { formatDate } from "@/lib/format-date";

/** One article tile in the listing grid. */
export default function ArticleCard({ article, labels }) {
  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_13px_40px_rgba(0,0,0,0.08)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(0,0,0,0.16)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:rounded-[calc(32*var(--u))]">
      <div className="relative aspect-[552/336.6] shrink-0 overflow-hidden">
        <Image
          src={article?.image?.src}
          alt={article?.image?.alt ?? ""}
          width={article?.image?.width}
          height={article?.image?.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-basecolor7/80 px-3.5 py-2 text-sm font-semibold text-white lg:bottom-[calc(24*var(--u))] lg:left-[calc(24*var(--u))] lg:px-[calc(14.7*var(--u))] lg:py-[calc(9.4*var(--u))] lg:text-[clamp(11px,calc(14.7*var(--u)),14.7px)]">
          {labels?.readTime?.replace("{n}", article?.readTime)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7 lg:gap-[calc(20*var(--u))] lg:px-[calc(34.7*var(--u))] lg:pt-[calc(34.7*var(--u))] lg:pb-[calc(37.4*var(--u))]">
        <p className="flex items-center gap-3 lg:gap-[calc(16*var(--u))]">
          <span className="text-xs font-bold tracking-[0.14em] text-basecolor14 uppercase lg:text-[clamp(11px,calc(16*var(--u)),16px)]">{article?.category}</span>
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-basecolor7/45 lg:size-[calc(5.3*var(--u))]" />
          <time dateTime={article?.date} className="text-sm text-basecolor9 lg:text-[clamp(12px,calc(17.4*var(--u)),17.4px)]">
            {formatDate(article?.date)}
          </time>
        </p>
        <h3 className="text-2xl/[1.14] font-bold tracking-[-0.015em] text-basecolor7 lg:text-[clamp(20px,calc(30*var(--u)),30px)]/[1.14]">{article?.title}</h3>
        <p className="text-base/[1.5] text-basecolor9 lg:text-[clamp(14px,calc(20*var(--u)),20px)]/[1.5]">{article?.summary}</p>
        <a
          href={article?.href}
          className="group mt-auto flex w-fit items-center gap-3 text-sm font-bold text-basecolor7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor3 lg:text-[clamp(13px,calc(17.4*var(--u)),17.4px)]"
        >
          {labels?.link}
          <Image src="/images/arrow-right-red.svg" alt="" width={20} height={20} className="size-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
        </a>
      </div>
    </article>
  );
}
