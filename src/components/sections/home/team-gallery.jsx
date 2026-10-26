import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

// Figma mosaic slots (xl+): left / top / width / height in Tailwind spacing units (1 = 4px)
const slots = [
  "xl:left-0 xl:top-22.75 xl:h-139.25 xl:w-107.75",
  "xl:left-114 xl:top-10.75 xl:h-84.25 xl:w-107.75",
  "xl:left-114 xl:top-100.5 xl:h-65 xl:w-131",
  "xl:left-226 xl:top-0 xl:h-95 xl:w-108.75",
  "xl:left-250.75 xl:top-98.5 xl:h-67 xl:w-84",
  "xl:left-339 xl:top-36 xl:h-113.25 xl:w-91",
];

const mobileSpans = ["row-span-2", "", "", "row-span-2", "", ""];

export default function TeamGallery({ data }) {
  return (
    <section id="people" aria-labelledby="people-title" className="relative overflow-hidden bg-white py-16 sm:py-20 xl:flex xl:h-270 xl:items-center xl:py-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <Reveal variant="up">
              <Heading as="h2" id="people-title" size="display" className="text-basecolor">
                <RichLines lines={data?.title} />
              </Heading>
            </Reveal>
            <Reveal as="p" variant="up" delay={0.15} className="mt-3 text-lg/[1.4] font-semibold text-basecolor6 sm:text-2xl/[1.4] xl:mt-4 xl:text-title/[1.4]">
              {data?.subtitle}
            </Reveal>
          </div>
          <Reveal variant="left" delay={0.2} className="xl:mt-9">
            <Button href={data?.cta?.href}>{data?.cta?.label}</Button>
          </Reveal>
        </div>

        {/* mobile / tablet: simple grid · xl+: the exact Figma collage */}
        <div className="mt-8 grid auto-rows-[112px] grid-cols-2 gap-3 sm:auto-rows-[160px] md:grid-cols-3 xl:relative xl:left-1/2 xl:mt-9 xl:block xl:h-165.5 xl:w-430 xl:-translate-x-1/2">
          {data?.images?.map((img, i) => (
            <Reveal
              key={img?.id ?? i}
              variant={i % 2 ? "up" : "scale"}
              delay={0.08 * i}
              className={`group relative overflow-hidden rounded-[30px] xl:absolute ${mobileSpans[i] ?? ""} ${slots[i] ?? ""}`}
            >
              <Image
                src={img?.src}
                alt={img?.alt ?? ""}
                fill
                sizes="(min-width: 1200px) 30vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
