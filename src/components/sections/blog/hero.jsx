import Image from "next/image";
import Heading from "@/components/common/heading";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import TopicRail from "@/components/sections/blog/topic-rail";

const scroll = {
  label: "Scroll to featured perspectives",
  href: "#featured",
};

export default function Hero({ data }) {
  return (
    <section
      id="hero"
      aria-labelledby="blog-hero-title"
      className="relative isolate flex min-h-150 flex-col overflow-hidden bg-basecolor4 text-white lg:h-[calc(965*var(--u))]"
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
          {data?.image?.mobileSrc && (
            <source
              media="(max-width: 1023px)"
              srcSet={data.image.mobileSrc}
            />
          )}
          <Image
            src={data?.image?.src}
            alt={data?.image?.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="size-full object-cover object-[60%_center] lg:object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-35% to-black/78" />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-transparent" />
      </Parallax>

      <div className="container mx-auto px-4">
        <div className="pt-32 pb-16 lg:pt-[calc(312*var(--u))] lg:pb-0">
          <Reveal variant="blur" duration={1.1} immediate>
            <Heading
              as="h1"
              id="blog-hero-title"
              size="display"
              className="text-white lg:max-w-[763px] lg:leading-[1.12] lg:tracking-[-0.02em] 3xl:text-[100px]!"
            >
              {/* <RichLines lines={data?.title} /> */}
              {renderTitle(data?.title)}
            </Heading>
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="container mx-auto px-4">
          <div className="hidden justify-end pb-6 sm:flex lg:pb-[calc(54*var(--u))]">
            <a
              href={scroll.href}
              aria-label={scroll.label}
              className="flex size-12 items-center justify-center"
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
          </div>
          <TopicRail data={{ label: "Explore the thinking", items: data?.topics }} />
        </div>
      </div>
    </section>
  );
}
