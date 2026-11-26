import Image from "next/image";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { renderTitle } from "@/components/common/rich-text";
import { listItems, paragraphs, text } from "@/lib/cms-text";

const places = {
  top_left: {
    symbol: "lg:top-[calc(42*var(--u))] lg:left-[calc(134*var(--u))]",
    label:
      "lg:top-[calc(55*var(--u))] lg:left-[calc(-6*var(--u))] lg:w-[calc(179*var(--u))]",
  },
  top_right: {
    symbol: "lg:top-[calc(42*var(--u))] lg:left-[calc(578*var(--u))]",
    label:
      "lg:top-[calc(137*var(--u))] lg:left-[calc(697*var(--u))] lg:w-[calc(145*var(--u))]",
  },
  bottom_left: {
    symbol: "lg:top-[calc(394*var(--u))] lg:left-[calc(134*var(--u))]",
    label:
      "lg:top-[calc(538*var(--u))] lg:left-[calc(68*var(--u))] lg:w-[calc(178*var(--u))]",
  },
  bottom_right: {
    symbol: "lg:top-[calc(394*var(--u))] lg:left-[calc(578*var(--u))]",
    label:
      "lg:top-[calc(508*var(--u))] lg:left-[calc(697*var(--u))] lg:w-[calc(160*var(--u))]",
  },
};

const dots = [
  "lg:top-[calc(180*var(--u))] lg:left-[calc(309*var(--u))]",
  "lg:top-[calc(180*var(--u))] lg:left-[calc(507*var(--u))]",
  "lg:top-[calc(387*var(--u))] lg:left-[calc(309*var(--u))]",
  "lg:top-[calc(387*var(--u))] lg:left-[calc(507*var(--u))]",
];

export default function Importance({ data, benefits = [], title }) {
  const [intro] = paragraphs(data?.note);
  const core = benefits.find((b) => b.position === "center");
  const around = benefits.filter((b) => b.position !== "center");

  return (
    <section
      id="why-purpose-matters"
      aria-labelledby="matters-title"
      className="bg-white py-16 sm:py-20 lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[806fr_914fr] lg:items-start lg:gap-0">
          <div>
            <Reveal variant="up">
              <Heading
                as="h2"
                id="matters-title"
                size="display"
                className="text-basecolor26 tracking-normal lg:max-w-[calc(543*var(--u))] lg:leading-[0.98]"
              >
                {renderTitle(title)}
              </Heading>
            </Reveal>
            <Reveal
              variant="up"
              delay={0.1}
              className="mt-8 rounded-[19px] bg-white px-6 py-6 shadow-[0_0_20px_rgba(0,0,0,0.25)] lg:mt-[calc(51*var(--u))] lg:max-w-[calc(746*var(--u))] lg:rounded-[calc(19*var(--u))] lg:px-[calc(38*var(--u))] lg:py-[calc(23*var(--u))]"
            >
              <p className="text-lg font-medium text-basecolor25 lg:text-[clamp(16px,calc(25*var(--u)),25px)]/[1.44]">
                {intro}
              </p>
              <ul className="mt-3 lg:mt-[calc(18*var(--u))]">
                {listItems(data?.note).map((q) => (
                  <li
                    key={q}
                    className="text-lg/[1.44] font-bold text-basecolor25 lg:text-[clamp(16px,calc(25*var(--u)),25px)]/[1.44]"
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.2}
              className="mt-8 text-base/[1.7] text-basecolor25 lg:mt-[calc(33*var(--u))] lg:max-w-[calc(684*var(--u))] lg:text-lead/[1.74]"
            >
              {text(data?.description)}
            </Reveal>
          </div>

          <Reveal
            variant="fade"
            once
            amount={0.3}
            data-diagram=""
            className="lg:mt-[calc(41*var(--u))]"
          >
            <div
              role="group"
              aria-label={"What a shared direction does"}
              className="relative mx-auto max-w-[420px] lg:mx-0 lg:h-[calc(620*var(--u))] lg:w-[calc(840*var(--u))] lg:max-w-none"
            >
              <div aria-hidden="true" className="hidden lg:block">
                <Image
                  src="/images/why-purpose/cross-axes.png"
                  alt="Cross axes"
                  title="Cross axes"
                  width={396}
                  height={396}
                  className="dg-axes absolute top-[calc(88*var(--u))] left-[calc(214*var(--u))] size-[calc(396*var(--u))] max-w-none"
                />
                <Image
                  src="/images/why-purpose/orbit.png"
                  alt="Orbit"
                  title="Orbit"
                  width={396}
                  height={396}
                  className="dg-axes dg-orbit absolute top-[calc(88*var(--u))] left-[calc(214*var(--u))] size-[calc(396*var(--u))] max-w-none"
                />
                <Image
                  src="/images/why-purpose/connections.svg"
                  alt="Connections"
                  title="Connections"
                  width={516}
                  height={382}
                  className="dg-line absolute top-[calc(100*var(--u))] left-[calc(156.5*var(--u))] h-[calc(382.4*var(--u))] w-[calc(515.5*var(--u))] max-w-none"
                />
              </div>
              {dots.map((pos, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  style={{ "--dg-i": i }}
                  className={`dg-dot absolute hidden size-[calc(10*var(--u))] rounded-full bg-basecolor17 lg:block ${pos}`}
                />
              ))}

              <div
                style={{ "--dg-i": 0 }}
                className="dg-pop mx-auto flex size-55 flex-col items-center justify-center rounded-full bg-basecolor text-center text-white lg:absolute lg:top-[calc(170*var(--u))] lg:left-[calc(290*var(--u))] lg:size-[calc(244*var(--u))]"
              >
                {core?.icon && (
                  <Image
                    src={core?.icon}
                    alt="Purpose core"
                    title="Purpose core"
                    width={72}
                    height={72}
                    unoptimized
                    className="size-12 lg:size-[calc(72*var(--u))]"
                  />
                )}

                <p className="mt-2 font-roboto text-lg sm:text-xl/[1.03] font-bold lg:mt-[calc(10*var(--u))] lg:w-[calc(144*var(--u))] lg:text-[clamp(18px,calc(34*var(--u)),34px)]/[1.03]">
                  {core?.title}
                </p>
              </div>

              <ul className="mt-8 grid gap-6 grid-cols-2 lg:mt-0 lg:block">
                {around.map((b, i) => (
                  <li
                    key={b.id}
                    className="flex max-lg:flex-col max-lg:text-center items-center gap-4 lg:block"
                  >
                    <Image
                      src={b.icon}
                      alt={b.title ?? "Purpose icon"}
                      title={b.title ?? "Purpose icon"}
                      width={114}
                      height={114}
                      unoptimized
                      style={{ "--dg-i": i + 1 }}
                      className={`dg-pop size-20 shrink-0 lg:absolute lg:size-[calc(114*var(--u))] ${places[b.position]?.symbol}`}
                    />
                    <span
                      style={{ "--dg-i": i + 1 }}
                      className={`dg-label whitespace-pre-line text-sm sm:text-base/[1.15] font-medium text-basecolor25 lg:absolute lg:text-[clamp(14px,calc(22*var(--u)),22px)] ${places[b.position]?.label}`}
                    >
                      {b.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
