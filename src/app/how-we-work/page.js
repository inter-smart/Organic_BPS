import Approach from "@/components/sections/how-we-work/approach";
import Clients from "@/components/sections/how-we-work/clients";
import Cta from "@/components/sections/how-we-work/cta";
import Hero from "@/components/sections/how-we-work/hero";
import Methodology from "@/components/sections/how-we-work/methodology";
import Methods from "@/components/sections/how-we-work/methods";
import MicroStimuli from "@/components/sections/how-we-work/micro-stimuli";
import Testimonials from "@/components/sections/how-we-work/testimonials";
import { apiGet } from "@/lib/api-calls";
import { buildMetadata, cmsMeta } from "@/lib/seo";
import { cache } from "react";


const getHowWeWorks = cache(() => apiGet("how-its-works"));

export async function generateMetadata() {
  const { data } = await getHowWeWorks();
  return buildMetadata(cmsMeta(data?.banner), "/how-its-works");
}


/*
 * One object, one key per section — shaped like the future CMS response.
 * Rich copy uses segments: { t: text, accent?: red, ring?: swap the first "o" for the ring }.
 */
const local_data = {
  hero: {
    scroll: { label: "Scroll to our approach", href: "#our-approach" },
  },

  methodology: {
    mechanism: {
      label:
        "The BPS framework as a mechanism: purpose at the core, wrapped by belief and behaviour, drives the wheel of sustainable growth.",
      scrollLabel: "Framework diagram, scrollable",
      growth: ["SUSTAINABLE", "GROWTH"],
      behaviour: "BEHAVIOUR",
      belief: "BELIEF",
      purpose: "PURPOSE",
    },
    steps: { label: "The four framework principles" },
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
    // title: [
    //   [{ t: "We grow with the" }],
    //   [{ t: "organisations" }],
    //   [{ t: "we work", accent: true }, { t: " with." }],
    // ],
    title: "We grow with the<br>organisations<br><span>we work</span> with.",
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

};

export default async function HowWeWorkPage() {
  const { data, error } = await apiGet("how-its-works");
  const {
    page_cms,
    banner,
    methodologies,
    testimonials,
    brand_pillers,
    partners,
  } = data;

  const { section_one, section_two, section_three, section_four, section_five, section_six, section_seven } = page_cms;

  return (
    <main>
      <Hero data={local_data.hero} banner={banner} />
      <Approach section_one={section_one} />
      <div className="container mx-auto px-4 xl:px-0 mb-10 2xl:mb-25">
        <div className="rounded-[20px] sm:rounded-[40px] 2xl:rounded-[60px] bg-[#F6F6F6] overflow-hidden">
          <Methodology
            section_two={section_two}
            data={local_data.methodology}
            methodologies={methodologies}
          />
          <Methods
            section_three={section_three}
            brand_pillers={brand_pillers}
            data={local_data.methods}
          />
          <MicroStimuli data={local_data.microStimuli} />
        </div>
      </div>
      <Testimonials section_five={section_five} testimonials={testimonials} data={local_data.testimonials} />
      <Clients data={local_data.clients} />
      <Cta section_seven={section_seven}/>
    </main>
  );
}
