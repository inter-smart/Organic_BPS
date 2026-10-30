import Image from "next/image";
import Heading from "@/components/common/heading";
import HeroMedia from "@/components/common/hero-media";
import NumberTicker from "@/components/common/number-ticker";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function Hero({ data }) {
  return (
    <section id="hero" aria-labelledby="who-hero-title" className="relative isolate flex h-svh min-h-150 flex-col justify-center overflow-hidden bg-basecolor4 text-white">
      <Parallax className="absolute inset-0 -z-10" from={0} to={25} scale={1} start="top top" end="bottom top">
        <HeroMedia slides={data?.slides} />
      </Parallax>

      <div className="container mx-auto px-4 relative grid grid-cols-[minmax(0,1fr)] gap-10 pt-28 pb-24 lg:grid-cols-2 lg:items-center lg:gap-0 lg:pt-30 lg:pb-0">
        <Reveal variant="blur" duration={1.1} immediate>
          <Heading as="h1" id="who-hero-title" size="display" className="text-white">
            <RichLines lines={data?.title} />
          </Heading>
        </Reveal>

        <div className="lg:pl-[calc(9*var(--u))]">
          <div className="space-y-6 text-base/[1.6] font-medium text-white sm:text-lg/[1.6] lg:space-y-[calc(36*var(--u))] lg:text-intro">
            {data?.paragraphs?.map((p, i) => (
              <Reveal as="p" key={i} variant="up" delay={0.2 + 0.15 * i} className="text-pretty lg:max-w-[calc(660*var(--u))]">
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delay={0.55} className="mt-8 lg:mt-[calc(50*var(--u))]">
            <dl className="flex w-full divide-x divide-white/30 border border-white/40 bg-black/10 py-4 backdrop-blur-[2px] lg:max-w-[calc(659*var(--u))] lg:py-[calc(33*var(--u))]">
              {data?.stats?.map((s) => (
                <div key={s?.id} className="flex flex-col-reverse px-3 first:pl-4 max-sm:flex-1 sm:px-5 lg:px-[calc(36*var(--u))] lg:first:pl-[calc(24*var(--u))]">
                  <dt className="text-[11px] font-medium tracking-[0.1em] text-white/90 sm:whitespace-nowrap uppercase sm:text-xs lg:mt-[calc(8*var(--u))] lg:text-[clamp(11px,calc(18*var(--u)),18px)]">
                    {s?.label}
                  </dt>
                  <dd className="text-base/[1.2] font-medium uppercase sm:whitespace-nowrap sm:text-2xl/[1.2] lg:text-[clamp(16px,calc(34*var(--u)),34px)]/[1.2]">
                    {s?.value ? <NumberTicker value={s.value} suffix={s?.suffix} duration={2.2} /> : s?.text}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <a
          href={data?.scroll?.href}
          aria-label={data?.scroll?.label}
          className="absolute right-4 bottom-0 hidden size-12 items-center justify-center sm:flex lg:-bottom-14 lg:right-0"
        >
          <span className="relative block aspect-[50/14.7] w-10 rotate-90 animate-[bob_2.4s_ease-in-out_infinite] lg:w-12.25 motion-reduce:animate-none">
            <Image src="/images/arrow-down.svg" alt="" fill className="object-contain" />
          </span>
        </a>
      </div>
    </section>
  );
}
