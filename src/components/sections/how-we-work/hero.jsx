import HeroImage from "@/components/common/hero-image";
import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import { paragraphs } from "@/lib/cms-text";

export default function Hero({ data, banner }) {
  return (
    <section
      id="hero"
      aria-labelledby="how-we-work-title"
      className="relative isolate flex min-h-150 flex-col justify-end overflow-hidden bg-basecolor4 text-white lg:min-h-[calc(885*var(--u))]"
    >
      <Parallax className="absolute inset-0 -z-10" from={0} to={25} scale={1} start="top top" end="bottom top">
        <HeroImage src={banner?.banner} mobileSrc={banner?.banner_mobile} alt={banner?.banner_alt_text ?? ""} className="size-full object-cover object-[35%_center] lg:object-center" />
        <div className="absolute inset-0 bg-linear-to-t from-basecolor4/60 via-basecolor4/20 via-50% to-basecolor4/30" />
      </Parallax>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 pt-32 pb-16 lg:grid-cols-[minmax(0,763fr)_minmax(0,642fr)] lg:items-end lg:gap-x-[calc(60*var(--u))] lg:pt-[calc(120*var(--u))] lg:pb-[calc(80*var(--u))] lg:pr-[calc(105*var(--u))]">
          <div>
            <Reveal variant="blur" duration={1.1} immediate>
              <Heading as="h1" id="how-we-work-title" size="display" className="max-w-[7.63em] text-white">
                {/* <RichText segments={banner?.banner_title} /> */}
                {renderTitle(banner?.banner_title)}
              </Heading>
            </Reveal>
            {banner?.button_link ? (
              <Reveal variant="up" delay={0.3} className="mt-8 lg:mt-[calc(51*var(--u))]" immediate>
                <Button href={banner?.button_link} variant="dark">
                  {banner?.button_name}
                </Button>
              </Reveal>
            ) : null}
          </div>
          <Reveal as="p" variant="up" delay={0.2} immediate className="max-w-[642px] lg:justify-self-end text-base/[1.55] font-medium text-pretty text-white sm:text-lg/[1.55] lg:text-[clamp(16px,calc(25*var(--u)),25px)]/[1.52]">
            {paragraphs(banner?.banner_description)}
          </Reveal>
        </div>
      </div>

      <a
        href={data?.scroll?.href}
        aria-label={data?.scroll?.label}
        className="absolute right-4 bottom-6 hidden size-12 items-center justify-center sm:flex lg:right-[calc(90*var(--u))] lg:bottom-[calc(80*var(--u))]"
      >
        <span className="relative block aspect-[50/14.7] w-10 rotate-90 animate-[bob_2.4s_ease-in-out_infinite] lg:w-12.25 motion-reduce:animate-none">
          <Image src="/images/arrow-down.svg" alt="Scroll down" title="Scroll down" fill className="object-contain" />
        </span>
      </a>
    </section>
  );
}
