import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import { paragraphs } from "@/lib/cms-text";

export default function Cta({ section_seven }) {
  return (
    <section
      id="lets-talk"
      aria-labelledby="how-we-work-cta-title"
      className="relative isolate flex flex-col items-center overflow-hidden bg-basecolor4 px-4 py-20 text-center text-white sm:py-24 lg:py-[calc(200*var(--u))]"
    >
      <Image src={section_seven?.image} alt={section_seven?.title} fill sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/70" />

      <Reveal as="p" variant="fade" className="text-sm font-bold tracking-[0.19em] text-basecolor8 uppercase lg:text-[clamp(13px,calc(20*var(--u)),20px)]">
        {section_seven?.title}
      </Reveal>
      <Reveal variant="up" className="mt-3 lg:mt-[calc(10*var(--u))]">
        <Heading as="h2" id="how-we-work-cta-title" size="display" className="text-white lg:leading-[1.2]">
          {/* <RichLines lines={data?.title} /> */}
          {renderTitle(section_seven?.subtitle)}
        </Heading>
      </Reveal>
      <Reveal as="p" variant="up" delay={0.1} className="mt-5 max-w-[765px] text-base/[1.6] text-pretty lg:mt-[calc(44*var(--u))] lg:text-[clamp(16px,calc(26*var(--u)),26px)]/[1.54]">
        {paragraphs(section_seven?.description)}
      </Reveal>
      <Reveal variant="up" delay={0.2} className="mt-8 lg:mt-[calc(72*var(--u))]">
        <Button href={section_seven?.button_link} variant="dark">
          {section_seven?.button_name}
        </Button>
      </Reveal>
    </section>
  );
}
