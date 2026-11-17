import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import InsightSlider from "@/components/common/insight-slider";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import { cta, text } from "@/lib/cms-text";

export default function PurposeInsights({ data, blogs, title }) {
  const button = cta(data);

  return (
    <section
      id="insights"
      aria-labelledby="insights-title"
      className="relative overflow-hidden bg-black py-16 text-white sm:py-20 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-0">
          <Reveal variant="up">
            <Heading
              as="h2"
              id="insights-title"
              size="display"
              className="text-white"
            >
              {/* <RichLines lines={title} /> */}
              {renderTitle(title)}
            </Heading>
          </Reveal>
          <div className="lg:pt-4 lg:pl-[calc(132.8*var(--u))]">
            <Reveal
              as="p"
              variant="up"
              delay={0.15}
              className="text-base/[1.9] font-medium text-white sm:text-lg/[1.9] lg:max-w-181.75 lg:text-lead/[2.15] text-pretty"
            >
              {text(data.description)}
            </Reveal>
            <Reveal variant="up" delay={0.3} className="mt-6 lg:mt-4">
              <Button href={button.href} variant="dark">
                {button.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal variant="up" delay={0.2} className="mt-10 lg:mt-11">
        <InsightSlider items={blogs} />
      </Reveal>
    </section>
  );
}
