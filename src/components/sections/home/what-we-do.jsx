import HiStage from "@/components/common/hi-stage";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import HiMedia from "@/components/common/hi-media";
import Reveal from "@/components/common/reveal";
import { RichText, renderTitle } from "@/components/common/rich-text";
import { cta, segmentParagraphs } from "@/lib/cms-text";

export default function WhatWeDo({ data, title }) {
  const button = cta(data);

  return (
    <HiStage
      id="what-we-do"
      aria-labelledby="what-we-do-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:items-center lg:py-0"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[834fr_690fr] 2xl:grid-cols-[834fr_690fr] lg:gap-27">
          <div
            data-hi
            className="will-change-transform lg:self-stretch lg:flex lg:items-center"
          >
            <HiMedia video={data.video} className="lg:h-full lg:aspect-auto" />
          </div>
          <div data-copy>
            <Reveal variant="up">
              <Heading
                as="h2"
                id="what-we-do-title"
                size="display"
                className="text-basecolor2"
              >
                {/* <RichLines lines={title} /> */}
                {renderTitle(title)}
              </Heading>
            </Reveal>
            <div className="mt-6 space-y-5 text-base/[1.6] font-medium text-basecolor2 sm:text-lg/[1.6] lg:mt-8 lg:space-y-7 lg:text-lead/[1.5]">
              {segmentParagraphs(data.description).map((p, i) => (
                <Reveal
                  as="p"
                  key={i}
                  variant="up"
                  delay={0.1 * (i + 1)}
                  className="text-pretty"
                >
                  <RichText segments={p} />
                </Reveal>
              ))}
            </div>
            <Reveal variant="up" delay={0.45} className="mt-8 lg:mt-11">
              <Button href={button.href}>{button.label}</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </HiStage>
  );
}
