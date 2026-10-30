import { ChartNoAxesCombined, FileText, Lightbulb, Megaphone, Search, Settings, Target, UsersRound } from "lucide-react";
import Image from "next/image";
import Heading from "@/components/common/heading";
import PracticeTabs from "@/components/common/practice-tabs";
import Reveal from "@/components/common/reveal";
import { RichLines, RichText } from "@/components/common/rich-text";

const ICONS = {
  search: Search,
  "users-round": UsersRound,
  "file-text": FileText,
  target: Target,
  megaphone: Megaphone,
  "chart-no-axes-combined": ChartNoAxesCombined,
  lightbulb: Lightbulb,
  settings: Settings,
};

export default function Practices({ data }) {
  return (
    <section id="practices" aria-labelledby="practices-title" className="relative bg-white py-16 sm:py-20 lg:py-[calc(100*var(--u))]">
      <div className="container mx-auto px-4">
        <Reveal as="p" variant="fade" className="text-center text-xs font-bold tracking-[0.2em] text-basecolor uppercase lg:text-[clamp(14px,calc(21.589*var(--u)),21.589px)]">
          {data?.eyebrow}
        </Reveal>
        <Reveal variant="up" delay={0.1}>
          <Heading
            id="practices-title"
            size="display"
            className="mt-3 text-center text-basecolor2 lg:mt-[calc(14*var(--u))] lg:text-[clamp(32px,calc(86.357*var(--u)),86.357px)]"
          >
            <RichLines lines={data?.title} />
          </Heading>
        </Reveal>

        <div className="sticky top-0 z-20 mt-8 bg-white py-4 lg:mt-[calc(60*var(--u))] lg:py-[calc(20*var(--u))]">
          <Reveal variant="up" delay={0.2}>
            <PracticeTabs items={data?.tabs} />
          </Reveal>
        </div>

        <ol className="mt-10 lg:mt-[calc(65*var(--u))]">
          {data?.items?.map((item, i) => (
            <li key={item?.id} id={item?.anchorId} className="scroll-mt-28 border-t border-[#ddd] py-10 lg:py-[calc(70*var(--u))]">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-[calc(90*var(--u))]">
                <div>
                  <Reveal as="p" variant="fade" aria-hidden="true" className="text-4xl font-bold text-[#e1e1e1] sm:text-5xl lg:text-[clamp(32px,calc(70*var(--u)),70px)]">
                    {item?.number}
                  </Reveal>
                  <Reveal
                    as="p"
                    variant="up"
                    delay={0.05}
                    className="mt-1 text-lg font-semibold tracking-wide text-basecolor2 uppercase sm:text-xl lg:mt-[calc(8*var(--u))] lg:text-[clamp(18px,calc(35*var(--u)),35px)]"
                  >
                    {item?.label}
                  </Reveal>
                  <Reveal variant="up" delay={0.1}>
                    <Heading as="h3" size="display" className="mt-3 text-basecolor2 lg:mt-[calc(18*var(--u))]">
                      <RichText segments={item?.heading} />
                    </Heading>
                  </Reveal>
                </div>

                <div>
                  {item?.logo ? (
                    <Reveal
                      variant="fade"
                      delay={0.1}
                      className="mb-6 w-28 sm:w-36 lg:mb-[calc(40*var(--u))] lg:w-[calc(var(--logo-w)*var(--u))]"
                      style={{ "--logo-w": item.logo.width }}
                    >
                      <Image src={item.logo.src} alt={item.logo.alt} width={item.logo.width} height={item.logo.height} className="h-auto w-full" />
                    </Reveal>
                  ) : null}

                  <Reveal as="p" variant="up" delay={0.15} className="text-base/[1.6] font-medium text-pretty text-basecolor2 sm:text-lg/[1.6] lg:text-lead/[1.6]">
                    {item?.paragraph}
                  </Reveal>

                  <ul className="mt-8 divide-y divide-[#ddd] lg:mt-[calc(40*var(--u))]">
                    {item?.services?.map((s, si) => {
                      const Icon = ICONS[s?.icon];
                      return (
                        <Reveal as="li" key={si} variant="up" delay={0.1 + 0.05 * si} className="flex items-center gap-4 py-5 lg:gap-[calc(35*var(--u))] lg:py-[calc(25*var(--u))]">
                          {Icon ? <Icon aria-hidden="true" strokeWidth={1.5} className="size-9 shrink-0 text-basecolor sm:size-10 lg:size-[calc(55*var(--u))]" /> : null}
                          <span className="text-base font-medium text-basecolor2 sm:text-lg lg:text-[clamp(16px,calc(25*var(--u)),25px)]">{s?.text}</span>
                        </Reveal>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
