import Reveal from "@/components/common/reveal";

/** The four framework principles; each one steps in after the one before it. */
export default function FrameworkSteps({ data }) {
  return (
    <ol
      aria-label={data?.label}
      className="mx-auto mt-10 grid max-w-[1145px] gap-8 sm:grid-cols-2 lg:mt-[calc(44*var(--u))] lg:grid-cols-4 lg:gap-0"
    >
      {data?.items?.map((item, i) => (
        <Reveal
          as="li"
          key={item.id}
          variant="up"
          once
          delay={i * 0.4}
          className="relative flex flex-col items-center px-4 text-center lg:pt-[calc(10*var(--u))] lg:before:absolute lg:before:top-[calc(22*var(--u))] lg:before:left-0 lg:before:h-[calc(87*var(--u))] lg:before:w-[1.5px] lg:before:bg-basecolor23 lg:first:before:hidden"
        >
          <span
            aria-hidden="true"
            className="font-roboto text-xl/[1.18] font-semibold text-[#FF5847] lg:text-[clamp(16px,calc(22*var(--u)),22px)]"
          >
            {item.number}
          </span>
          <h3 className="mt-1 font-inter text-lg/[1.2] font-bold text-[#171717] uppercase lg:text-[clamp(15px,calc(20*var(--u)),20px)]/[1.2]">
            {item.title}
          </h3>
          <p className="mt-1 max-w-[16em] font-inter text-base/[1.22] font-medium text-pretty whitespace-pre-line text-[#414E58] lg:text-[clamp(14px,calc(18*var(--u)),18px)]/[1.22]">
            {item.text}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
