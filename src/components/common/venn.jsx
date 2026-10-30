"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
 * Business · People · Planet diagram. Circles grow in from their own centres, the labels follow, and the three
 * coloured dots then travel round their circles for as long as the diagram is on screen.
 * Coordinates are the Figma ones (1920 frame) shifted so the artwork starts at 0,0.
 * With reduced motion the finished diagram is shown still.
 */
const circles = [
  { id: "people", cx: 428, cy: 214, r: 200, fill: "#fce0ea", stroke: "#da4d47", dot: { x: 250, y: 125, c: "#da4d47" } },
  { id: "business", cx: 252, cy: 499, r: 222, fill: "#d1f2ff", stroke: "#1688da", dot: { x: 135, y: 688, c: "#1688da" } },
  { id: "planet", cx: 602, cy: 497, r: 224, fill: "#dcf7e7", stroke: "#10a058", dot: { x: 824, y: 494, c: "#10a058" } },
];

const labels = [
  { id: "people", x: 427, y: 244, text: "PEOPLE" },
  { id: "business", x: 252, y: 569, text: "BUSINESS" },
  { id: "planet", x: 608, y: 569, text: "PLANET" },
];

const iconProps = { fill: "none", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" };

function PeopleIcon() {
  return (
    <g transform="translate(390 145)" stroke="#da4d47" {...iconProps}>
      <circle cx="37" cy="14" r="10" />
      <path d="M15 52v-6a22 22 0 0 1 44 0v6z" />
      <circle cx="12" cy="24" r="7" />
      <path d="M2 52v-4a10 10 0 0 1 8-9" />
      <circle cx="62" cy="24" r="7" />
      <path d="M72 52v-4a10 10 0 0 0-8-9" />
    </g>
  );
}

function BusinessIcon() {
  return (
    <g transform="translate(219 445)" stroke="#1688da" {...iconProps}>
      <path d="M2 64h62" />
      <path d="M8 64V38h10v26M26 64V28h10v36M44 64V42h10v22" strokeWidth="3" />
      <path d="M8 26l16-12 14 8 18-14" />
      <circle cx="8" cy="26" r="4" fill="#fff" />
      <circle cx="24" cy="14" r="4" fill="#fff" />
      <circle cx="38" cy="22" r="4" fill="#fff" />
      <circle cx="56" cy="8" r="4" fill="#fff" />
    </g>
  );
}

function PlanetIcon() {
  return (
    <g transform="translate(570 450)" stroke="#10a058" {...iconProps}>
      <circle cx="30" cy="30" r="28" />
      <path d="M12 14c6 2 8 6 6 10s-8 4-6 10 8 4 8 12M34 4c-2 6 4 8 8 8M44 22c-4 2-4 6 0 8" />
      <path d="M44 56c0-10 8-16 24-14 0 14-10 20-24 14z" fill="#dcf7e7" />
      <path d="M46 54c6-4 12-8 18-10" />
    </g>
  );
}

export default function Venn({ label = "Business, People and Planet" }) {
  const root = useRef(null);

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
      {circles.map((c) => (
        <circle key={c.id} data-disc data-origin={`${c.cx} ${c.cy}`} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} fillOpacity="0.85" stroke={c.stroke} strokeWidth="1.2" />
      ))}
      <g data-icon>
        <PeopleIcon />
      </g>
      <g data-icon>
        <BusinessIcon />
      </g>
      <g data-icon>
        <PlanetIcon />
      </g>
      {labels.map((l) => (
        <text key={l.id} data-label x={l.x} y={l.y} textAnchor="middle" fill="#171717" fontSize="31" fontWeight="700" letterSpacing="9">
          {l.text}
        </text>
      ))}
      {circles.map((c, i) => (
        <g key={c.id} data-orbit aria-hidden="true">
          <g
            className="motion-safe:animate-[orbit_linear_infinite]"
            style={{ transformOrigin: `${c.cx}px ${c.cy}px`, animationDuration: `${[16, 22, 19][i]}s`, animationDirection: i === 1 ? "reverse" : "normal" }}
          >
            <circle cx={c.dot.x} cy={c.dot.y} r="8.5" fill={c.dot.c} />
          </g>
        </g>
      ))}
    </svg>
  );
}
