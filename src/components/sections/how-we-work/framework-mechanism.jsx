import Image from "next/image";
import Reveal from "@/components/common/reveal";
import { artboard, cqw } from "@/components/sections/how-we-work/diagram-box";

const W = 1145;
const at = artboard(W, 488);
const src = (name) => `/images/how-we-work/${name}.svg`;
const pedestal = "dg-pop absolute border-basecolor25 bg-white";
const label = "dg-label absolute -translate-x-1/2 text-center font-bold whitespace-nowrap text-basecolor25";

// wheel = [file, x, y, size, seconds per turn, reverse]
const wheels = [
  ["behaviour-wheel", 97, 165, 260, 40, false],
  ["belief-wheel", 138, 213, 178, 30, true],
  ["purpose-core", 179, 257, 98, 22, false],
];

export default function FrameworkMechanism({ data }) {
  return (
    <Reveal variant="fade" once amount={0.3} data-diagram="" role="region" aria-label={data?.scrollLabel} tabIndex={0} className="mt-7 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor3 md:overflow-visible lg:mt-[calc(28*var(--u))]">
      <div role="img" aria-label={data?.label} style={{ containerType: "inline-size" }} className="relative mx-auto aspect-[1145/488] w-full min-w-[640px] max-w-[1145px]">
        <div aria-hidden="true">
          <Image src={src("drive-belt")} alt="" width={554} height={364} style={at(255.4, 51.4, 554.2, 364.2)} className="dg-line absolute max-w-none" />

          <span style={{ ...at(212, 416, 24, 23), borderWidth: "0.245cqw" }} className={pedestal} />
          <span style={{ ...at(842, 418, 19, 21), borderWidth: "0.245cqw" }} className={pedestal} />
          <span style={{ ...at(173, 437, 752, 28), borderWidth: "0.245cqw" }} className={pedestal} />

          {wheels.map(([file, x, y, size, seconds, reverse], i) => (
            <span key={file} style={{ ...at(x, y, size, size), "--dg-i": i + 1 }} className="dg-pop absolute">
              <Image src={src(file)} alt="" width={size} height={size} style={{ "--dg-t": `${seconds}s`, "--dg-dir": reverse ? "reverse" : "normal" }} className="dg-orbit size-full max-w-none" />
            </span>
          ))}

          <Image src={src("growth-wheel")} alt="" width={384} height={384} style={{ ...at(658, 47, 384, 384), "--dg-i": 1 }} className="dg-pop absolute max-w-none" />
          <Image src={src("wheel-rim")} alt="" width={324} height={324} style={{ ...at(689, 76, 324, 324), "--dg-i": 2 }} className="dg-pop absolute max-w-none" />
          <Image src={src("inner-rim")} alt="" width={312} height={312} style={{ ...at(695, 82, 312, 312), "--dg-i": 3 }} className="dg-pop absolute max-w-none" />
          <span style={{ ...at(694.2, 82.2, 313.2, 311.4), "--dg-i": 3 }} className="dg-pop absolute">
            <Image src={src("spokes")} alt="" width={313} height={311} style={{ "--dg-t": "20s", "--dg-dir": "reverse" }} className="dg-orbit size-full max-w-none" />
          </span>
          <Image src={src("growth-core")} alt="" width={160} height={160} style={{ ...at(770, 159, 160, 160), "--dg-i": 4 }} className="dg-pop absolute max-w-none" />
        </div>

        <p style={{ left: "74.28%", top: "44.88%", fontSize: cqw(20, W, 9), lineHeight: 1.13, "--dg-i": 5 }} className={label}>
          {data?.growth?.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p style={{ left: "19.83%", top: "38.11%", fontSize: cqw(17, W, 8), lineHeight: 1.13, "--dg-i": 6 }} className={label}>
          {data?.behaviour}
        </p>
        <p style={{ left: "19.83%", top: "47.13%", fontSize: cqw(17, W, 8), lineHeight: 1.13, "--dg-i": 7 }} className={label}>
          {data?.belief}
        </p>
        <p style={{ left: "19.87%", top: "60.45%", fontSize: cqw(17, W, 8), lineHeight: 1.13, "--dg-i": 8 }} className={label}>
          {data?.purpose}
        </p>
      </div>
    </Reveal>
  );
}
