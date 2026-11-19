import Approach from "@/components/sections/how-we-work/approach";
import Clients from "@/components/sections/how-we-work/clients";
import Cta from "@/components/sections/how-we-work/cta";
import Hero from "@/components/sections/how-we-work/hero";
import Methodology from "@/components/sections/how-we-work/methodology";
import Methods from "@/components/sections/how-we-work/methods";
import MicroStimuli from "@/components/sections/how-we-work/micro-stimuli";
import Testimonials from "@/components/sections/how-we-work/testimonials";

export const metadata = {
  title: "How We Work — Organic BPS",
  description:
    "We combine the depth of a strategy consultancy with the creative capability of a brand communication agency, so purpose becomes communication, experiences and actions people can see and feel.",
};

/*
 * One object, one key per section — shaped like the future CMS response.
 * Rich copy uses segments: { t: text, accent?: red, ring?: swap the first "o" for the ring }.
 */
const local_data = {
  hero: {
    image: { src: "/images/how-we-work/hero.jpg", alt: "" },
    title: [
      { t: "Purpose", ring: true },
      { t: " Works When " },
      { t: "Strategy & Execution ", accent: true },
      { t: "Work Together" },
    ],
    paragraph:
      "We combine the depth of a strategy consultancy with the creative capability of a brand communication agency. This helps organisations move from a clear sense of purpose to communication, experiences and actions people can see and feel.",
    cta: { label: "Explore Our Approach", href: "#our-approach" },
    scroll: { label: "Scroll to our approach", href: "#our-approach" },
  },
  approach: {
    eyebrow: "Our Approach",
    title: [
      [{ t: "From the boardroom" }],
      [{ t: "to the " }, { t: "real world.", accent: true }],
    ],
    copy: "We begin by understanding the business, its people and its ambitions. We bring strategic thinking and creative execution together, so the direction set by leadership can take shape across the organisation and in the marketplace.",
    tagline: [
      [
        { t: "Strategy", c: "#da4d47" },
        { t: "gives", c: "#da4d47" },
        { t: "the", c: "#da4d47" },
        { t: "work", c: "#da4d47" },
        { t: "direction.", c: "#da4d47" },
      ],
      [
        { t: "Creativity", c: "#da4d47" },
        { t: "makes", c: "#da4d47" },
        { t: "it", c: "#da4d47" },
        { t: "visible", c: "#da4d47" },
        { t: "and", c: "#da4d47" },
        { t: "meaningful.", c: "#da4d47" },
      ],
    ],
  },
  methodology: {
    eyebrow: "Our Methodology",
    title: [{ t: "Connecting purpose to " }, { t: "action.", accent: true }],
    copy: "Our BPS — Brand Purpose Solutions framework connects four elements: purpose, belief, behaviour and sustainable growth. Purpose sets the direction. Belief builds connection. Behaviour turns intent into action. Sustained action helps create lasting value.",
    mechanism: {
      label:
        "The BPS framework as a mechanism: purpose at the core, wrapped by belief and behaviour, drives the wheel of sustainable growth.",
      scrollLabel: "Framework diagram, scrollable",
      growth: ["SUSTAINABLE", "GROWTH"],
      behaviour: "BEHAVIOUR",
      belief: "BELIEF",
      purpose: "PURPOSE",
    },
    steps: {
      label: "The four framework principles",
      items: [
        {
          id: "purpose",
          number: "01",
          title: "Purpose",
          text: "Purpose defines the\ndirection.",
        },
        {
          id: "belief",
          number: "02",
          title: "Belief",
          text: "Belief creates\nconnection.",
        },
        {
          id: "behaviour",
          number: "03",
          title: "Behaviour",
          text: "Behaviour turns\nintention into action.",
        },
        {
          id: "growth",
          number: "04",
          title: "Sustainable Growth",
          text: "Sustainable growth\nmakes it enduring.",
        },
      ],
    },
  },
  methods: {
    map: {
      label: "Brand Farm explores four dimensions of an organisation",
      items: [
        { id: "history", title: "History", text: "Where you come from" },
        { id: "strengths", title: "Strengths", text: "What you do best" },
        {
          id: "stakeholders",
          title: "Stakeholders",
          text: "Who you create\nvalue for",
        },
        {
          id: "ambitions",
          title: "Ambitions",
          text: "What you aspire\nto become",
        },
      ],
    },
    title: [
      [{ t: "We draw on" }],
      [{ t: "specific methods" }],
      [{ t: "where they can" }],
      [{ t: "make a difference:", accent: true }],
    ],
    copy: [
      { t: "Brand Farm explores an organisation’s " },
      { t: "history", className: "font-semibold text-basecolor14" },
      { t: ", ", className: "text-basecolor14" },
      {
        t: "strengths, stakeholders",
        className: "font-semibold text-basecolor14",
      },
      { t: " & " },
      { t: "ambitions", className: "font-semibold text-basecolor14" },
      { t: " to uncover a purpose it can act on." },
    ],
  },
  microStimuli: {
    image: {
      src: "/images/how-we-work/book-cover.jpg",
      alt: "The MicroStimuli book on a wooden table beside a small potted plant",
    },
    number: "02",
    title: "MicroStimuli",
    text: "based on behavioural science thinking introduced by Biju Dominic, helps us identify where intention falls short of action and design cues and experiences that make the desired behaviour easier.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: [{ t: "In our " }, { t: "clients", accent: true }, { t: "’ words" }],
    slider: {
      label: "Client testimonials",
      prev: "Previous testimonial",
      next: "Next testimonial",
      goTo: "Go to testimonial",
    },
    items: [
      {
        id: "asset-homes",
        quote:
          "The single-minded purpose-driven approach by Organic BPS has delivered amazing results for us on several fronts.",
        name: "Sunil Kumar V",
        role: "Founder and Managing Director, Asset Homes",
        logo: {
          src: "/images/how-we-work/logo-asset.png",
          alt: "Asset Homes",
          width: 300,
          height: 356,
          w: 15.4,
        },
      },
      {
        id: "muthoot",
        quote:
          "The discovery and integration of Purpose by Organic BPS has brought about an inherent shift in the way we look at our business and work.",
        name: "Thomas George Muthoot",
        role: "Director, Muthoot Pappachan Group",
        logo: {
          src: "/images/how-we-work/logo-muthoot.png",
          alt: "Muthoot Pappachan Group",
          width: 379,
          height: 282,
          w: 16.5,
        },
      },
    ],
  },
  clients: {
    eyebrow: "Long-standing relationships",
    title: [
      [{ t: "We grow with the" }],
      [{ t: "organisations" }],
      [{ t: "we work", accent: true }, { t: " with." }],
    ],
    copy: [
      "We believe the best work grows from a deep understanding of the organisation.",
      "Many of our client relationships have continued for years, with some extending beyond a decade. This continuity allows us to understand the business, its people, its culture and its changing ambitions.",
      "Our clients often engage us as a strategic extension of their leadership and brand teams, involving us at defining moments of growth and change.",
    ],
    logosLabel: "Organisations we work with",
    logos: [
      {
        id: "cial",
        src: "/images/how-we-work/logo-cial.png",
        alt: "Cochin International Airport Limited",
      },
      {
        id: "cosmoversity",
        src: "/images/how-we-work/logo-cosmoversity.png",
        alt: "Cosmoversity",
      },
      {
        id: "aster",
        src: "/images/logo-aster.png",
        alt: "Aster MIMS Hospital",
      },
      {
        id: "kma",
        src: "/images/logo-kma.png",
        alt: "Kerala Management Association",
      },
      {
        id: "scms",
        src: "/images/logo-scms.png",
        alt: "SCMS Group of Educational Institutions",
      },
      {
        id: "scms-2",
        src: "/images/logo-scms.png",
        alt: "SCMS Group of Educational Institutions",
      },
      {
        id: "agappe",
        src: "/images/logo-agappe.png",
        alt: "Agappe",
      },
      {
        id: "aster-2",
        src: "/images/logo-aster.png",
        alt: "Aster MIMS Hospital",
      },
      {
        id: "cosmoversity-2",
        src: "/images/how-we-work/logo-cosmoversity.png",
        alt: "Cosmoversity",
      },
      {
        id: "cosmoversity",
        src: "/images/how-we-work/logo-cosmoversity.png",
        alt: "Cosmoversity",
      },
      {
        id: "aster",
        src: "/images/logo-aster.png",
        alt: "Aster MIMS Hospital",
      },
      {
        id: "kma",
        src: "/images/logo-kma.png",
        alt: "Kerala Management Association",
      },
      {
        id: "scms",
        src: "/images/logo-scms.png",
        alt: "SCMS Group of Educational Institutions",
      },
      {
        id: "scms-2",
        src: "/images/logo-scms.png",
        alt: "SCMS Group of Educational Institutions",
      },
    ],
  },
  cta: {
    image: { src: "/images/how-we-work/cta.jpg", alt: "" },
    eyebrow: "Let’s talk",
    title: [[{ t: "What are you" }], [{ t: "working towards?", accent: true }]],
    text: "Tell us about your challenge. Let’s explore how we can help you move forward.",
    cta: { label: "Let’s talk", href: "/contact" },
  },
};

export default function HowWeWorkPage() {
  return (
    <main>
      <Hero data={local_data.hero} />
      <Approach data={local_data.approach} />
      <div className="container mx-auto px-4 xl:px-0">
        <div className="rounded-[60px] bg-[#F6F6F6] overflow-hidden">
          <Methodology data={local_data.methodology} />
          <Methods data={local_data.methods} />
          <MicroStimuli data={local_data.microStimuli} />
        </div>
      </div>
      <Testimonials data={local_data.testimonials} />
      <Clients data={local_data.clients} />
      <Cta data={local_data.cta} />
    </main>
  );
}
