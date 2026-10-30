import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";
import Venn from "@/components/common/venn";

export default function CoreBelief({ data }) {
  return (
    <section
      id="core-belief"
      aria-labelledby="core-belief-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:min-h-[calc(975*var(--u))] lg:items-center lg:py-0"
    >
      <div className="container mx-auto px-4 grid items-center gap-12 lg:grid-cols-2 lg:gap-0">
        <div>
          <Reveal as="p" variant="fade" className="text-xs font-medium tracking-[0.3em] text-basecolor uppercase lg:text-eyebrow">
            {data?.eyebrow}
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <Heading as="h2" id="core-belief-title" size="display" className="mt-3 text-basecolor2 lg:mt-[calc(14*var(--u))] lg:text-[clamp(40px,calc(88*var(--u)),88px)]">
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <div className="mt-6 space-y-5 text-base/[1.7] font-medium text-basecolor2 sm:text-lg/[1.7] lg:mt-[calc(60*var(--u))] lg:space-y-[calc(30*var(--u))] lg:text-body">
            {data?.paragraphs?.map((p, i) => (
              <Reveal as="p" key={i} variant="up" delay={0.15 * (i + 1)} className="text-pretty lg:max-w-[calc(640*var(--u))]">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-md sm:max-w-xl lg:max-w-none lg:w-[calc(860*var(--u))] lg:justify-self-end">
          <Venn label={data?.diagramLabel} />
        </div>
      </div>
    </section>
  );
}
