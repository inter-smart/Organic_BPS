import HiStage from "@/components/common/hi-stage";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import HiMedia from "@/components/common/hi-media";
import Reveal from "@/components/common/reveal";
import { RichLines, RichText } from "@/components/common/rich-text";

export default function WhatWeDo({ data }) {
  return (
    <HiStage id="what-we-do" aria-labelledby="what-we-do-title" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:items-center lg:py-0">
      <div className="container mx-auto px-4 grid items-center gap-10 lg:grid-cols-[834fr_690fr] lg:gap-27">
        <div data-hi className="will-change-transform">
          <HiMedia video={data?.media?.video} poster={data?.media?.poster} alt={data?.media?.alt} className="mx-auto max-w-md lg:max-w-none" />
        </div>

        <div data-copy>
          <Reveal variant="up">
            <Heading as="h2" id="what-we-do-title" size="display" className="text-basecolor2">
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <div className="mt-6 space-y-5 text-base/[1.6] font-medium text-basecolor2 sm:text-lg/[1.6] lg:mt-8 lg:space-y-7 lg:text-lead/[1.5]">
            {data?.paragraphs?.map((p, i) => (
              <Reveal as="p" key={i} variant="up" delay={0.1 * (i + 1)} className="text-pretty">
                <RichText segments={p} />
              </Reveal>
            ))}
          </div>
          <Reveal variant="up" delay={0.45} className="mt-8 lg:mt-11">
            <Button href={data?.cta?.href}>{data?.cta?.label}</Button>
          </Reveal>
        </div>
      </div>
    </HiStage>
  );
}
