import { Suspense } from "react";
import Clients from "@/components/sections/home/client-logos";
import Greenstorm from "@/components/sections/home/greenstorm";
import Hero from "@/components/sections/home/hero";
import Founder from "@/components/sections/home/founder";
import WhatWeDo from "@/components/sections/home/what-we-do";
import GlobeImpact from "@/components/sections/home/globe-impact";
import TeamGallery from "@/components/sections/home/team-gallery";
import PurposeInsights from "@/components/sections/home/purpose-insights";
import PurposeActivation from "@/components/sections/home/purpose-activation";
import { apiGet } from "@/lib/api-calls";

const local_data = {
  hero: {
    title: [
      [{ t: "Purpose", ring: true }, { t: " is the" }],
      [
        { t: "journey", accent: true },
        { t: " that powers every other " },
        { t: "journey.", accent: true },
      ],
    ],
  },
  whatWeDo: {
    title: [
      [{ t: "We do", accent: true }],
      [{ t: "purpose", ring: true }, { t: " on" }],
      [{ t: "purpose" }, { t: ".", accent: true }],
    ],
  },
  globe: {
    title: [
      [{ t: "Good for business." }],
      [{ t: "better for the world.", accent: true }],
    ],
  },
  clients: {
    title: [
      [{ t: "Good intentions deserve" }],
      [{ t: "great experience.", accent: true }],
      [{ t: "That’s where we come in" }, { t: ".", accent: true }],
    ],
  },
  greenstorm: {
    title: [
      [
        { t: "When " },
        { t: "purpose", ring: true, accent: true },
        { t: " crosses borders" },
        { t: ".", accent: true },
      ],
    ],
  },
  founder: {
    title: [
      [{ t: "Hi, I'm " }],
      [{ t: "Dileep Narayanan" }, { t: ".", accent: true }],
    ],
  },
  people: {
    title: [[{ t: "Good work" }], [{ t: "finds good people.", accent: true }]],
  },
  insights: {
    title: [
      [{ t: "The pursuit of" }],
      [
        { t: "purpose", ring: true, accent: true },
        { t: ".", accent: true },
      ],
    ],
  },
};

async function HomeContent() {
  const { data } = await apiGet("home");
  if (!data) return null;

  const {
    sliders,
    home_cms,
    map_details,
    loyalty_status,
    partners,
    gallery,
    blogs,
  } = data;

  
  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
    section_seven,
    section_eight,
  } = home_cms ?? {};


  return (
    <main>
      {sliders && <Hero data={sliders} title={local_data.hero.title} />}
      {section_one && (
        <WhatWeDo data={section_one} title={local_data.whatWeDo.title} />
      )}
      {section_two && (
        <GlobeImpact
          data={section_two}
          pins={map_details}
          stats={loyalty_status}
          title={local_data.globe.title}
        />
      )}
      {section_three && <PurposeActivation data={section_three} />}
      {section_four && (
        <Clients
          data={section_four}
          partners={partners}
          title={local_data.clients.title}
        />
      )}
      {section_five && (
        <Greenstorm data={section_five} title={local_data.greenstorm.title} />
      )}
      {section_six && (
        <Founder data={section_six} title={local_data.founder.title} />
      )}
      {section_seven && (
        <TeamGallery
          data={section_seven}
          gallery={gallery}
          title={local_data.people.title}
        />
      )}
      {section_eight && (
        <PurposeInsights
          data={section_eight}
          blogs={blogs}
          title={local_data.insights.title}
        />
      )}
    </main>
  );
}

export default function page() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
