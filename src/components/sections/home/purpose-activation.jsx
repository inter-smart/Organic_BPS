import Image from "next/image";
import Button from "@/components/common/button";
import Reveal from "@/components/common/reveal";
import TextReveal from "@/components/common/text-reveal";
import { link, revealLines } from "@/lib/cms-text";

function RadioIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative block size-5 shrink-0 sm:size-6 lg:size-6.25"
    >
      <Image
        src="/images/radio-outer.svg"
        alt="Outer radio ring"
        title="Outer radio ring"
        fill
        className="object-contain"
      />
      <span className="absolute inset-[28%]">
        <Image
          src="/images/radio-inner.svg"
          alt="Inner radio ring"
          title="Inner radio ring"
          fill
          className="object-contain"
        />
      </span>
    </span>
  );
}
export default function PurposeActivation({ data }) {
  return (
    <section
      id="how-we-do"
      aria-labelledby="purpose-activation-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:h-259 lg:flex-col lg:items-center lg:justify-center lg:py-0"
    >
      <div className="container mx-auto px-4">
        <TextReveal
          as="h2"
          lines={revealLines(data.title)}
          from="#8e8e8e"
          className="text-center text-3xl/[1.4] font-bold tracking-[-0.02em] sm:text-5xl/[1.4] md:text-6xl/[1.4] lg:text-display/[1.411]"
        />
        <Reveal
          variant="up"
          delay={0.1}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:mt-26 lg:gap-5"
        >
          {data.description?.map((item, i) => (
            <Button
              key={i}
              href={link(item.link)}
              arrow={false}
              className="font-semibold tracking-[-0.02em]"
            >
              <span className="flex items-center gap-3 lg:gap-4">
                <RadioIcon />
                {item.title}
              </span>
            </Button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
