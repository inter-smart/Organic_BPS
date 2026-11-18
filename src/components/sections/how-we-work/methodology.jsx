import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import FrameworkMechanism from "@/components/sections/how-we-work/framework-mechanism";
import FrameworkSteps from "@/components/sections/how-we-work/framework-steps";
import { paragraphs } from "@/lib/cms-text";

export default function Methodology({ data, section_two, methodologies }) {
  const items = [...(methodologies ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  return (
    <section
      id="methodology"
      aria-labelledby="methodology-title"
      className="px-4 py-16 text-center sm:py-20 lg:py-[calc(100*var(--u))] bg-[#F6F6F6]"
    >
      <Reveal
        as="p"
        variant="fade"
        className="text-sm font-bold tracking-[0.19em] text-basecolor14 uppercase lg:text-[clamp(13px,calc(20*var(--u)),20px)]"
      >
        {section_two?.title}
      </Reveal>
      <Reveal
        variant="up"
        className="mt-5 lg:mt-[calc(80*var(--u))] 3xl:mt-7.5"
      >
        <Heading
          as="h2"
          id="methodology-title"
          size="display"
          className="mx-auto max-w-[9.81em] text-wrap text-basecolor25"
        >
          {/* <RichText segments={data?.title} /> */}
          {renderTitle(section_two?.subtitle)}
        </Heading>
      </Reveal>
      <Reveal
        as="p"
        variant="up"
        delay={0.1}
        className="mx-auto mt-6 max-w-[955px] text-base/[1.65] font-medium text-pretty text-basecolor2 lg:text-lead/[1.5]"
      >
        {paragraphs(section_two?.description)}
      </Reveal>

      <FrameworkMechanism
        items={items}
        label={data?.mechanism?.label}
        scrollLabel={data?.mechanism?.scrollLabel}
      />
      <FrameworkSteps items={items} label={data?.steps?.label} />
    </section>
  );
}
