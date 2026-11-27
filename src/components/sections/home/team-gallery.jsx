import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import { cta, text } from "@/lib/cms-text";

// Figma mosaic slots (xl+): left / top / width / height in Tailwind spacing units (1 = 4px)
const slots = [
  "lg:left-0 lg:top-22.75 lg:h-139.25 lg:w-107.75",
  "lg:left-114 lg:top-10.75 lg:h-84.25 lg:w-107.75",
  "lg:left-114 lg:top-100.5 lg:h-65 lg:w-131",
  "lg:left-226 lg:top-0 lg:h-95 lg:w-108.75",
  "lg:left-250.75 lg:top-98.5 lg:h-67 lg:w-84",
  "lg:left-339 lg:top-36 lg:h-113.25 lg:w-91",
];

const mobileSpans = ["row-span-2", "", "", "row-span-2", "", ""];

export default function TeamGallery({ data, gallery, title }) {
  const button = cta(data);

  return (
    <section
      id="people"
      aria-labelledby="people-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:min-h-270 lg:items-center lg:py-0"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <Reveal variant="up">
              <Heading
                as="h2"
                id="people-title"
                size="display"
                className="text-black"
              >
                {/* <RichLines lines={title} /> */}
                {renderTitle(title)}
              </Heading>
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.15}
              className="mt-3 text-lg/[1.4] font-semibold text-basecolor6 sm:text-2xl/[1.4] lg:mt-4 lg:text-title/[1.4]"
            >
              {text(data.description)}
            </Reveal>
          </div>
          {button.href ? (
            <Reveal variant="left" delay={0.2} className="lg:mt-9">
              <Button href={button.href}>{button.label}</Button>
            </Reveal>
          ) : null}
        </div>

        {/* mobile / tablet: simple grid · xl+: the exact Figma collage */}
        <div className="mt-8 grid auto-rows-[112px] grid-cols-2 gap-3 sm:auto-rows-[160px] md:grid-cols-3 lg:relative lg:left-1/2 lg:mt-9 lg:block lg:h-165.5 lg:w-430 lg:-translate-x-1/2">
          {gallery?.map((img, i) => (
            <Reveal
              key={img.id}
              variant="clip"
              delay={0.08 * (i % 4)}
              className={`group relative overflow-hidden rounded-[30px] lg:absolute ${mobileSpans[i] ?? ""} ${slots[i] ?? ""}`}
            >
              <Parallax className="absolute inset-0" from={-6} to={6}>
                <Image
                  src={img.image}
                  alt={img.image_alt_tag || "Organic BPS team"}
                  title={img.image_alt_tag || "Organic BPS team"}
                  fill
                  sizes="(min-width: 1280px) 30vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
