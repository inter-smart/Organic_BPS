import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines, RichText } from "@/components/common/rich-text";
import TimelineSlider from "@/components/common/timeline-slider";

export default function OurStory({ data }) {
  return (
    <section
      id="our-story"
      aria-labelledby="our-story-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:min-h-[min(100svh,1080px)] lg:flex-col lg:justify-center lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-0">
        <Reveal variant="up">
          <Heading as="h2" id="our-story-title" size="display" className="text-basecolor2 lg:max-w-[900px] lg:text-[clamp(40px,calc(88*var(--u)),88px)]">
            <RichLines lines={data?.title} />
          </Heading>
        </Reveal>
        <div className="lg:pt-[calc(8*var(--u))] lg:pl-[calc(72*var(--u))]">
          <Reveal as="p" variant="fade" className="text-xs font-medium tracking-[0.3em] text-basecolor uppercase lg:text-eyebrow">
            {data?.eyebrow}
          </Reveal>
          <div className="mt-4 space-y-5 text-base/[1.7] font-medium text-basecolor2 sm:text-lg/[1.7] lg:mt-[calc(34*var(--u))] lg:space-y-[calc(30*var(--u))] lg:text-body">
            {data?.paragraphs?.map((segments, i) => (
              <Reveal as="p" key={i} variant="up" delay={0.1 * (i + 1)} className="text-pretty lg:max-w-[735px]">
                <RichText segments={segments} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal variant="up" delay={0.2} className="mt-10 lg:mt-[calc(60*var(--u))]">
        <TimelineSlider items={data?.timeline} />
      </Reveal>
    </section>
  );
}
