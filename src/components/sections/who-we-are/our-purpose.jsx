import Image from "next/image";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import TextReveal from "@/components/common/text-reveal";

export default function OurPurpose({ data }) {
  return (
    <section
      id="our-purpose"
      aria-labelledby="our-purpose-eyebrow"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-black py-20 text-center lg:h-[calc(850*var(--u))] lg:min-h-0 lg:py-[calc(100*var(--u))]"
    >
      <Parallax className="absolute inset-0 -z-10" from={-8} to={8} scale={1.2}>
        <Image
          src={data?.image?.src}
          alt={data?.image?.alt ?? ""}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </Parallax>

      <div className="container mx-auto px-4">
        <Reveal
          as="p"
          variant="fade"
          id="our-purpose-eyebrow"
          className="text-xs font-medium tracking-[0.3em] text-basecolor uppercase lg:text-eyebrow"
        >
          {data?.eyebrow}
        </Reveal>
        <TextReveal
          as="h2"
          lines={data?.lines}
          from="#4b4b4b"
          className="mx-auto mt-5 max-w-5xl text-3xl/[1.3] font-bold tracking-[-0.02em] sm:text-5xl/[1.3] lg:mt-[calc(36*var(--u))] lg:max-w-[1560px] lg:text-display-md/[1.3]"
        />
      </div>
    </section>
  );
}
