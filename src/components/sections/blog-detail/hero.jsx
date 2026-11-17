import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { formatDate } from "@/lib/format-date";

export default function Hero({ data }) {
  return (
    <section
      id="article-hero"
      aria-labelledby="article-title"
      className="relative overflow-hidden bg-basecolor4 pt-32 pb-12 text-white lg:pt-[calc(214*var(--u))] lg:pb-[calc(88*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <Reveal
          as="p"
          variant="fade"
          immediate
          className="text-base text-white/70 lg:text-[clamp(14px,calc(20*var(--u)),20px)]"
        >
          <time dateTime={data?.date}>
            {formatDate(data?.date, { long: true })}
          </time>{" "}
          · {data?.readTime} min read
        </Reveal>
        <Reveal
          variant="blur"
          duration={1.1}
          immediate
          className="mt-3 lg:mt-[calc(9*var(--u))]"
        >
          <Heading
            as="h1"
            id="article-title"
            size="display"
            className="text-white lg:max-w-[1402px] lg:leading-[1.12] lg:tracking-[-0.02em] 3xl:text-[100px]!"
          >
            {data?.title}
            {data?.accent ? (
              <span className="text-basecolor">{data.accent}</span>
            ) : null}
          </Heading>
        </Reveal>
        <Reveal
          as="p"
          variant="up"
          delay={0.2}
          immediate
          className="mt-5 max-w-[840px] text-base/[1.5] text-pretty text-white/75 sm:text-lg/[1.5] lg:mt-[calc(22*var(--u))] lg:text-[clamp(15px,calc(21*var(--u)),21px)]/[1.5]"
        >
          {data?.summary}
        </Reveal>

        <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/9] lg:mt-[calc(80*var(--u))] lg:aspect-[1716/840] lg:rounded-[calc(43.35*var(--u))]">
          <Image
            src={data?.image?.src}
            alt={data?.image?.alt ?? ""}
            fill
            priority
            sizes="(min-width: 1024px) 90vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent from-20% to-black/72" />
          <p className="absolute top-4 left-4 flex items-center gap-3 rounded-full bg-basecolor7/85 px-4 py-2.5 text-xs font-bold tracking-[0.1em] uppercase lg:top-[calc(43.35*var(--u))] lg:left-[calc(43.35*var(--u))] lg:gap-[calc(12.2*var(--u))] lg:px-[calc(21.7*var(--u))] lg:py-[calc(13.5*var(--u))] lg:text-[clamp(11px,calc(16.3*var(--u)),16.3px)]">
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full bg-basecolor lg:size-[calc(10.8*var(--u))]"
            />
            {data?.badge}
          </p>
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 lg:inset-x-[calc(43.35*var(--u))] lg:bottom-[calc(43.35*var(--u))]">
            <p className="max-w-[637px] text-base/[1.4] font-semibold text-pretty sm:text-xl/[1.4] lg:text-[clamp(16px,calc(24.4*var(--u)),24.4px)]/[1.4]">
              {data?.caption}
            </p>
            <a
              href="#article"
              aria-label="Scroll to the article"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-basecolor14 transition-transform duration-300 hover:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none lg:size-[calc(70.4*var(--u))]"
            >
              <Image
                src="/images/blog/scroll-down.svg"
                alt=""
                width={27}
                height={27}
                className="size-5 lg:size-[calc(27*var(--u))]"
              />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:mt-[calc(43*var(--u))] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 lg:gap-[calc(15.5*var(--u))]">
            <Image
              src={data?.author?.imageLarge?.src}
              alt={data?.author?.imageLarge?.alt ?? ""}
              width={60}
              height={60}
              className="size-12 rounded-full object-cover lg:size-[calc(59.5*var(--u))]"
            />
            <div>
              <p className="text-base font-semibold lg:text-[clamp(14px,calc(18.1*var(--u)),18.1px)]">
                {data?.author?.name}
              </p>
              <p className="text-sm text-white/65 lg:text-[clamp(12px,calc(15.5*var(--u)),15.5px)]">
                {data?.author?.role}
              </p>
            </div>
          </div>
          <ul
            aria-label="Topics"
            className="flex flex-wrap gap-2.5 lg:gap-[calc(12.9*var(--u))]"
          >
            {data?.topics?.map((topic) => (
              <li key={topic}>
                <Link
                  href={`/blog#topic=${encodeURIComponent(topic)}`}
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none lg:gap-[calc(9*var(--u))] lg:px-[calc(18.1*var(--u))] lg:py-[calc(12.9*var(--u))] lg:text-[clamp(13px,calc(15.5*var(--u)),15.5px)]"
                >
                  {topic}
                  <Image
                    src="/images/blog/arrow-up-right.svg"
                    alt=""
                    width={15}
                    height={15}
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
