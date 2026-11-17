import Heading from "@/components/common/heading";
import PartnerLogoGrid from "@/components/common/partner-logo-grid";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";

export default function Clients({ data }) {
  return (
    <section
      id="relationships"
      aria-labelledby="relationships-title"
      className="overflow-x-clip bg-white py-16 sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-10 lg:grid-cols-[907fr_813fr] lg:gap-x-0">
          <div>
            <Reveal
              as="p"
              variant="fade"
              className="text-sm font-bold tracking-[0.19em] text-basecolor14 uppercase lg:text-[clamp(13px,calc(20*var(--u)),20px)]"
            >
              {data?.eyebrow}
            </Reveal>
            <Reveal variant="up" className="mt-4 lg:mt-[calc(17*var(--u))]">
              <Heading
                as="h2"
                id="relationships-title"
                size="display"
                className="text-basecolor25"
              >
                {/* <RichLines lines={data?.title} /> */}
                {renderTitle(data?.title)}
              </Heading>
            </Reveal>
            <div className="mt-8 max-w-[680px] space-y-5 text-base/[1.65] font-medium text-pretty text-basecolor2 lg:mt-[calc(42*var(--u))] lg:space-y-[calc(30*var(--u))] lg:text-lead/[1.5]">
              {data?.copy?.map((paragraph, i) => (
                <Reveal as="p" key={i} variant="up" delay={0.08 * i}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
          <PartnerLogoGrid logos={data?.logos} label={data?.logosLabel} bleed />
        </div>
      </div>
    </section>
  );
}
