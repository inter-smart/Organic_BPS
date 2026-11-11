import Image from "next/image";
import Reveal from "@/components/common/reveal";
import { artboard, cqw } from "@/components/sections/how-we-work/diagram-box";

const W = 718;
const at = artboard(W, 694);
const src = (name) => `/images/how-we-work/${name}.svg`;

// circle = [x, y, w, h]; label = [centre x, title top]; icon = [file, x, y, w, h]; drift = px travelled by the slow float
const layout = {
  history: { circle: ["circle-history", 4.74, 0, 423.78, 406.86], label: [199.9, 161.2], icon: ["icon-history", 164.9, 68.25, 78.53, 73.11], drift: 7 },
  strengths: { circle: ["circle-strengths", 292.45, 0, 425.81, 406.86], label: [536.8, 160.5], icon: ["icon-strengths", 488.2, 62.2, 97.48, 75.82], drift: -6 },
  stakeholders: { circle: ["circle-stakeholders", 0, 283.92, 429.87, 409.56], label: [202.7, 525.8], icon: ["icon-stakeholders", 157.4, 438.06, 92.07, 60.93], drift: -7 },
  ambitions: { circle: ["circle-ambitions", 292.45, 284.59, 430.55, 412.95], label: [524.4, 524.7], icon: ["icon-ambitions-chart", 486.4, 448.5, 75.82, 53.7], drift: 6 },
};

// where two circles overlap
const overlaps = [
  ["overlap-history-strengths", 292.45, 54.43, 135.39, 292.45],
  ["overlap-history-stakeholders", 66.35, 284.59, 295.16, 121.85],
  ["overlap-strengths-ambitions", 361.5, 284.59, 293.8, 121.85],
];

export default function PurposeMap({ data }) {
  const items = data?.items ?? [];
  const summary = items.map((item) => `${item.title}: ${item.text.replace("\n", " ")}`).join(". ");

  return (
    <Reveal variant="fade" once amount={0.25} data-diagram="" className="mx-auto w-full max-w-[718px] lg:mx-0 lg:max-w-none">
      <div role="img" aria-label={`${data?.label}. ${summary}`} style={{ containerType: "inline-size" }} className="relative aspect-[718/694] w-full">
        <div aria-hidden="true">
          {items.map((item, i) => {
            const [file, x, y, w, h] = layout[item.id]?.circle ?? [];
            return (
              <span key={item.id} style={{ ...at(x, y, w, h), "--dg-i": i, "--dg-d": i * 0.4, "--dg-fy": layout[item.id]?.drift }} className="dg-pop dg-float absolute">
                <Image src={src(file)} alt="" width={Math.round(w)} height={Math.round(h)} className="size-full max-w-none" />
              </span>
            );
          })}

          {overlaps.map(([file, x, y, w, h]) => (
            <Image key={file} src={src(file)} alt="" width={Math.round(w)} height={Math.round(h)} style={{ ...at(x, y, w, h), "--dg-d": 0.9 }} className="dg-fade absolute max-w-none" />
          ))}

          <Image src={src("brandfarm-core")} alt="" width={304} height={306} style={{ ...at(209.6, 195.2, 303.93, 305.7), "--dg-i": 4 }} className="dg-pop absolute max-w-none" />
          <Image src={src("brandfarm-logo")} alt="" width={178} height={89} style={{ ...at(275, 293.5, 178.4, 89.4), "--dg-i": 5 }} className="dg-pop absolute max-w-none" />

          {items.map((item, i) => {
            const [file, x, y, w, h] = layout[item.id]?.icon ?? [];
            return <Image key={item.id} src={src(file)} alt="" width={Math.round(w)} height={Math.round(h)} style={{ ...at(x, y, w, h), "--dg-i": i + 5 }} className="dg-pop absolute max-w-none" />;
          })}
          <Image src={src("icon-ambitions-arrow")} alt="" width={70} height={47} style={{ ...at(484.7, 423.7, 70.4, 47.39), "--dg-i": 8 }} className="dg-pop absolute max-w-none" />
        </div>

        {items.map((item, i) => {
          const [cx, top] = layout[item.id]?.label ?? [];
          return (
            <div key={item.id} aria-hidden="true" style={{ ...at(cx, top), "--dg-i": i + 5 }} className="dg-label absolute w-[38%] -translate-x-1/2 text-center">
              <p style={{ fontSize: cqw(27.77, W, 13), lineHeight: 1.617 }} className="font-semibold whitespace-nowrap text-basecolor25">{item.title}</p>
              <p style={{ fontSize: cqw(20.48, W, 11), lineHeight: 1.29 }} className="font-inter whitespace-pre-line text-basecolor9">{item.text}</p>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
