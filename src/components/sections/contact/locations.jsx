import { Mail, Phone } from "lucide-react";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function Locations({ data }) {
  return (
    <section
      id="locations"
      aria-labelledby="locations-title"
      className="relative bg-basecolor7 py-16 text-white sm:py-20 lg:py-27.5! 2xl:py-37.5! 3xl:py-45!"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[2fr_3fr] lg:gap-0">
          <div>
            <Reveal variant="up">
              <Heading
                as="h2"
                id="locations-title"
                size="display"
                className="text-white 3xl:text-[100px]!"
              >
                <RichLines lines={data?.title} />
              </Heading>
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.1}
              className="mt-6 text-base/[1.6] font-medium text-white sm:text-lg/[1.6] lg:mt-[calc(36*var(--u))] lg:text-body"
            >
              {data?.text}
            </Reveal>
            {data?.map?.href ? (
              <Reveal
                variant="up"
                delay={0.2}
                className="mt-8 lg:mt-[calc(40*var(--u))]"
              >
                <Button variant="dark">{data.map.label}</Button>
              </Reveal>
            ) : null}
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-basecolor8 uppercase lg:text-eyebrow 3xl:text-xl">
              {data?.eyebrow}
            </p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:mt-[calc(60*var(--u))] lg:gap-0">
              {data?.offices?.map((office, i) => (
                <Reveal
                  key={office?.id}
                  variant="up"
                  delay={0.1 * i}
                  className={
                    i === 0
                      ? "sm:border-r sm:border-white/15 sm:pr-10 lg:pr-[calc(60*var(--u))]"
                      : "sm:pl-10 lg:pl-[calc(60*var(--u))]"
                  }
                >
                  <h3 className="text-3xl font-medium lg:text-[clamp(28px,calc(50*var(--u)),50px)] 3xl:text-[50px]">
                    {office?.city}
                  </h3>
                  <p className="mt-2 text-xs font-bold tracking-[0.3em] text-basecolor8 uppercase lg:mt-[calc(12*var(--u))] lg:text-eyebrow 3xl:text-xl">
                    {office?.country}
                  </p>
                  <p className="mt-4 max-w-100 text-base text-[#767575] lg:mt-[calc(26*var(--u))] lg:text-lead 3xl:text-xl">
                    {office?.address}
                  </p>
                  <a
                    href={`mailto:${office?.email}`}
                    className="mt-6 flex items-center gap-3 text-base underline hover:text-white/80 lg:mt-[calc(40*var(--u))] lg:text-lead 3xl:text-xl"
                  >
                    <Mail
                      aria-hidden="true"
                      className="size-4 shrink-0 text-basecolor"
                    />
                    {office?.email}
                  </a>
                  <a
                    href={`tel:${office?.phone?.replace(/\s+/g, "")}`}
                    className="mt-3.75 flex items-center gap-3 text-base underline hover:text-white/80 lg:text-lead 3xl:text-xl"
                  >
                    <Phone
                      aria-hidden="true"
                      className="size-4 shrink-0 text-basecolor"
                    />
                    {office?.phone}
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
