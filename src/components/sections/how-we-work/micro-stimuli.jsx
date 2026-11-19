import Image from "next/image";
import Reveal from "@/components/common/reveal";
import { paragraphs } from "@/lib/cms-text";

export default function MicroStimuli({ data }) {
  return (
    <section
      id="micro-stimuli"
      aria-labelledby="micro-stimuli-title"
      className="px-4 py-10 sm:py-20 lg:py-[calc(100*var(--u))] lg:pr-[calc(41*var(--u))] lg:pl-[calc(59*var(--u))]"
    >
      <div className="grid gap-5 lg:grid-cols-[936fr_664fr]">
        <Reveal
          variant="up"
          className="relative aspect-936/470 overflow-hidden rounded-[24px] lg:rounded-[calc(44*var(--u))]"
        >
          <Image
            src={data?.image}
            alt={data?.title ?? ""}
            title={data?.title?? ""}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal
          variant="up"
          delay={0.15}
          className="h-auto flex flex-col justify-center rounded-[24px] bg-white px-6 py-10 lg:rounded-[calc(31*var(--u))] lg:py-[calc(40*var(--u))] lg:pr-[calc(30*var(--u))] lg:pl-[calc(42*var(--u))]"
        >
          {/* <span
            aria-hidden="true"
            className="bg-linear-to-t from-[rgba(102,102,102,0)] from-[14.9%] to-[#e8e8e8] bg-clip-text text-6xl/[1.4] font-bold tracking-[-0.02em] text-transparent opacity-[0.53] lg:-mb-[calc(22*var(--u))] lg:text-[clamp(48px,calc(80*var(--u)),80px)]/[1.4]"
          >
            {data?.number}
          </span> */}
          <h3
            id="micro-stimuli-title"
            className="text-4xl/[1.12] font-bold sm:text-5xl/[1.12] tracking-[-0.02em] text-basecolor25 lg:text-[clamp(40px,calc(100*var(--u)),100px)]/[1.12]"
          >
            {data?.title}
          </h3>
          <p className="mt-3 max-w-[521px] text-base/[1.5] font-medium text-pretty text-basecolor2 lg:mt-[calc(8*var(--u))] lg:text-lead/[1.5]">
            {paragraphs(data?.description)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
