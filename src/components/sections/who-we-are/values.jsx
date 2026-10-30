import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";
import ValueCards from "@/components/common/value-cards";

export default function Values({ data }) {
  return (
    <section id="values" aria-labelledby="values-title" className="relative overflow-hidden bg-basecolor7 py-16 text-white sm:py-20 lg:flex lg:h-svh lg:items-center lg:py-0">
      <div className="container mx-auto px-4 grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-2 lg:gap-0">
        <div className="lg:pl-[calc(60*var(--u))]">
          <Reveal variant="up">
            <Heading as="h2" id="values-title" size="display" className="text-white">
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <Reveal
            as="p"
            variant="up"
            delay={0.15}
            className="mt-5 text-base/[1.7] font-medium text-white sm:text-lg/[1.7] lg:mt-[calc(50*var(--u))] lg:max-w-[calc(360*var(--u))] lg:text-body"
          >
            {data?.text}
          </Reveal>
        </div>
        <div className="lg:justify-self-end">
          <ValueCards items={data?.items} />
        </div>
      </div>
    </section>
  );
}
