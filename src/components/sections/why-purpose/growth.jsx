import Image from "next/image";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import { text } from "@/lib/cms-text";

export default function Growth({ data, items = [], title }) {
  return (
    <section
      id="how-purpose-helps"
      aria-labelledby="growth-title"
      className="bg-white py-16 sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[819fr_900fr] lg:items-start lg:gap-0">
          <div>
            <Reveal variant="up">
              <Heading
                as="h2"
                id="growth-title"
                size="display"
                className="text-basecolor25 tracking-normal lg:max-w-[calc(789*var(--u))] lg:leading-[1.03]"
              >
                {renderTitle(title, "text-basecolor17")}
              </Heading>
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.1}
              className="mt-6 font-roboto text-base/[1.7] text-basecolor25 lg:mt-[calc(38*var(--u))] lg:max-w-[calc(564*var(--u))] lg:text-lead/[1.74]"
            >
              {text(data?.description)}
            </Reveal>
          </div>

          <ul>
            {items.map((item, i) => (
              <Reveal
                key={item.id}
                as="li"
                variant="up"
                delay={0.08 * i}
                className="flex items-center gap-5 border-b border-basecolor23 py-5 last:border-b-0 lg:h-[calc(108*var(--u))] lg:gap-[calc(38*var(--u))] lg:py-0"
              >
                <Image
                  src={item.icon}
                  alt={item.title ?? "Growth icon"}
                  title={item.title ?? "Growth icon"}
                  width={60}
                  height={60}
                  unoptimized
                  className="size-12 shrink-0 lg:size-[calc(60*var(--u))]"
                />
                <p className="text-lg/[1.25] font-medium text-basecolor25 lg:text-[clamp(16px,calc(25*var(--u)),25px)]/[1.25]">
                  {item.title}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
