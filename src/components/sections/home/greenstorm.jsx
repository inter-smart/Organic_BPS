import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import NumberTicker from "@/components/common/number-ticker";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function Greenstorm({ data }) {
  const [a, b, c, d] = data?.photos ?? [];
  const photo = (p, delay, extra = "") => (
    <Reveal variant="scale" delay={delay} className={`group relative overflow-hidden rounded-[20px] ${extra}`}>
      <Image
        src={p?.src}
        alt={p?.alt ?? ""}
        fill
        sizes="(min-width: 1200px) 33vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </Reveal>
  );

  return (
    <section id="greenstorm" aria-labelledby="greenstorm-title" className="relative overflow-hidden bg-white py-16 sm:py-20 xl:flex xl:h-270 xl:items-center xl:py-0">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 xl:grid-cols-[832fr_753fr] xl:gap-12">
          <Reveal variant="up">
            <Heading as="h2" id="greenstorm-title" size="display" className="text-black xl:max-w-208">
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <Reveal variant="up" delay={0.15} className="space-y-1 text-base/[1.8] text-black sm:text-lg/[1.8] xl:self-center xl:text-lead/[2]">
            {data?.paragraphs?.map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 xl:mt-9 xl:grid-cols-[1064fr_540fr] xl:gap-23">
          {/* photo mosaic */}
          <div className="flex flex-col gap-3">
            <div className="flex h-40 gap-3 sm:h-56 xl:h-74.75">
              {photo(a, 0, "flex-[539]")}
              {photo(b, 0.1, "flex-[507]")}
            </div>
            <div className="flex h-40 gap-3 sm:h-56 xl:h-72.75">
              {photo(c, 0.2, "flex-[632] border border-[#b9b7b7]")}
              {photo(d, 0.3, "flex-[417]")}
            </div>
          </div>

          {/* partners, stats, CTA */}
          <div className="flex flex-col xl:justify-between">
            <Reveal variant="up" className="flex items-center justify-between gap-6 xl:-mt-5">
              <div className="relative h-10 w-60 sm:h-12 sm:w-72 xl:h-18 xl:w-102.5">
                <Image src="/images/logo-unccd-g20.png" alt={data?.partners?.alt} fill sizes="410px" className="object-contain object-left mix-blend-darken" />
              </div>
              <div className="relative h-12 w-14 xl:h-20.75 xl:w-23.25">
                <Image src="/images/logo-greenstorm.png" alt={data?.partners?.markAlt} fill sizes="93px" className="object-contain" />
              </div>
            </Reveal>

            <dl className="mt-8 grid grid-cols-2 xl:mt-0 xl:w-[392px]">
              {data?.stats?.map((s, i) => (
                <Reveal
                  key={s?.id}
                  variant="up"
                  delay={0.1 * i}
                  className={`py-5 xl:py-0 xl:h-41.75 ${i % 2 === 0 ? "border-r border-[#d4d4d4] pr-4 xl:pr-0" : "pl-4 xl:pl-12"} ${i < 2 ? "border-b border-[#d4d4d4]" : ""} ${i < 2 ? "xl:pb-0" : "xl:pt-6"} xl:flex xl:flex-col xl:justify-center`}
                >
                  <dt className="order-2 text-sm text-black sm:text-base xl:text-lead">{s?.label}</dt>
                  <dd className="order-1 text-3xl/[1.2] font-medium text-black sm:text-4xl xl:text-[50px]/[1.2]">
                    <NumberTicker value={s?.value} suffix={s?.suffix} />
                  </dd>
                </Reveal>
              ))}
            </dl>

            <Reveal variant="up" delay={0.2} className="mt-8 xl:mt-0">
              <Button href={data?.cta?.href}>{data?.cta?.label}</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
