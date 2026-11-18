import Image from "next/image";
import { cn } from "@/lib/utils";

const OPENING = /^["'“‘«]/;
const CLOSING = /["'”’»]$/;

function withQuotes(text) {
  const value = typeof text === "string" ? text.trim() : "";
  if (!value) return value;
  const start = OPENING.test(value) ? "" : "“";
  const end = CLOSING.test(value) ? "" : "”";
  return `${start}${value}${end}`;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  logo,
  className,
}) {
  return (
    <figure
      className={cn(
        "tcard relative isolate flex h-full min-h-[360px] flex-col px-6 pt-24 pb-28 text-white lg:min-h-[calc(608*var(--u))] lg:pt-[calc(181*var(--u))] lg:pr-[calc(90*var(--u))] lg:pb-[calc(88*var(--u))] lg:pl-[calc(130*var(--u))]",
        className,
      )}
    >
      <Image
        src="/images/how-we-work/quote-left.svg"
        alt=""
        width={82}
        height={53}
        className="absolute top-8 left-6 h-auto w-14 lg:top-[calc(50*var(--u))] lg:left-[calc(108*var(--u))] lg:w-[calc(82*var(--u))]"
      />
      <blockquote className="max-w-[18em] text-[22px]/[1.25] tracking-[-0.012em] text-pretty sm:text-[26px] lg:text-[clamp(22px,calc(35*var(--u)),35px)]/[1.25]">
        <p>{withQuotes(quote)}</p>
      </blockquote>
      <figcaption className="mt-8 lg:mt-auto lg:pt-[calc(60*var(--u))]">
        <span aria-hidden="true" className="block h-0.5 w-10 bg-basecolor" />
        <span className="mt-4 block font-inter text-base/[1.35] font-semibold tracking-[0.005em] lg:mt-[calc(18*var(--u))] lg:text-[clamp(15px,calc(20*var(--u)),20px)]/[1.35]">
          {name}
        </span>
        <span className="mt-1 block font-inter text-sm/[1.5] lg:text-[clamp(14px,calc(18*var(--u)),18px)]/[1.5]">
          {role}
        </span>
      </figcaption>
      {logo ? (
        <Image
          src={logo}
          alt={name}
          width={300}
          height={356}
          sizes="(min-width: 1024px) 14vw, 80px"
          style={{ "--logo-w": 15.4 }}
          className="absolute right-6 bottom-6 h-auto w-16 lg:top-[75%] lg:right-[calc(64*var(--u))] lg:bottom-auto lg:w-[calc(var(--logo-w)*1%)] lg:-translate-y-1/2"
        />
      ) : null}
    </figure>
  );
}
