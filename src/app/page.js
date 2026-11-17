import { Suspense, cache } from "react";
import Clients from "@/components/sections/home/client-logos";
import Greenstorm from "@/components/sections/home/greenstorm";
import Hero from "@/components/sections/home/hero";
import Founder from "@/components/sections/home/founder";
import WhatWeDo from "@/components/sections/home/what-we-do";
import GlobeImpact from "@/components/sections/home/globe-impact";
import TeamGallery from "@/components/sections/home/team-gallery";
import PurposeInsights from "@/components/sections/home/purpose-insights";
import PurposeActivation from "@/components/sections/home/purpose-activation";
import MetaTags from "@/components/common/meta-tags";
import { apiGet } from "@/lib/api-calls";
import { buildMetadata, cmsMeta } from "@/lib/seo";

const getHome = cache(() => apiGet("home"));

export async function generateMetadata() {
  const { data } = await getHome();
  return buildMetadata(cmsMeta(data?.banner), "/");
}

const local_data = {
  hero: {
    // title: [
    //   [{ t: "Purpose", ring: true }, { t: " is the" }],
    //   [
    //     { t: "journey", accent: true },
    //     { t: " that powers every other " },
    //     { t: "journey.", accent: true },
    //   ],
    // ],
    title: "Purp<b>o</b>se is the<br><span>journey</span> that powers every other <span>journey.</span>",
  },
  whatWeDo: {
    // title: [
    //   [{ t: "We do", accent: true }],
    //   [{ t: "purpose", ring: true }, { t: " on" }],
    //   [{ t: "purpose" }, { t: ".", accent: true }],
    // ],
    title: "<span>We do</span><br>purp<b>o</b>se on<br>purpose<span>.</span>",
  },
  globe: {
    // title: [
    //   [{ t: "Good for business." }],
    //   [{ t: "better for the world.", accent: true }],
    // ],
    title: "Good for business.<br><span>better for the world.</span>",
  },
  clients: {
    // title: [
    //   [{ t: "Good intentions deserve" }],
    //   [{ t: "great experience.", accent: true }],
    //   [{ t: "That’s where we come in" }, { t: ".", accent: true }],
    // ],
    title: "Good intentions deserve<br><span>great experience.</span><br>That’s where we come in<span>.</span>",
  },
  greenstorm: {
    // title: [
    //   [
    //     { t: "When " },
    //     { t: "purpose", ring: true, accent: true },
    //     { t: " crosses borders" },
    //     { t: ".", accent: true },
    //   ],
    // ],
    title: "When <span>purp<b>o</b>se</span> crosses borders<span>.</span>",
  },
  founder: {
    // title: [
    //   [{ t: "Hi, I'm " }],
    //   [{ t: "Dileep Narayanan" }, { t: ".", accent: true }],
    // ],
    title: "Hi, I'm <br>Dileep Narayanan<span>.</span>",
  },
  people: {
    // title: [[{ t: "Good work" }], [{ t: "finds good people.", accent: true }]],
    title: "Good work<br><span>finds good people.</span>",
  },
  insights: {
    // title: [
    //   [{ t: "The pursuit of" }],
    //   [
    //     { t: "purpose", ring: true, accent: true },
    //     { t: ".", accent: true },
    //   ],
    // ],
    title: "The pursuit of<br><span>purp<b>o</b>se.</span>",
  },
};

async function HomeContent() {
  const { data } = await getHome();
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
      <MetaTags html={data.banner?.other_meta_tags} />
      {sliders && <Hero data={sliders} />}
      {section_one && (
        <WhatWeDo data={section_one} title={section_one.title} />
      )}
      {section_two && (
        <GlobeImpact
          data={section_two}
          pins={map_details}
          stats={loyalty_status}
          title={section_two.title}
        />
      )}
      {section_three && <PurposeActivation data={section_three} />}
      {section_four && (
        <Clients
          data={section_four}
          partners={partners}
          title={section_four.title}
        />
      )}
      {section_five && (
        <Greenstorm data={section_five} title={section_five.title} />
      )}
      {section_six && (
        <Founder data={section_six} title={section_six.title} />
      )}
      {section_seven && (
        <TeamGallery
          data={section_seven}
          gallery={gallery}
          title={section_seven.title}
        />
      )}
      {section_eight && (
        <PurposeInsights
          data={section_eight}
          blogs={blogs}
          title={section_eight.title}
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
