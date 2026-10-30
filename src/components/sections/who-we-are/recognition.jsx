import Image from "next/image";
import Heading from "@/components/common/heading";
import NumberTicker from "@/components/common/number-ticker";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { RichLines, RichText } from "@/components/common/rich-text";

export default function Recognition({ data }) {
  return (
    <section
      id="recognition"
      aria-labelledby="recognition-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:min-h-[calc(1155*var(--u))] lg:items-center lg:py-0"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-0">
          <div>
            <Reveal as="p" variant="fade" className="text-xs font-medium tracking-[0.3em] text-basecolor uppercase lg:text-eyebrow">
              {data?.eyebrow}
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <Heading as="h2" id="recognition-title" size="display" className="mt-3 text-basecolor2 lg:mt-[calc(14*var(--u))] lg:text-[clamp(40px,calc(80*var(--u)),80px)]">
                <RichLines lines={data?.title} />
              </Heading>
            </Reveal>
          </div>
          <div className="lg:pl-[calc(150*var(--u))]">
            <Reveal variant="up" delay={0.15}>
              <p className="text-figure font-bold tracking-[-0.02em] text-basecolor">
                <NumberTicker value={data?.count?.value} suffix={data?.count?.suffix} duration={2.4} />
              </p>
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.25}
              className="mt-4 text-base/[1.7] font-medium text-basecolor2 sm:text-lg/[1.7] lg:mt-[calc(30*var(--u))] lg:max-w-[calc(560*var(--u))] lg:text-body"
            >
              <RichText segments={data?.text} />
            </Reveal>
          </div>
        </div>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-[calc(60*var(--u))] lg:grid-cols-3 lg:gap-[calc(58*var(--u))]">
          {data?.items?.map((item, i) => (
            <li key={item?.id ?? i}>
              <Reveal variant="clip" delay={0.1 * i} className="group relative aspect-552/368 overflow-hidden rounded-[30px]">
                <Parallax className="absolute inset-0" from={-5} to={5} scale={1.12}>
                  <Image
                    src={item?.image}
                    alt={item?.alt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Parallax>
              </Reveal>
              <Reveal variant="up" delay={0.1 * i + 0.15}>
                <h3 className="mt-4 text-xl/[1.3] font-medium text-basecolor2 lg:mt-[calc(26*var(--u))] lg:text-card/[1.3]">{item?.title}</h3>
                <p className="mt-1 text-sm/[1.6] font-medium text-basecolor2 sm:text-base/[1.6] lg:mt-[calc(8*var(--u))] lg:text-body">{item?.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
