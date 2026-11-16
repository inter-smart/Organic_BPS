import Image from "next/image";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";
import { paragraphs } from "@/lib/cms-text";
import DistinctionsSlider from "@/components/sections/why-purpose/distinctions-slider";

export default function Definition({ data, statements, title, label }) {
  return (
    <section
      id="what-is-purpose"
      aria-labelledby="what-is-title"
      className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[580fr_1140fr] lg:items-center lg:gap-0">
          <Reveal variant="up">
            <Heading
              as="h2"
              id="what-is-title"
              size="display"
              className="text-basecolor25 tracking-normal lg:leading-[0.89]"
            >
              <RichLines lines={title} />
            </Heading>
          </Reveal>
          <div className="space-y-5 lg:space-y-[calc(29*var(--u))] lg:border-l-[3px] lg:border-[#F0F0F0] lg:pl-[calc(100*var(--u))]">
            {paragraphs(data?.description).map((p, i) => (
              <Reveal
                key={i}
                as="p"
                variant="up"
                delay={0.1 * (i + 1)}
                className="text-base/[1.6] text-basecolor25 sm:text-lg/[1.6] lg:max-w-[1005px] lg:text-lead/[1.44]"
              >
                {p}
              </Reveal>
            ))}
          </div>
        </div>
        <DistinctionsSlider items={statements} label={label} />
      </div>
    </section>
  );
}
