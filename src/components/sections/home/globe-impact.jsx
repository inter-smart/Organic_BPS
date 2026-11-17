import Image from "next/image";
import dynamic from "next/dynamic";
import Reveal from "@/components/common/reveal";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import { renderTitle } from "@/components/common/rich-text";
import NumberTicker from "@/components/common/number-ticker";
import { cta, figure, text } from "@/lib/cms-text";

const GlobeView = dynamic(() => import("@/components/common/globe-view"));

const pinIcons = { patagonia: "mountain", natura: "leaf" };

export default function GlobeImpact({ data, pins, stats, title }) {
  const button = cta(data);
  const globePins = pins?.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.description,
    lat: Number(p.latitude),
    lng: Number(p.longitude),
    icon: pinIcons[p.title?.toLowerCase()],
  }));

  return (
    <section
      id="why-we-do"
      aria-labelledby="globe-impact-title"
      className="relative isolate z-10 overflow-hidden bg-basecolor4 py-16 text-white sm:py-20 lg:-mt-[100svh] lg:h-svh lg:py-0"
    >
      <div className="relative z-10 lg:pointer-events-none lg:flex lg:h-full lg:items-center">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[594fr_1fr] lg:gap-0">
            <div className="lg:pointer-events-auto lg:max-w-150">
              <Reveal variant="up">
                <Heading
                  as="h2"
                  id="globe-impact-title"
                  size="display"
                  className="text-white"
                >
                  {/* <RichLines lines={title} /> */}
                  {renderTitle(title)}
                </Heading>
              </Reveal>
              <Reveal
                as="p"
                variant="up"
                delay={0.15}
                className="mt-6 max-w-xl text-base/[1.75] text-white sm:text-lg/[1.75] lg:mt-8 lg:max-w-115.75 lg:text-lead/[1.75] text-pretty"
              >
                {text(data.description)}
              </Reveal>
              <Reveal variant="up" delay={0.3} className="mt-8 lg:mt-11">
                <Button href={button.href} variant="dark">
                  {button.label}
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-10 h-112 w-full max-w-3xl sm:h-136 lg:absolute lg:top-[12%] lg:left-[22%] lg:mt-0 lg:h-[72%] lg:w-[62%] lg:max-w-none">
        <GlobeView pins={globePins} className="size-full" />
      </div>
      <div className="relative z-10 mt-10 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0 lg:flex lg:h-full">
        <div className="container mx-auto px-4">
          <div className="relative lg:h-full">
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:pointer-events-auto lg:absolute lg:top-[14.7%] lg:-right-4 lg:bottom-[8%] lg:w-57.5 lg:grid-cols-1 lg:content-between lg:gap-0">
              {stats?.map((stat, i) => {
                const { value, suffix } = figure(stat.value);
                return (
                  <Reveal
                    as="li"
                    key={stat.id}
                    variant="up"
                    delay={0.15 * i}
                    className="flex flex-col gap-3 lg:gap-0"
                  >
                    <div className="relative h-12 lg:h-16.25">
                      <Image
                        src={stat.icon}
                        alt=""
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <p className="font-inter text-4xl/none font-bold text-basecolor lg:mt-9 lg:text-stat/none">
                      <NumberTicker value={value} suffix={suffix} />
                    </p>
                    <p className="font-inter text-sm/[1.6] font-medium text-white lowercase lg:mt-4 lg:text-lead/[1.6]">
                      {stat.title}
                    </p>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
