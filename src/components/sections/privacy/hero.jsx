import Image from "next/image";
import Heading from "@/components/common/heading";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function Hero({ data }) {
  return (
    <section
      id="hero"
      aria-labelledby="privacy-hero-title"
      className="relative isolate flex min-h-150 flex-col overflow-hidden bg-basecolor4 text-white lg:h-[calc(885*var(--u))]"
    >
      <Parallax className="absolute inset-0 -z-10" from={0} to={25} scale={1} start="top top" end="bottom top">
        <Image
          src={data?.image?.src}
          alt={data?.image?.alt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-basecolor4/97 via-basecolor4/84 via-52% to-basecolor4/45" />
      </Parallax>

      <div className="container mx-auto px-4">
        <div className="pt-32 pb-24 lg:pt-[calc(348*var(--u))] lg:pb-0">
          <Reveal variant="blur" duration={1.1} immediate>
            <Heading as="h1" id="privacy-hero-title" size="display" className="text-white lg:leading-[0.98] lg:tracking-[-0.03em]">
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <Reveal as="p" variant="up" delay={0.2} className="mt-6 max-w-[531px] text-base/[1.5] font-medium text-pretty text-white sm:text-lg/[1.5] lg:mt-[calc(45*var(--u))] lg:text-lead/[1.5]" immediate>
            {data?.paragraph}
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden sm:block lg:bottom-[calc(82*var(--u))]">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <a
              href={data?.scroll?.href}
              aria-label={data?.scroll?.label}
              className="flex size-12 items-center justify-center"
            >
              <span className="relative block aspect-[50/14.7] w-10 rotate-90 animate-[bob_2.4s_ease-in-out_infinite] lg:w-12.25 motion-reduce:animate-none">
                <Image src="/images/arrow-down.svg" alt="" fill className="object-contain" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
