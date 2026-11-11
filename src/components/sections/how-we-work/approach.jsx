import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";
import TextReveal from "@/components/common/text-reveal";

export default function Approach({ data }) {
  return (
    <section id="our-approach" aria-labelledby="approach-title" className="bg-white py-16 text-center sm:py-20 lg:py-[calc(100*var(--u))]">
      <div className="container mx-auto px-4">
        <Reveal as="p" variant="fade" className="text-sm font-bold tracking-[0.19em] text-basecolor14 uppercase lg:text-[clamp(13px,calc(20*var(--u)),20px)]">
          {data?.eyebrow}
        </Reveal>
        <Reveal variant="up" className="mt-5 lg:mt-[calc(60*var(--u))]">
          <Heading as="h2" id="approach-title" size="display" className="text-basecolor25">
            <RichLines lines={data?.title} />
          </Heading>
        </Reveal>
        <Reveal as="p" variant="up" delay={0.1} className="mx-auto mt-6 max-w-[1130px] text-base/[1.65] font-medium text-pretty text-basecolor2 lg:text-lead/[1.5]">
          {data?.copy}
        </Reveal>
        <TextReveal
          as="p"
          from="#8a8a8a"
          lines={data?.tagline}
          className="mx-auto mt-10 max-w-[761px] text-2xl/[1.37] font-bold tracking-[-0.02em] sm:text-3xl/[1.37] lg:mt-[calc(68*var(--u))] lg:text-[clamp(24px,calc(36.85*var(--u)),36.85px)]/[1.367]"
        />
      </div>
    </section>
  );
}
