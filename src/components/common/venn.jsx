"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * Business · People · Planet diagram. Circles grow in from their own centres, the labels follow, and the three
 * coloured dots then travel round their circles for as long as the diagram is on screen.
 * Circles, labels and icons follow the CMS list (core_belief, by sort_order, up to three). Coordinates are the Figma ones (1920 frame) shifted so the artwork starts at 0,0.
 * With reduced motion the finished diagram is shown still.
 */
const slots = [
  { cx: 428, cy: 214, r: 200, fill: "#fce0ea", stroke: "#da4d47", dot: { x: 250, y: 125 }, label: { x: 427, y: 244 }, icon: { x: 427, y: 171 }, spin: 16 },
  { cx: 252, cy: 499, r: 222, fill: "#d1f2ff", stroke: "#1688da", dot: { x: 135, y: 688 }, label: { x: 252, y: 569 }, icon: { x: 250, y: 477 }, spin: 22, reverse: true },
  { cx: 602, cy: 497, r: 224, fill: "#dcf7e7", stroke: "#10a058", dot: { x: 824, y: 494 }, label: { x: 608, y: 569 }, icon: { x: 605, y: 480 }, spin: 19 },
];

const iconSize = 76;

export default function Venn({ core_belief }) {
  const root = useRef(null);
  const items = (Array.isArray(core_belief) ? core_belief : [])
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .slice(0, slots.length)
    .map((item, i) => ({ ...item, slot: slots[i] }));
  const label = items.map((item) => item.title).join(", ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = (s) => gsap.utils.toArray(s, root.current);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", toggleActions: "play none none reverse" },
        });
        tl.from(q("[data-backdrop]"), { scale: 0.4, opacity: 0, duration: 1.1, ease: "power3.out", svgOrigin: "427 433" })
          .from(q("[data-disc]"), { scale: 0, opacity: 0, duration: 0.9, ease: "back.out(1.4)", stagger: 0.18, svgOrigin: (i, el) => el.dataset.origin }, 0.15)
          .from(q("[data-icon]"), { y: 14, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.12 }, 0.9)
          .from(q("[data-label]"), { y: 14, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.12 }, 1.0)
          .from(q("[data-orbit]"), { opacity: 0, duration: 0.5, stagger: 0.1 }, 1.4);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox="0 0 860 750" role="img" aria-label={label} className="h-auto w-full overflow-visible">
      <circle data-backdrop cx="427" cy="433" r="294" fill="#f2f2f2" />
      {items.map(({ id, slot: c }) => (
        <circle key={id} data-disc data-origin={`${c.cx} ${c.cy}`} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} fillOpacity="0.85" stroke={c.stroke} strokeWidth="1.2" />
      ))}
      {items.map((item) =>
        item.icon ? (
          <image
            key={item.id}
            data-icon
            href={item.icon}
            x={item.slot.icon.x - iconSize / 2}
            y={item.slot.icon.y - iconSize / 2}
            width={iconSize}
            height={iconSize}
            aria-hidden="true"
          />
        ) : null,
      )}
      {items.map((item) => (
        <text key={item.id} data-label x={item.slot.label.x} y={item.slot.label.y} textAnchor="middle" fill="#171717" fontSize="31" fontWeight="700" letterSpacing="9">
          {item.title}
        </text>
      ))}
      {items.map(({ id, slot: c }) => (
        <g key={id} data-orbit aria-hidden="true">
          <g
            className="motion-safe:animate-[orbit_linear_infinite]"
            style={{ transformOrigin: `${c.cx}px ${c.cy}px`, animationDuration: `${c.spin}s`, animationDirection: c.reverse ? "reverse" : "normal" }}
          >
            <circle cx={c.dot.x} cy={c.dot.y} r="8.5" fill={c.stroke} />
          </g>
        </g>
      ))}
    </svg>
  );
}
