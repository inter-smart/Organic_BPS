import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import { cta, text } from "@/lib/cms-text";

export default function Cta({ data, title }) {
  return (
    <section
      id="put-purpose-to-work"
      aria-labelledby="why-purpose-cta-title"
      className="relative isolate flex flex-col items-center overflow-hidden bg-basecolor4 px-4 py-20 text-center text-white sm:py-24 lg:min-h-[calc(833*var(--u))] lg:pt-[calc(270*var(--u))] lg:pb-[calc(194*var(--u))]"
    >
      <Image
        src={data?.image}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/70" />

      <Reveal variant="up">
        <Heading
          as="h2"
          id="why-purpose-cta-title"
          size="display"
          className="text-white lg:leading-[1.08]"
        >
          {renderTitle(title)}
        </Heading>
      </Reveal>
      <Reveal
        as="p"
        variant="up"
        delay={0.1}
        className="mt-5 max-w-[517px] text-base/[1.75] text-pretty lg:mt-[calc(20*var(--u))] lg:text-lead/[1.75]"
      >
        {text(data?.description)}
      </Reveal>
      <Reveal
        variant="up"
        delay={0.2}
        className="mt-8 lg:mt-[calc(40*var(--u))]"
      >
        <Button href={cta(data).href} variant="dark">
          {cta(data).label}
        </Button>
      </Reveal>
    </section>
  );
}
