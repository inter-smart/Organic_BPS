import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function CareersCta({ data }) {
  return (
    <section
      id="careers"
      aria-labelledby="careers-title"
      className="relative bg-basecolor py-16 text-white sm:py-20 lg:flex lg:min-h-[calc(327*var(--u))] lg:items-center lg:py-0"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:gap-10">
          <Reveal variant="up">
            <Heading
              as="h2"
              id="careers-title"
              size="display"
              className="text-white"
            >
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <Reveal variant="up" delay={0.15} className="sm:text-left">
            <p className="font-medium text-white text-sm lg:text-lead">
              {data?.text}
            </p>
            <a
              href={`mailto:${data?.email}`}
              className="mt-2 inline-block text-xl font-medium underline hover:text-white/85 lg:mt-[calc(10*var(--u))] lg:text-title"
            >
              {data?.email}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
