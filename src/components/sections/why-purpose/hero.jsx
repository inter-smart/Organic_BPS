import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import { link, text } from "@/lib/cms-text";

const scroll = {
  label: "Scroll to what is corporate purpose",
  href: "#what-is-purpose",
};

export default function Hero({ banner, title }) {
  return (
    <section
      id="hero"
      aria-labelledby="why-purpose-title"
      className="relative isolate flex min-h-150 flex-col justify-end overflow-hidden bg-basecolor4 text-white lg:h-[calc(885*var(--u))]"
    >
      <Parallax
        className="absolute inset-0 -z-10"
        from={0}
        to={25}
        scale={1}
        start="top top"
        end="bottom top"
      >
        <picture>
          {banner?.banner_mobile && (
            <source media="(max-width: 959px)" srcSet={banner.banner_mobile} />
          )}
          <Image
            src={banner?.banner}
            alt={banner?.banner_alt_text ?? ""}
            fill
            priority
            sizes="100vw"
            className="size-full object-cover object-[72%_center] lg:object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-linear-to-t from-basecolor4/70 via-basecolor4/25 via-45% to-basecolor4/35" />
      </Parallax>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 pt-32 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,477px)] lg:items-end lg:gap-x-[calc(60*var(--u))] lg:pt-0 lg:pb-[calc(80*var(--u))] lg:pr-[calc(137*var(--u))]">
          <div>
            <Reveal variant="blur" duration={1.1} immediate>
              <Heading
                as="h1"
                id="why-purpose-title"
                size="display"
                className="text-white"
              >
                {renderTitle(title)}
              </Heading>
            </Reveal>
            {link(banner?.button_link) ? (
              <Reveal
                variant="up"
                delay={0.3}
                className="mt-8 lg:mt-[calc(51*var(--u))]"
                immediate
              >
                <Button href={link(banner?.button_link)} variant="dark">
                  {banner?.button_name}
                </Button>
              </Reveal>
            ) : null}
          </div>
          <Reveal
            as="p"
            variant="up"
            delay={0.2}
            immediate
            className="max-w-[477px] text-base/[1.55] font-medium text-pretty text-white sm:text-lg/[1.55] lg:pb-[calc(8*var(--u))] lg:text-[clamp(16px,calc(25*var(--u)),25px)]/[1.52]"
          >
            {text(banner?.banner_description)}
          </Reveal>
        </div>
      </div>

      <a
        href={scroll?.href}
        aria-label={scroll?.label}
        className="absolute right-4 bottom-6 hidden size-12 items-center justify-center sm:flex lg:right-[calc(90*var(--u))] lg:bottom-[calc(80*var(--u))]"
      >
        <span className="relative block aspect-[50/14.7] w-10 rotate-90 animate-[bob_2.4s_ease-in-out_infinite] lg:w-12.25 motion-reduce:animate-none">
          <Image
            src="/images/arrow-down.svg"
            alt="Scroll down"
            title="Scroll down"
            fill
            className="object-contain"
          />
        </span>
      </a>
    </section>
  );
}
