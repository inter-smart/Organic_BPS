import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import FeaturedSlider from "@/components/sections/blog/featured-slider";
import Listing from "@/components/sections/blog/listing";

const cta = { label: "Read more" };
const slider = { label: "Featured perspectives" };

/** Featured slider followed by the filterable listing. */
export default function Insights({ featured, listing }) {
  return (
    <>
      <section
        id="featured"
        aria-labelledby="featured-title"
        className="relative bg-white py-16 sm:py-20 lg:py-[calc(100*var(--u))]"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto text-center">
            <Reveal
              as="p"
              variant="fade"
              className="text-xs font-bold tracking-[0.19em] text-basecolor14 uppercase lg:text-[clamp(13px,calc(20*var(--u)),20px)]"
            >
              {featured?.eyebrow}
            </Reveal>
            <Reveal variant="up" className="mt-3 lg:mt-[calc(10*var(--u))]">
              <Heading
                as="h2"
                id="featured-title"
                size="display"
                className="text-basecolor7 lg:leading-[1.12] lg:tracking-[-0.02em] 3xl:text-[100px]!"
              >
                {/* <RichLines lines={featured?.title} /> */}
                {renderTitle(featured?.title)}
              </Heading>
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.15}
              className="mx-auto mt-5 max-w-[677px] text-base/[1.5] font-medium text-pretty text-basecolor2 sm:text-lg/[1.5] lg:mt-[calc(19*var(--u))] lg:text-lead/[1.5] 3xl:text-xl!"
            >
              {featured?.text}
            </Reveal>
          </div>
          <div className="mt-10 lg:mt-[calc(152*var(--u))] 3xl:mt-37.5">
            <FeaturedSlider
              items={featured?.items}
              cta={cta}
              labels={slider}
            />
          </div>
        </div>
      </section>

      <Listing data={listing} />
    </>
  );
}
