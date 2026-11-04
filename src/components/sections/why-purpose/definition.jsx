import Image from "next/image";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";
import { cn } from "@/lib/utils";

export default function Definition({ data }) {
  return (
    <section id="what-is-purpose" aria-labelledby="what-is-title" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-[calc(100*var(--u))]">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[580fr_1140fr] lg:items-center lg:gap-0">
          <Reveal variant="up">
            <Heading as="h2" id="what-is-title" size="display" className="text-basecolor25 tracking-normal lg:leading-[0.89]">
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <div className="space-y-5 lg:space-y-[calc(29*var(--u))] lg:border-l-[3px] lg:border-basecolor24 lg:pl-[calc(100*var(--u))]">
            {data?.paragraphs?.map((p, i) => (
              <Reveal key={i} as="p" variant="up" delay={0.1 * (i + 1)} className="text-base/[1.6] text-basecolor25 sm:text-lg/[1.6] lg:max-w-[1005px] lg:text-lead/[1.44]">
                {p}
              </Reveal>
            ))}
          </div>
        </div>

        <ul aria-label={data?.distinctionsLabel} className="mt-12 grid grid-cols-2 gap-4 lg:mt-[calc(88*var(--u))] lg:grid-cols-4 lg:gap-[calc(38.8*var(--u))]">
          {data?.distinctions?.map((item, i) => (
            <Reveal
              key={item.id}
              as="li"
              variant="up"
              delay={0.1 * i}
              className={cn(
                "relative flex flex-col items-center justify-center gap-2 rounded-xl border px-3 py-6 text-center lg:h-[calc(222*var(--u))] lg:gap-[calc(8.6*var(--u))] lg:rounded-[calc(8.6*var(--u))] lg:border-0 lg:px-0 lg:py-0",
                item.active ? "border-basecolor19 bg-basecolor18" : "border-basecolor11 bg-white",
                i < 2 && "lg:after:absolute lg:after:top-[calc(23*var(--u))] lg:after:-right-[calc(19.4*var(--u))] lg:after:h-[calc(167*var(--u))] lg:after:w-[2px] lg:after:bg-basecolor23",
              )}
            >
              <Image src={item.icon} alt="" width={57} height={57} className="size-12 shrink-0 lg:size-[calc(57*var(--u))]" />
              <p className={cn("text-xl font-bold lg:text-[clamp(18px,calc(30.8*var(--u)),30.8px)]", item.active ? "text-basecolor14" : "text-basecolor20")}>{item.title}</p>
              <p className={cn("text-base font-medium lg:text-[clamp(14px,calc(25*var(--u)),25px)]", item.active ? "text-basecolor14" : "text-basecolor21")}>{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
