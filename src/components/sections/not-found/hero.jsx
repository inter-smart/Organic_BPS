import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";

export default function Hero({ data }) {
  return (
    <section
      id="hero"
      aria-labelledby="not-found-title"
      className="relative isolate flex min-h-150 flex-col justify-center overflow-hidden bg-basecolor4 text-white lg:h-[calc(885*var(--u))]"
    >
      <Image src={data?.image?.src} alt={data?.image?.alt ?? ""} title={data?.image?.alt ?? ""} fill priority sizes="100vw" className="-z-10 object-cover object-[72%_center] lg:object-center" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-basecolor4/97 via-basecolor4/84 via-52% to-basecolor4/45" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 pt-32 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,548px)] lg:items-center lg:gap-x-8 lg:pt-[calc(60*var(--u))] lg:pb-0 lg:pr-[calc(84*var(--u))]">
          <div>
            <Reveal variant="blur" duration={1.1} immediate>
              <Heading as="h1" id="not-found-title" size="display" className="text-white lg:leading-[0.98] lg:tracking-[-0.03em]">
                {/* <RichLines lines={data?.title} /> */}
                {renderTitle(data?.title)}
              </Heading>
            </Reveal>
            <Reveal as="p" variant="up" delay={0.2} immediate className="mt-6 max-w-[542px] text-base/[1.5] font-medium text-pretty sm:text-lg/[1.5] lg:mt-[calc(30*var(--u))] lg:text-lead/[1.5]">
              {data?.text}
            </Reveal>
          </div>

          <ul className="grid gap-4 lg:gap-[calc(22*var(--u))]">
            {data?.cards?.map((card) => (
              <li key={card.id}>
                <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8 lg:min-h-[calc(320*var(--u))] lg:rounded-[calc(24*var(--u))] lg:p-[calc(32*var(--u))]">
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/8 lg:size-[calc(56*var(--u))]">
                      <Image src={card.icon} alt={card.eyebrow ?? "Icon"} title={card.eyebrow ?? "Icon"} width={24} height={24} className="size-6" />
                    </span>
                    <div>
                      <p className="text-xs font-bold tracking-[0.18em] text-basecolor8 uppercase lg:text-[clamp(11px,calc(14*var(--u)),14px)]">{card.eyebrow}</p>
                      <h2 className="mt-1.5 text-2xl/[1.25] font-bold text-white lg:text-[clamp(20px,calc(32*var(--u)),32px)]/[1.25]">{card.title}</h2>
                    </div>
                  </div>
                  <p className="mt-5 text-base/[1.55] font-medium text-white/80 lg:mt-[calc(20*var(--u))] lg:text-[clamp(14px,calc(18*var(--u)),18px)]/[1.55]">{card.text}</p>
                  <Link
                    href={card.cta.href}
                    className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-3 text-base font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/16 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none lg:mt-[calc(20*var(--u))] lg:px-[calc(20*var(--u))] lg:py-[calc(14*var(--u))] lg:text-[clamp(14px,calc(18*var(--u)),18px)]"
                  >
                    {card.cta.label}
                    <Image src="/images/not-found/arrow-right.svg" alt="Arrow right" title="Arrow right" width={18} height={18} className="size-[18px] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
