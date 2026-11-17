import Image from "next/image";
import Link from "next/link";

/** End of the article: next link and author bio. */
export default function Close({ data }) {
  return (
    <div className="mt-12 lg:mt-[calc(61*var(--u))]">
      <div className="h-px bg-basecolor16" />
      <div className="flex justify-end py-6 lg:py-[calc(33*var(--u))]">
        <Link
          href="/blog"
          className="group flex items-center gap-2.5 text-base font-semibold text-basecolor7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor3 lg:text-[clamp(14px,calc(18*var(--u)),18px)]"
        >
          Next perspective
          <Image
            src="/images/arrow-right-red.svg"
            alt=""
            width={18}
            height={18}
            className="size-[18px] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </div>
      <section
        aria-label="About the author"
        className="flex flex-col items-start gap-5 rounded-3xl bg-basecolor15 p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-8 lg:rounded-[calc(24*var(--u))] lg:gap-[calc(28*var(--u))] lg:p-[calc(32*var(--u))]"
      >
        <Image
          src={data?.author?.imageLarge?.src}
          alt={data?.author?.imageLarge?.alt ?? ""}
          width={112}
          height={112}
          className="size-20 shrink-0 rounded-full object-cover lg:size-[calc(112*var(--u))]"
        />
        <div className="min-w-0 lg:max-w-[945px]">
          <p className="text-xs font-bold tracking-[0.16em] text-basecolor14 uppercase lg:text-[clamp(11px,calc(16*var(--u)),16px)]">
            About the author
          </p>
          <p className="mt-2 text-2xl font-bold text-basecolor7 lg:mt-[calc(9*var(--u))] lg:text-[clamp(20px,calc(26*var(--u)),26px)]">
            {data?.author?.name}
          </p>
          <p className="mt-2 text-base/[1.55] text-basecolor9 lg:mt-[calc(9*var(--u))] lg:text-[clamp(14px,calc(18*var(--u)),18px)]/[1.55]">
            {data?.author?.bio}
          </p>
        </div>
      </section>
    </div>
  );
}
