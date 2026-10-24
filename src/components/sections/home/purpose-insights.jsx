import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import InsightSlider from "@/components/common/insight-slider";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function PurposeInsights({ data }) {
  return (
    <section id="insights" aria-labelledby="insights-title" className="relative overflow-hidden bg-black py-16 text-white sm:py-20 xl:flex xl:h-270 xl:flex-col xl:justify-center xl:py-0">
      <div className="container grid gap-6 xl:grid-cols-2 xl:items-start xl:gap-0">
        <Reveal variant="up">
          <Heading as="h2" id="insights-title" size="display" className="text-white">
            <RichLines lines={data?.title} />
          </Heading>
        </Reveal>
        <div className="xl:pt-4 xl:pl-[8.3rem]">
          <Reveal as="p" variant="up" delay={0.15} className="text-base/[1.9] font-medium text-white sm:text-lg/[1.9] xl:max-w-181.75 xl:text-lead/[2.15] text-pretty">
            {data?.text}
          </Reveal>
          <Reveal variant="up" delay={0.3} className="mt-6 xl:mt-4">
            <Button href={data?.cta?.href} variant="dark">
              {data?.cta?.label}
            </Button>
          </Reveal>
        </div>
      </div>

      <Reveal variant="up" delay={0.2} className="mt-10 xl:mt-11">
        <InsightSlider items={data?.items} />
      </Reveal>
    </section>
  );
}
