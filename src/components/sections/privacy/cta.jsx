import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";

export default function Cta({ data }) {
  return (
    <section
      id="privacy-contact"
      aria-labelledby="privacy-cta-title"
      className="bg-basecolor14 py-16 text-white sm:py-20 lg:py-[calc(81*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-[1214fr_506fr] lg:items-start lg:gap-0">
          <Reveal variant="up">
            <Heading
              as="h2"
              id="privacy-cta-title"
              size="displayMd"
              className="text-white lg:max-w-[650px] lg:text-[clamp(32px,calc(68*var(--u)),68px)]/[1.02] lg:tracking-[-0.02em]"
            >
              {data?.title}
            </Heading>
          </Reveal>
          <Reveal variant="up" delay={0.15} className="lg:pt-[calc(15*var(--u))]">
            <p className="text-base/[1.5] font-medium text-white sm:text-lg/[1.5] lg:max-w-[460px]">{data?.text}</p>
            <a
              href={`mailto:${data?.email}`}
              className="mt-5 inline-block text-xl font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:mt-[calc(20*var(--u))] lg:text-[clamp(18px,calc(27*var(--u)),27px)]"
            >
              {data?.email}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
