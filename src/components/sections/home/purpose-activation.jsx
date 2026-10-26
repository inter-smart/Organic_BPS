import Image from "next/image";
import Button from "@/components/common/button";
import Reveal from "@/components/common/reveal";
import TextReveal from "@/components/common/text-reveal";

function RadioIcon() {
  return (
    <span aria-hidden="true" className="relative block size-5 shrink-0 sm:size-6 xl:size-6.25">
      <Image src="/images/radio-outer.svg" alt="" fill className="object-contain" />
      <span className="absolute inset-[28%]">
        <Image src="/images/radio-inner.svg" alt="" fill className="object-contain" />
      </span>
    </span>
  );
}

export default function PurposeActivation({ data }) {
  return (
    <section
      id="how-we-do"
      aria-labelledby="purpose-activation-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 xl:flex xl:h-270 xl:flex-col xl:items-center xl:justify-center xl:py-0"
    >
      <div className="container mx-auto px-4">
        <TextReveal
          as="h2"
          lines={data?.lines}
          className="text-center text-3xl/[1.4] font-bold tracking-[-0.02em] sm:text-5xl/[1.4] md:text-6xl/[1.4] lg:text-7xl/[1.4] xl:text-display/[1.411]"
        />
        <Reveal variant="up" delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 xl:mt-26 xl:gap-5">
          {data?.links?.map((link) => (
            <Button key={link?.id} href={link?.href} arrow={false} className="font-semibold tracking-[-0.02em]">
              <span className="flex items-center gap-3 xl:gap-4">
                <RadioIcon />
                {link?.label}
              </span>
            </Button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
