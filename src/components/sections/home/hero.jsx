import Link from "next/link";
import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import HeroMedia from "@/components/common/hero-media";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function Hero({ data }) {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
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
        <HeroMedia slides={data?.slides} />
      </Parallax>

      <div className="container mx-auto px-4 relative pt-28 pb-24 lg:pt-30 lg:pb-0">
        <Reveal variant="blur" duration={1.1} immediate>
          <Heading
            as="h1"
            id="hero-title"
            size="display"
            className="max-w-190 text-white"
          >
            <RichLines lines={data?.title} />
          </Heading>
        </Reveal>
        <Reveal variant="up" delay={0.35} className="mt-8 lg:mt-13.5">
          <Button href={data?.cta?.href} variant="dark">
            {data?.cta?.label}
          </Button>
        </Reveal>
        <Link
          href={data?.scroll?.href}
          aria-label={data?.scroll?.label}
          className="absolute right-4 bottom-0 hidden size-12 items-center justify-center sm:flex lg:-bottom-14 lg:right-0"
        >
          <span className="relative block aspect-[50/14.7] w-10 rotate-90 animate-[bob_2.4s_ease-in-out_infinite] lg:w-12.25 motion-reduce:animate-none">
            <Image
              src="/images/arrow-down.svg"
              alt=""
              fill
              className="object-contain"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
