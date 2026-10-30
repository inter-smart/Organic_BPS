import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import NumberTicker from "@/components/common/number-ticker";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

// Three.js globe engine is heavy and well below the fold — keep it out of the initial bundle.
// (`ssr: false` isn't allowed on a dynamic import inside a Server Component; GlobeView is itself
// a client component and only touches the DOM/WebGL inside useEffect, so plain SSR of its markup is safe.)
const GlobeView = dynamic(() => import("@/components/common/globe-view"));

export default function GlobeImpact({ data }) {
  return (
    <section
      id="why-we-do"
      aria-labelledby="globe-impact-title"
      className="relative isolate z-10 overflow-hidden bg-basecolor4 py-16 text-white sm:py-20 lg:-mt-[100svh] lg:h-svh lg:py-0"
    >
      <div className="container mx-auto px-4 relative z-10 grid gap-10 lg:pointer-events-none lg:h-full lg:grid-cols-[594fr_1fr] lg:items-center lg:gap-0">
        <div className="lg:pointer-events-auto lg:max-w-150">
          <Reveal variant="up">
            <Heading as="h2" id="globe-impact-title" size="display" className="text-white">
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <Reveal as="p" variant="up" delay={0.15} className="mt-6 max-w-xl text-base/[1.75] text-white sm:text-lg/[1.75] lg:mt-8 lg:max-w-115.75 lg:text-lead/[1.75] text-pretty">
            {data?.text}
          </Reveal>
          <Reveal variant="up" delay={0.3} className="mt-8 lg:mt-11">
            <Button href={data?.cta?.href} variant="dark">
              {data?.cta?.label}
            </Button>
          </Reveal>
        </div>
      </div>

      {/* Interactive globe — in flow on small screens, positioned behind the copy on xl+ */}
      <div className="relative mx-auto mt-10 h-112 w-full max-w-3xl sm:h-136 lg:absolute lg:top-[12%] lg:left-[22%] lg:mt-0 lg:h-[72%] lg:w-[62%] lg:max-w-none">
        <GlobeView pins={data?.pins} className="size-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10 mt-10 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0 lg:h-full">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:pointer-events-auto lg:absolute lg:top-[14.7%] lg:right-0 lg:bottom-[8%] lg:w-57.5 lg:grid-cols-1 lg:content-between lg:gap-0">
          {data?.stats?.map((stat, i) => (
            <Reveal as="li" key={stat?.id} variant="up" delay={0.15 * i} className="flex flex-col gap-3 lg:gap-0">
              <div className="relative h-12 lg:h-16.25" style={{ aspectRatio: `${stat?.icon?.w} / ${stat?.icon?.h}`, maxWidth: `${stat?.icon?.w ?? 0}px` }}>
                <Image src={stat?.icon?.src} alt="" fill className="object-contain object-left" />
              </div>
              <p className="font-inter text-4xl/none font-bold text-basecolor lg:mt-9 lg:text-stat/none">
                <NumberTicker value={stat?.value} suffix={stat?.suffix} />
              </p>
              <p className="font-inter text-base/[1.6] font-medium text-white lowercase sm:text-lg/[1.6] lg:mt-4 lg:text-lead/[1.6]">{stat?.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
