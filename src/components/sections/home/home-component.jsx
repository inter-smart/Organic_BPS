"use client";

import MetaTags from "@/components/common/meta-tags";
import Hero from "./hero";
import WhatWeDo from "./what-we-do";
import GlobeImpact from "./globe-impact";
import PurposeActivation from "./purpose-activation";
import Clients from "./client-logos";
import Greenstorm from "./greenstorm";
import Founder from "./founder";
import TeamGallery from "./team-gallery";
import PurposeInsights from "./purpose-insights";

export function HomeComponent({data}) {
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
    <div>
      <MetaTags html={data.banner?.other_meta_tags} />
      {sliders && <Hero data={sliders} />}
      {section_one && <WhatWeDo data={section_one} title={section_one.title} />}
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
      {section_six && <Founder data={section_six} title={section_six.title} />}
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
    </div>
  );
}
