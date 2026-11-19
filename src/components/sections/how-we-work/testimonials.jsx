import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import TestimonialsSlider from "@/components/sections/how-we-work/testimonials-slider";

export default function Testimonials({ section_five, testimonials, data }) {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-black py-16 text-white sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <Reveal
          as="p"
          variant="fade"
          className="text-sm font-bold tracking-[0.19em] text-basecolor uppercase lg:text-[clamp(13px,calc(20*var(--u)),20px)]"
        >
          {section_five?.title}
        </Reveal>
        <Reveal variant="up" className="my-4 lg:my-[calc(40*var(--u))]">
          <Heading
            as="h2"
            id="testimonials-title"
            size="display"
            className="text-white"
          >
            {/* <RichText segments={data?.title} /> */}
            {renderTitle(section_five?.description)}
          </Heading>
        </Reveal>
        <TestimonialsSlider items={testimonials} labels={data?.slider} />
      </div>
    </section>
  );
}
