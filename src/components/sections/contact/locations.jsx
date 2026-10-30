import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function Locations({ data }) {
  return (
    <section id="locations" aria-labelledby="locations-title" className="relative bg-basecolor7 py-16 text-white sm:py-20 lg:py-[calc(100*var(--u))]">
      <div className="container mx-auto px-4">
        <Reveal variant="up">
          <Heading as="h2" id="locations-title" size="display" className="text-white">
            <RichLines lines={data?.title} />
          </Heading>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-[calc(90*var(--u))] lg:gap-0">
          {data?.offices?.map((office, i) => (
            <Reveal
              key={office?.id}
              variant="up"
              delay={0.1 * i}
              className={i === 0 ? "sm:border-r sm:border-white/15 sm:pr-10 lg:pr-[calc(60*var(--u))]" : "sm:pl-10 lg:pl-[calc(60*var(--u))]"}
            >
              <p className="text-xs font-bold tracking-[0.2em] text-basecolor uppercase lg:text-[clamp(13px,calc(20*var(--u)),20px)]">{office?.country}</p>
              <p className="mt-2 text-3xl font-medium lg:mt-[calc(12*var(--u))] lg:text-[clamp(28px,calc(50*var(--u)),50px)]">{office?.city}</p>
              <p className="mt-4 max-w-100 text-base text-white/60 lg:mt-[calc(26*var(--u))] lg:text-lead">{office?.address}</p>
              <a href={`mailto:${office?.email}`} className="mt-4 block text-base underline hover:text-white/80 lg:mt-[calc(24*var(--u))] lg:text-lead">
                {office?.email}
              </a>
              <a href={`tel:${office?.phone?.replace(/\s+/g, "")}`} className="mt-1 block text-base underline hover:text-white/80 lg:text-lead">
                {office?.phone}
              </a>
              {office?.mapHref ? (
                <div className="mt-6 lg:mt-[calc(34*var(--u))]">
                  <Button href={office.mapHref} variant="dark" size="sm" target="_blank" rel="noopener noreferrer">
                    Location Map
                  </Button>
                </div>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
