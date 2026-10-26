import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function Founder({ data }) {
  return (
    <section id="who-we-are" aria-labelledby="founder-title" className="relative isolate overflow-hidden bg-black text-white xl:h-270">
      <div className="container mx-auto px-4 relative z-10 py-16 sm:py-20 xl:flex xl:h-full xl:items-center xl:py-0">
        <div className="xl:max-w-[50%] 2xl:max-w-[56%]">
          <Reveal variant="up">
            <Heading as="h2" id="founder-title" size="display" className="text-white">
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <Reveal as="p" variant="fade" delay={0.1} className="mt-3 text-sm font-medium tracking-[0.14em] text-basecolor uppercase xl:mt-6 xl:text-lead xl:tracking-[0.14em]">
            {data?.role}
          </Reveal>
          <div className="mt-4 space-y-5 text-base/[1.8] font-medium text-white sm:text-lg/[1.8] xl:mt-6 xl:space-y-8 xl:text-lead/[2]">
            {data?.paragraphs?.map((p, i) => (
              <Reveal as="p" key={i} variant="up" delay={0.1 * (i + 1)} className="text-pretty">
                {p}
              </Reveal>
            ))}
          </div>
          <Reveal variant="up" delay={0.3} className="mt-7 xl:mt-8">
            <p className="text-2xl/[1.4] font-bold sm:text-3xl/[1.4] xl:text-title/[1.4]">
              <RichLines lines={data?.tagline} />
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.4} className="mt-7 xl:mt-11">
            <Button href={data?.cta?.href} variant="dark">
              {data?.cta?.label}
            </Button>
          </Reveal>
        </div>
      </div>

      {/* portrait — bleeds off the bottom-right edge on xl+, stacked below the copy on smaller screens */}
      <Reveal
        variant="right"
        duration={1.1}
        className="relative mx-auto aspect-1095/955 w-full max-w-2xl xl:absolute xl:right-[2.6%] xl:bottom-0 xl:mx-0 xl:w-[57%] xl:max-w-none"
      >
        <Image src="/images/founder-portrait.png" alt={data?.photoAlt} fill sizes="(min-width: 1200px) 57vw, 100vw" className="object-contain object-bottom" />
      </Reveal>
    </section>
  );
}
