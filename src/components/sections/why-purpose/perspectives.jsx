import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichText } from "@/components/common/rich-text";
import PerspectivesSlider from "@/components/sections/why-purpose/perspectives-slider";
import { parseTitle } from "@/lib/utils";
import { text } from "@/lib/cms-text";

export default function Perspectives({ data, slider, items }) {
  return (
    <section
      id="perspectives"
      aria-labelledby="perspectives-title"
      className="bg-white py-16 sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="lg:pl-[calc(40*var(--u))]">
          <Reveal
            as="p"
            variant="fade"
            className="font-roboto text-sm font-bold tracking-[0.04em] text-basecolor14 uppercase lg:text-[clamp(14px,calc(21*var(--u)),21px)]/[1.28]"
          >
            {text(data?.title)}
          </Reveal>
          <Reveal variant="up" className="mt-4 lg:mt-[calc(25*var(--u))]">
            <Heading
              as="h2"
              id="perspectives-title"
              size="display"
              className="font-roboto text-basecolor25 tracking-normal lg:max-w-[calc(1229*var(--u))] lg:leading-[1.18]"
            >
              <RichText segments={parseTitle(data?.description)[0]} />
            </Heading>
          </Reveal>
        </div>

        <PerspectivesSlider items={items} labels={slider} />
      </div>
    </section>
  );
}
