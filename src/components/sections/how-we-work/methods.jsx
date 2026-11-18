import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichText, renderTitle } from "@/components/common/rich-text";
import { emphasisSegments } from "@/lib/cms-text";
import PurposeMap from "@/components/sections/how-we-work/purpose-map";

export default function Methods({ data, section_three, brand_pillers }) {
  if (!section_three) return null;

  return (
    <section id="methods" aria-labelledby="methods-title" className="px-4 py-16 sm:py-20 lg:py-[calc(100*var(--u))] lg:pr-[calc(41*var(--u))] lg:pl-[calc(38*var(--u))]">
      <div className="grid items-start gap-12 lg:grid-cols-[718fr_913fr] lg:gap-x-12">
        <PurposeMap
          data={data?.map}
          items={brand_pillers}
          logo={section_three.logo}
        />

        <div className="lg:pt-[calc(95*var(--u))]">
          <Reveal variant="up">
            <Heading as="h2" id="methods-title" size="display" className="text-basecolor2 lg:leading-[1.05]">
              {renderTitle(section_three.title)}
            </Heading>
          </Reveal>
          <hr className="mt-6 w-[283px] border-t border-basecolor16 lg:mt-[calc(8*var(--u))]" />
          <Reveal as="p" variant="up" delay={0.1} className="mt-6 max-w-[738px] text-lg/[1.45] text-pretty text-basecolor2 lg:mt-[calc(24*var(--u))] lg:text-[clamp(16px,calc(25*var(--u)),25px)]/[1.44]">
            <RichText segments={emphasisSegments(section_three.description)} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
