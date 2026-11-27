import Image from "next/image";
import Heading from "@/components/common/heading";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { paragraphs } from "@/lib/cms-text";

export default function FounderBio({ data }) {
  return (
    <section
      id="founder"
      aria-labelledby="founder-bio-title"
      className="relative isolate overflow-hidden bg-white lg:flex lg:min-h-[calc(900*var(--u))]"
    >
      {/* oversized brand word running up the left edge */}
      <span
        aria-hidden="true"
        data-text="Organic BPS"
        className="pointer-events-none absolute bottom-0 left-[calc(26*var(--u))] -z-10 hidden rotate-180 text-[calc(135*var(--u))]/[1] font-bold tracking-[-0.02em] whitespace-nowrap text-basecolor/20 select-none before:content-[attr(data-text)] [writing-mode:vertical-rl] lg:block"
      ></span>

      <div className="container mx-auto px-4 flex flex-col justify-end">
        <div className="relative grid items-end gap-8 pt-16 lg:grid-cols-[7fr_12fr] lg:items-stretch lg:gap-0 lg:pt-0">
          <Reveal
            variant="right"
            duration={1.1}
            className="relative order-2 mx-auto aspect-2191/1910 w-full max-w-xl lg:order-1 lg:mx-0 lg:w-[600px] 2xl:w-200 lg:max-w-none lg:self-end"
          >
            <Parallax
              className="absolute inset-0"
              from={10}
              to={0}
              scale={1}
              end="center center"
            >
              {data?.image ? (
                <Image
                  src={data.image}
                  alt={data?.name || "Our founder"}
                  title={data?.name || "Our founder"}
                  fill
                  sizes="(min-width: 1280px) 45vw, 90vw"
                  className="object-contain object-bottom"
                />
              ) : null}
            </Parallax>
          </Reveal>

          <div className="order-1 lg:order-2 lg:self-center lg:py-[80px] 2xl:py-30">
            <Reveal variant="up">
              <Heading
                as="h2"
                id="founder-bio-title"
                size="display"
                className="text-basecolor2 lg:text-[clamp(40px,calc(88*var(--u)),88px)] lg:whitespace-nowrap"
              >
                {data?.name}
              </Heading>
            </Reveal>
            <Reveal
              as="p"
              variant="fade"
              delay={0.1}
              className="mt-3 text-xs font-medium tracking-[0.3em] text-basecolor uppercase lg:mt-[calc(14*var(--u))] lg:text-eyebrow"
            >
              {data?.designation}
            </Reveal>
            <div className="mt-5 space-y-5 text-base/[1.7] font-medium text-basecolor2 sm:text-lg/[1.7] lg:mt-[calc(40*var(--u))] lg:space-y-[calc(30*var(--u))] lg:text-body">
              {paragraphs(data?.message).map((p, i) => (
                <Reveal
                  as="p"
                  key={i}
                  variant="up"
                  delay={0.08 * (i + 1)}
                  className="text-pretty lg:max-w-[780px]"
                >
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
