import AwardSlider from "@/components/common/award-slider";
import Heading from "@/components/common/heading";
import NumberTicker from "@/components/common/number-ticker";
import Reveal from "@/components/common/reveal";
import { RichLines, renderTitle } from "@/components/common/rich-text";
import { figure } from "@/lib/cms-text";
import { parseTitle } from "@/lib/utils";

const title =
  "Recognised for<br>strategic & creative<br><span>excellence</span>";

export default function Recognition({ data, awards }) {
  const count = figure(data?.count);

  return (
    <section
      id="recognition"
      aria-labelledby="recognition-title"
      className="relative overflow-hidden bg-white py-[40px_20px] sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-0">
          <div>
            <Reveal
              as="p"
              variant="fade"
              className="text-xs font-medium tracking-[0.3em] text-basecolor uppercase lg:text-eyebrow"
            >
              {data?.title}
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <Heading
                as="h2"
                id="recognition-title"
                size="display"
                className="mt-3 text-basecolor2 lg:mt-[calc(14*var(--u))] lg:text-[clamp(40px,calc(80*var(--u)),80px)]"
              >
                {/* <RichLines lines={title} /> */}
                {renderTitle(data?.subtitle)}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:pl-[calc(150*var(--u))]">
            <Reveal variant="up" delay={0.15}>
              <p className="text-figure font-bold tracking-[-0.02em] text-basecolor">
                <NumberTicker
                  value={count.value}
                  suffix={count.suffix}
                  duration={2.4}
                />
              </p>
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.25}
              className="mt-4 text-base/[1.7] font-medium text-basecolor2 sm:text-lg/[1.7] lg:mt-[calc(30*var(--u))] lg:max-w-[510px] lg:text-body"
            >
              <RichLines lines={parseTitle(data?.description)} />
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-[calc(60*var(--u))]">
        <AwardSlider items={awards} />
      </div>
    </section>
  );
}
