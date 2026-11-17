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
