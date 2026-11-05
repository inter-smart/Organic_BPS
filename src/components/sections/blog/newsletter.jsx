"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";

export default function Newsletter({ data }) {
  const [done, setDone] = useState(false);
  const [before, after] = (data?.note ?? "").split(data?.privacy?.label ?? "\u0000");

  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="bg-basecolor14 py-16 text-white sm:py-20 lg:py-[calc(63*var(--u))]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[1160fr_560fr] lg:items-center lg:gap-0">
          <Reveal variant="up">
            <Heading as="h2" id="newsletter-title" size="displayMd" className="text-white lg:max-w-[686px] lg:text-wrap lg:text-[clamp(32px,calc(62*var(--u)),62px)]/[1.03] lg:tracking-[-0.02em]">
              {data?.title}
            </Heading>
          </Reveal>

          <Reveal variant="up" delay={0.15} className="lg:max-w-[520px]">
            <p className="text-base/[1.5] sm:text-lg/[1.5]">{data?.text}</p>
            {done ? (
              <p role="status" className="mt-6 text-lg font-semibold lg:mt-[calc(22*var(--u))]">
                {data?.form?.done}
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="mt-6 flex items-center gap-2 rounded-full bg-white p-2 pl-5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white lg:mt-[calc(22*var(--u))] lg:pl-[calc(22*var(--u))]"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  {data?.form?.label}
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={data?.form?.placeholder}
                  className="min-w-0 flex-1 bg-transparent text-base text-basecolor7 outline-none placeholder:text-basecolor9 lg:text-[clamp(14px,calc(18*var(--u)),18px)]"
                />
                <button type="submit" className="flex shrink-0 items-center gap-2.5 rounded-full bg-basecolor7 px-5 py-3 text-xs font-semibold text-white transition-colors duration-300 hover:bg-basecolor2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basecolor3 motion-reduce:transition-none lg:px-[calc(20*var(--u))] lg:py-[calc(13*var(--u))] lg:text-[clamp(12px,calc(13*var(--u)),13px)]">
                  {data?.form?.submit}
                  <Image src="/images/blog/subscribe-arrow.svg" alt="" width={15} height={15} className="size-[15px]" />
                </button>
              </form>
            )}
            <p className="mt-5 text-sm/[1.4] text-white lg:mt-[calc(22*var(--u))] lg:text-[clamp(13px,calc(18*var(--u)),18px)]">
              {before}
              {after !== undefined ? (
                <Link href={data?.privacy?.href} className="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  {data?.privacy?.label}
                </Link>
              ) : null}
              {after}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
