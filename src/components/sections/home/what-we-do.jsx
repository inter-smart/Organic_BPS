import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import HiMedia from "@/components/common/hi-media";
import Reveal from "@/components/common/reveal";
import { RichLines, RichText } from "@/components/common/rich-text";

export default function WhatWeDo({ data }) {
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="relative overflow-hidden bg-white py-16 sm:py-20 xl:flex xl:h-270 xl:items-center xl:py-0">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[834fr_690fr] xl:gap-27">
        <HiMedia video={data?.media?.video} poster={data?.media?.poster} alt={data?.media?.alt} className="mx-auto max-w-md lg:max-w-none" />

        <div>
          <Reveal variant="up">
            <Heading as="h2" id="what-we-do-title" size="display" className="text-basecolor2">
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <div className="mt-6 space-y-5 text-base/[1.6] font-medium text-basecolor2 sm:text-lg/[1.6] xl:mt-8 xl:space-y-7 xl:text-lead/[1.5]">
            {data?.paragraphs?.map((p, i) => (
              <Reveal as="p" key={i} variant="up" delay={0.1 * (i + 1)} className="text-pretty">
                <RichText segments={p} />
              </Reveal>
            ))}
          </div>
          <Reveal variant="up" delay={0.45} className="mt-8 xl:mt-11">
            <Button href={data?.cta?.href}>{data?.cta?.label}</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
