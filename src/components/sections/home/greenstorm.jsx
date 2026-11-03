import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import NumberTicker from "@/components/common/number-ticker";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function Greenstorm({ data }) {
  const [a, b, c, d] = data?.photos ?? [];
  const photo = (p, delay, extra = "") => (
    <Reveal
      variant="clip"
      delay={delay}
      className={`group relative overflow-hidden rounded-[20px] ${extra}`}
    >
      <Parallax className="absolute inset-0" from={-6} to={6}>
        <Image
          src={p?.src}
          alt={p?.alt ?? ""}
          fill
          sizes="(min-width: 1280px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Parallax>
    </Reveal>
  );

  return (
    <section
      id="greenstorm"
      aria-labelledby="greenstorm-title"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:flex lg:min-h-270 lg:items-center lg:py-0"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-[832fr_753fr] lg:gap-12">
          <Reveal variant="up">
            <Heading
              as="h2"
              id="greenstorm-title"
              size="display"
              className="text-black lg:max-w-208"
            >
              <RichLines lines={data?.title} />
            </Heading>
          </Reveal>
          <Reveal
            variant="up"
            delay={0.15}
            className="space-y-1 text-base/[1.8] text-black sm:text-lg/[1.8] lg:self-center lg:text-lead/[2]"
          >
            {data?.paragraphs?.map((p, i) => (
              <p key={i} className="text-pretty">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-9 lg:grid-cols-[1064fr_540fr] lg:gap-23">
          <div className="flex flex-col gap-3">
            <div className="flex h-40 gap-3 sm:h-56 lg:h-74.75">
              {photo(a, 0, "flex-[539]")}
              {photo(b, 0.1, "flex-[507]")}
            </div>
            <div className="flex h-40 gap-3 sm:h-56 lg:h-72.75">
              {photo(c, 0.2, "flex-[632] border border-[#b9b7b7]")}
              {photo(d, 0.3, "flex-[417]")}
            </div>
          </div>
          <div className="flex flex-col lg:justify-between">
            <Reveal
              variant="up"
              className="flex items-center justify-between gap-6 lg:-mt-5"
            >
              <div className="relative h-10 w-60 sm:h-12 sm:w-72 lg:h-18 lg:w-102.5">
                <Image
                  src="/images/logo-unccd-g20.png"
                  alt={data?.partners?.alt}
                  fill
                  sizes="410px"
                  className="object-contain object-left mix-blend-darken"
                />
              </div>
              <div className="relative h-12 w-14 lg:h-20.75 lg:w-23.25">
                <Image
                  src="/images/logo-greenstorm.png"
                  alt={data?.partners?.markAlt}
                  fill
                  sizes="93px"
                  className="object-contain"
                />
              </div>
            </Reveal>
            <dl className="relative mt-8 grid grid-cols-2 lg:mt-0 lg:w-[calc(392*var(--u))] before:absolute before:left-0 before:right-0 before:top-1/2 before:h-px before:bg-[linear-gradient(90deg,transparent,#d4d4d4_50%,#d4d4d4_50%,transparent)] after:absolute after:left-1/2 after:top-0 after:bottom-0 after:w-px after:bg-[linear-gradient(180deg,transparent,#d4d4d4_50%,#d4d4d4_50%,transparent)]">
              {data?.stats?.map((s, i) => (
                <Reveal
                  key={s?.id}
                  variant="up"
                  delay={0.1 * i}
                  className={`relative py-5 lg:py-0 lg:h-41.75 ${i % 2 === 0 ? "pr-0" : "pl-4 lg:pl-12"} ${i < 2 ? "" : ""} ${i < 2 ? "pb-0" : "lg:pt-6"} lg:flex lg:flex-col lg:justify-center`}
                >
                  <dt className="order-2 text-sm text-black sm:text-base lg:text-lead">
                    {s?.label}
                  </dt>
                  <dd className="order-1 text-3xl/[1.2] font-medium text-black sm:text-4xl lg:text-[clamp(26px,calc(50*var(--u)),50px)]/[1.2]">
                    <NumberTicker value={s?.value} suffix={s?.suffix} />
                  </dd>
                </Reveal>
              ))}
            </dl>
            <Reveal variant="up" delay={0.2} className="mt-8 lg:mt-0">
              <Button href={data?.cta?.href}>{data?.cta?.label}</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
