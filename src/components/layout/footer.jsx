import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function Footer({ data }) {
  return (
    <footer id="contact" className="bg-white">
      <div className="container mx-auto px-4 relative pt-12 pb-14 lg:pt-27 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0 lg:min-h-140.5">
          {/* brand + CTA headline */}
          <div className="flex flex-col justify-between gap-16 lg:pr-12">
            <Link href="/" aria-label="Organic BPS — home" className="relative block w-fit">
              <div className="relative aspect-250/47 w-48 lg:w-63.5">
                <Image src="/images/organic-bps-logo.png" alt={data?.logo?.alt ?? "Organic BPS"} fill sizes="254px" className="object-contain object-left" />
              </div>
              <div className="absolute -top-0.5 right-0 w-2.5 lg:w-3">
                <Image src="/images/registered-mark.svg" alt="" width={10} height={10} className="size-full" />
              </div>
            </Link>
            <Reveal variant="up">
              <Heading as="h2" size="footer" className="text-black">
                <RichLines lines={data?.title} />
              </Heading>
            </Reveal>
          </div>

          {/* contact column, with the vertical divider on lg+ */}
          <div className="flex flex-col gap-10 lg:border-l lg:border-[#d9d9d9] lg:gap-0 lg:pl-27.5">
            <nav aria-label="Legal" className="flex gap-12 lg:gap-17.5">
              {data?.legal?.map((l) => (
                <Link
                  key={l?.id}
                  href={l?.href ?? "#"}
                  className="border-b border-basecolor pb-1 text-sm font-semibold tracking-wide text-black uppercase transition-colors hover:text-basecolor lg:pb-0 lg:text-[clamp(14px,calc(22*var(--u)),22px)]"
                >
                  {l?.label}
                </Link>
              ))}
            </nav>
            <Reveal as="p" variant="up" className="text-base/[1.6] font-medium text-black sm:text-lg/[1.6] lg:mt-31 lg:max-w-118.25 lg:text-lead/[1.5] text-pretty">
              {data?.text}
            </Reveal>
            <Reveal as="p" variant="up" delay={0.1} className="text-3xl font-semibold text-basecolor lg:mt-17.5 lg:text-title">
              {data?.welcome}
            </Reveal>
            <Reveal variant="up" delay={0.2} className="lg:mt-23">
              <Button href={data?.cta?.href}>{data?.cta?.label}</Button>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="bg-black text-white">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4 py-5 text-center text-sm sm:text-base md:flex-row md:justify-between lg:min-h-22.75 lg:py-3 lg:text-[clamp(14px,calc(18*var(--u)),18px)]">
          <p className="md:flex-1 md:text-left">{data?.copyright}</p>
          <ul className="flex items-center gap-2 md:flex-1 md:justify-center">
            {data?.social?.map((s) => (
              <li key={s?.id}>
                <a
                  href={s?.href ?? "#"}
                  aria-label={s?.label}
                  className="relative block size-9 transition-transform duration-300 hover:-translate-y-1 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:size-10"
                >
                  <Image src={s?.icon} alt="" fill className="object-contain" />
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2 text-[#fffbfb] md:flex-1 md:justify-end lg:text-[clamp(14px,calc(18*var(--u)),18px)]">
            <span>{data?.credit?.label}</span>
            <a href={data?.credit?.href} target="_blank" rel="noopener noreferrer" aria-label={data?.credit?.name} className="inline-flex">
              <Image src="/images/partner-credit.png" alt="" width={111} height={16} unoptimized className="h-4 w-auto" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
