import Image from "next/image";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";
import { paragraphs } from "@/lib/cms-text";
import { cn } from "@/lib/utils";

const tile =
  "flex h-24 flex-col items-center justify-center gap-1 rounded-xl border px-1 font-roboto text-xs min-[400px]:text-sm sm:h-28 sm:text-lg lg:h-[calc(125*var(--u))] lg:gap-[calc(5.8*var(--u))] lg:rounded-[calc(9.7*var(--u))] lg:text-[clamp(14px,calc(26.2*var(--u)),26.2px)]";

function Tile({ item, result, delay }) {
  return (
    <Reveal
      variant="scale"
      delay={delay}
      className={cn(
        tile,
        result
          ? "border-basecolor14 bg-basecolor14 text-white"
          : "border-basecolor19 bg-basecolor18 text-basecolor21",
      )}
    >
      <Image
        src={item?.icon}
        alt=""
        width={42}
        height={42}
        unoptimized
        className="size-6 sm:size-9 lg:size-[calc(41.7*var(--u))]"
      />
      {item?.title}
    </Reveal>
  );
}

export default function Authentic({ data, image, title, equationLabel }) {
  return (
    <section
      id="authentic"
      aria-labelledby="authentic-title"
      className="overflow-x-clip bg-white py-16 sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[866fr_735fr] lg:items-start lg:gap-x-[calc(119*var(--u))]">
          <Reveal
            variant="clip"
            className="overflow-hidden rounded-3xl lg:rounded-[calc(39*var(--u))]"
          >
            <Image
              src={data?.image}
              alt={image?.alt ?? ""}
              width={image?.width}
              height={image?.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[866/651] w-full object-cover"
            />
          </Reveal>

          <div>
            <Reveal variant="up">
              <Heading
                as="h2"
                id="authentic-title"
                size="display"
                className="text-basecolor20 tracking-normal lg:leading-[1.03]"
              >
                <RichLines lines={title} />
              </Heading>
            </Reveal>
            <div className="mt-6 space-y-4 lg:mt-[calc(37*var(--u))] lg:space-y-[calc(22*var(--u))]">
              {paragraphs(data?.description).map((p, i) => (
                <Reveal
                  key={i}
                  as="p"
                  variant="up"
                  delay={0.1 * (i + 1)}
                  className="font-inter text-base/[1.5] text-basecolor21 lg:max-w-[701px] lg:text-lead/[1.3]"
                >
                  {p}
                </Reveal>
              ))}
            </div>

            <div
              role="group"
              aria-label={equationLabel}
              className="mt-8 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-4 lg:mt-[calc(38*var(--u))] lg:gap-[calc(17.4*var(--u))]"
            >
              <Tile item={data?.card_one} delay={0.1} />
              <Reveal
                as="span"
                variant="fade"
                delay={0.3}
                aria-hidden="true"
                className="font-roboto text-2xl text-basecolor20 lg:text-[calc(41.4*var(--u))]"
              >
                +
              </Reveal>
              <Tile item={data?.card_two} delay={0.5} />
              <Reveal variant="left" delay={0.7} aria-hidden="true">
                <Image
                  src="/images/why-purpose/arrow-right.svg"
                  alt=""
                  width={85}
                  height={52}
                  className="h-auto w-5 sm:w-12 lg:w-[calc(85*var(--u))]"
                />
              </Reveal>
              <Tile item={data?.card_three} result delay={0.9} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
