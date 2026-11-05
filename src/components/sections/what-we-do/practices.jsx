import {
  ChartNoAxesCombined,
  FileText,
  Lightbulb,
  Megaphone,
  Search,
  Settings,
  Target,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/common/reveal";
import Heading from "@/components/common/heading";
import PracticeTabs from "@/components/common/practice-tabs";
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
    <section
      id="practices"
      aria-labelledby="practices-title"
      className="relative bg-white py-10 sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <Reveal
          as="p"
          variant="fade"
          className="text-center text-xs font-bold tracking-[0.2em] text-basecolor uppercase lg:text-[clamp(14px,calc(21.589*var(--u)),21.589px)]"
        >
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
        <div className="below-header-sticky z-20 mt-3.75 sm:mt-8 bg-white 2xl:mt-5 border-b border-[#D2D2D2]">
          <Reveal variant="up" delay={0.2}>
            <PracticeTabs items={data?.tabs} />
          </Reveal>
        </div>
        <ol className="mt-2.5 sm:mt-5 lg:mt-10 2xl:mt-5 3xl:mt-[calc(65*var(--u))]">
          {data?.items?.map((item, i) => (
            <li
              key={item?.id}
              id={item?.anchorId}
              className="scroll-mt-48 border-t border-[#ddd] py-5 sm:py-10 lg:py-[calc(70*var(--u))] xl:py-15! 2xl:py-20! 3xl:py-25! first:border-0"
            >
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-[calc(90*var(--u))]">
                <div>
                  <Reveal
                    as="p"
                    variant="fade"
                    aria-hidden="true"
                    className="text-3xl font-bold text-[#e1e1e1] sm:text-[38px] lg:text-[clamp(32px,calc(70*var(--u)),70px)] xl:text-[45px]! 2xl:text-[56px]! 3xl:text-[70px]!"
                  >
                    {item?.number}
                  </Reveal>
                  <Reveal
                    as="p"
                    variant="up"
                    delay={0.05}
                    className="mt-1 text-base font-semibold tracking-wide text-basecolor2 uppercase sm:text-lg lg:mt-[calc(8*var(--u))] lg:text-[clamp(18px,calc(35*var(--u)),35px)] xl:text-2xl! 2xl:text-[28px]! 3xl:text-[35px]!"
                  >
                    {item?.label}
                  </Reveal>
                  <Reveal variant="up" delay={0.1}>
                    <Heading
                      as="h3"
                      size="display"
                      className="mt-3 text-basecolor2 lg:mt-[calc(18*var(--u))] lg:text-[clamp(40px,calc(88*var(--u)),88px)] text-[38px] sm:text-[55px]! xl:text-[65px]! 2xl:text-[75px]! 3xl:text-[100px]!"
                    >
                      <RichText segments={item?.heading} />
                    </Heading>
                  </Reveal>
                </div>
                <div>
                  {item?.logo ? (
                    <Reveal
                      variant="fade"
                      delay={0.1}
                      className="mb-2.5 sm:mb-6 aspect-170/110 h-auto w-22.5 sm:w-30 lg:mb-5 lg:w-[calc(var(--logo-w)*var(--u))] 2xl:w-45 flex items-center justify-center"
                      style={{ "--logo-w": item.logo.width }}
                    >
                      <Image
                        src={item.logo.src}
                        alt={item.logo.alt}
                        width={item.logo.width}
                        height={item.logo.height}
                        className="size-full object-contain"
                      />
                    </Reveal>
                  ) : null}
                  <Reveal
                    as="p"
                    variant="up"
                    delay={0.15}
                    className="text-sm/[1.6] font-medium text-pretty text-basecolor2 2xl:text-base 3xl:text-xl max-w-[90%]"
                  >
                    {item?.paragraph}
                  </Reveal>
                  <ul className="mt-3.75 2xl:mt-5 3xl:mt-8 divide-y divide-[#ddd] lg:mt-[calc(40*var(--u))]">
                    {item?.services?.map((s, si) => {
                      const Icon = ICONS[s?.icon];
                      return (
                        <Reveal
                          as="li"
                          key={si}
                          variant="up"
                          delay={0.1 + 0.05 * si}
                          className="flex items-center gap-2.5 sm:gap-4 py-3.75 lg:gap-7.5 2xl:gap-7.5 3xl:gap-10 3xl:py-[calc(25*var(--u))]"
                        >
                          {Icon ? (
                            <Icon
                              aria-hidden="true"
                              strokeWidth={1.5}
                              className="shrink-0 text-basecolor size-5 sm:size-7.5 3xl:size-10"
                            />
                          ) : null}
                          <span className="text-base font-semibold text-[#171717] sm:text-[17px] 2xl:text-xl 3xl:text-[25px]">
                            {s?.text}
                          </span>
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
