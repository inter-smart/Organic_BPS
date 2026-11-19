import { Suspense, cache } from "react";
import CoreBelief from "@/components/sections/who-we-are/core-belief";
import FounderBio from "@/components/sections/who-we-are/founder-bio";
import Hero from "@/components/sections/who-we-are/hero";
import OurPurpose from "@/components/sections/who-we-are/our-purpose";
import OurStory from "@/components/sections/who-we-are/our-story";
import Recognition from "@/components/sections/who-we-are/recognition";
import Team from "@/components/sections/who-we-are/team";
import Values from "@/components/sections/who-we-are/values";
import MetaTags from "@/components/common/meta-tags";
import { apiGet } from "@/lib/api-calls";
import { buildMetadata, cmsMeta } from "@/lib/seo";

const getWhoWeAre = cache(() => apiGet("who-we-are"));

export async function generateMetadata() {
  const { data } = await getWhoWeAre();
  return buildMetadata(cmsMeta(data?.banner), "/who-we-are");
}

export default async function page() {
  const { data } = await getWhoWeAre();
  if (!data) return null;

  const { page_cms: cms, banner, history,core_belief, our_values, awards } = data;

  return (
    <div>
      <MetaTags html={data.banner?.other_meta_tags} />
      {banner && <Hero banner={banner} />}
      {cms?.section_one && (
        <OurStory
          data={cms.section_one}
          history={history}
        />
      )}
      {cms?.section_two && <OurPurpose data={cms.section_two} />}
      {cms?.section_three && (
        <CoreBelief data={cms.section_three} core_belief={core_belief} />
      )}
      {cms?.section_four && (
        <Values
          data={cms.section_four}
          items={our_values}
        />
      )}
      {cms?.founder && <FounderBio data={cms.founder} />}
      {cms?.section_six && (
        <Team data={cms.section_six} />
      )}
      {cms?.section_seven && (
        <Recognition
          data={cms.section_seven}
          awards={awards}
        />
      )}
    </div>
  );
}
