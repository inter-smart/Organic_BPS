import Image from "next/image";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import { text } from "@/lib/cms-text";

export default function Moments({ data, items = [], title }) {
  return (
    <section
      id="valuable-moments"
      aria-labelledby="moments-title"
      className="relative isolate overflow-hidden bg-basecolor4 py-16 text-white sm:py-20 lg:min-h-[calc(1080*var(--u))] lg:pt-[calc(258*var(--u))] lg:pb-[calc(100*var(--u))]"
    >
      <Image
        src={data?.image}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/65 lg:bg-black/[.51]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-32% to-black"
      />

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[761fr_959fr] lg:items-start lg:gap-0">
          <div>
            <Reveal variant="up">
              <Heading
                as="h2"
                id="moments-title"
                size="display"
                className="text-white tracking-normal lg:leading-none"
              >
                {renderTitle(title, "text-basecolor17")}
              </Heading>
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.1}
              className="mt-6 text-base/[1.28] lg:mt-[calc(29*var(--u))] lg:text-lead/[1.28]"
            >
              {text(data?.description)}
            </Reveal>
          </div>

          <ol className="grid gap-x-[calc(96*var(--u))] sm:grid-cols-2 lg:mt-[calc(181*var(--u))] lg:max-w-[calc(900*var(--u))]">
            {items.map((item, i) => (
              <Reveal
                key={item.id}
                as="li"
                variant="up"
                delay={0.08 * i}
                className="flex gap-6 border-b border-white/[.21] py-5 lg:min-h-[calc(124*var(--u))] lg:gap-[calc(48*var(--u))] lg:py-[calc(22*var(--u))]"
              >
                <span className="min-w-14 text-4xl font-medium text-basecolor17 lg:min-w-[calc(76*var(--u))] lg:text-value/[1.15]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base/[1.33] lg:max-w-[285px] lg:text-lead/[1.33]">
                  {item.title}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
