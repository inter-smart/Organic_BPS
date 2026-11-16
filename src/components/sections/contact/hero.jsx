import Image from "next/image";
import Heading from "@/components/common/heading";
import HeroMedia from "@/components/common/hero-media";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";
import { text } from "@/lib/cms-text";

export default function Hero({ banner, title, scroll }) {
  return (
    <section
      id="hero"
      aria-labelledby="contact-hero-title"
      className="relative isolate flex h-svh min-h-150 flex-col justify-center overflow-hidden bg-basecolor4 text-white"
    >
      <Parallax
        className="absolute inset-0 -z-10"
        from={0}
        to={25}
        scale={1}
        start="top top"
        end="bottom top"
      >
        <HeroMedia
          slides={
            banner?.banner
              ? [
                  {
                    id: banner.id,
                    type: "image",
                    src: banner.banner,
                    alt: banner.banner_alt_text,
                  },
                ]
              : []
          }
        />
      </Parallax>

      <div className="container mx-auto px-4">
        <div className="relative grid grid-cols-[minmax(0,1fr)] gap-10 pt-28 pb-24 lg:grid-cols-2 lg:items-center lg:gap-y-[calc(90*var(--u))] lg:pt-30 lg:pb-0">
          <div className="lg:col-span-2">
            <Reveal variant="blur" duration={1.1} immediate>
              <Heading
                as="h1"
                id="contact-hero-title"
                size="display"
                className="text-white"
              >
                <RichLines lines={title} />
              </Heading>
            </Reveal>
          </div>

          <Reveal
            variant="up"
            delay={0.25}
            className="flex items-center gap-3 lg:mt-0"
          >
            <div className="flex -space-x-2">
              {[banner?.banner_top_image]
                .flat()
                .filter(Boolean)
                .map((src) => (
                  <div
                    key={src}
                    className="relative size-9 overflow-hidden rounded-full ring-2 ring-basecolor4 lg:size-[calc(38*var(--u))]"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="38px"
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
            <p className="text-xs text-white/90 lg:text-sm">
              {banner?.image_text}
            </p>
          </Reveal>

          <div className="lg:pl-[calc(29*var(--u))]">
            <Reveal
              as="p"
              variant="up"
              delay={0.2}
              className="text-base/[1.6] font-medium text-pretty text-white sm:text-lg/[1.6] lg:max-w-[calc(674*var(--u))] lg:text-intro/[1.52]"
            >
              {text(banner?.banner_description)}
            </Reveal>
          </div>

          <a
            href={scroll?.href}
            aria-label={scroll?.label}
            className="absolute right-0 bottom-0 hidden size-12 items-center justify-center sm:flex lg:-right-4 lg:-bottom-14"
          >
            <span className="relative block aspect-[50/14.7] w-10 rotate-90 animate-[bob_2.4s_ease-in-out_infinite] lg:w-12.25 motion-reduce:animate-none">
              <Image
                src="/images/arrow-down.svg"
                alt=""
                fill
                className="object-contain"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
