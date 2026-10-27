import Image from "next/image";
import Button from "@/components/common/button";
import GlobeView from "@/components/common/globe-view";
import Heading from "@/components/common/heading";
import NumberTicker from "@/components/common/number-ticker";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function GlobeImpact({ data }) {
  return (
    <section
      id="why-we-do"
      aria-labelledby="globe-impact-title"
      className="relative isolate overflow-hidden bg-basecolor4 py-16 text-white sm:py-20 xl:h-270 xl:py-0"
    >
      <div className="container relative z-10 grid gap-10 xl:pointer-events-none xl:h-full xl:grid-cols-[594fr_1fr] xl:items-center xl:gap-0">
        <div className="xl:pointer-events-auto xl:max-w-150">
          <Reveal variant="up">
            <Heading
              as="h2"
              id="globe-impact-title"
              size="display"
              className="text-white"
            >
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <Reveal
            as="p"
            variant="up"
            delay={0.15}
            className="mt-6 max-w-xl text-base/[1.75] text-white sm:text-lg/[1.75] xl:mt-8 xl:max-w-115.75 xl:text-lead/[1.75] text-pretty"
          >
            {data?.text}
          </Reveal>
          <Reveal variant="up" delay={0.3} className="mt-8 xl:mt-11">
            <Button href={data?.cta?.href} variant="dark">
              {data?.cta?.label}
            </Button>
          </Reveal>
        </div>
      </div>

      {/* Interactive globe — in flow on small screens, positioned behind the copy on xl+ */}
      <div className="relative mx-auto mt-10 h-112 w-full max-w-3xl sm:h-136 xl:absolute xl:top-[12%] xl:left-[22%] xl:mt-0 xl:h-[72%] xl:w-[62%] xl:max-w-none">
        <GlobeView pins={data?.pins} className="size-full" />
      </div>

      <div className="container relative z-10 mt-10 xl:pointer-events-none xl:absolute xl:inset-x-0 xl:top-0 xl:mt-0 xl:h-full">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 xl:pointer-events-auto xl:absolute xl:top-[14.7%] xl:right-0 xl:bottom-[8%] xl:w-57.5 xl:grid-cols-1 xl:content-between xl:gap-0">
          {data?.stats?.map((stat, i) => (
            <Reveal
              as="li"
              key={stat?.id}
              variant="up"
              delay={0.15 * i}
              className="flex flex-col gap-3 xl:gap-0"
            >
              <div
                className="relative h-12 xl:h-16.25"
                style={{
                  aspectRatio: `${stat?.icon?.w} / ${stat?.icon?.h}`,
                  maxWidth: `${(stat?.icon?.w ?? 0) / 16}rem`,
                }}
              >
                <Image
                  src={stat?.icon?.src}
                  alt=""
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="font-inter text-4xl/none font-bold text-basecolor xl:mt-9 xl:text-stat/none">
                <NumberTicker value={stat?.value} suffix={stat?.suffix} />
              </p>
              <p className="font-inter text-base/[1.6] font-medium text-white lowercase sm:text-lg/[1.6] xl:mt-4 xl:text-lead/[1.6]">
                {stat?.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
