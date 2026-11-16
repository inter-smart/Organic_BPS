import { Suspense } from "react";
import CoreBelief from "@/components/sections/who-we-are/core-belief";
import FounderBio from "@/components/sections/who-we-are/founder-bio";
import Hero from "@/components/sections/who-we-are/hero";
import OurPurpose from "@/components/sections/who-we-are/our-purpose";
import OurStory from "@/components/sections/who-we-are/our-story";
import Recognition from "@/components/sections/who-we-are/recognition";
import Team from "@/components/sections/who-we-are/team";
import Values from "@/components/sections/who-we-are/values";
import { apiGet } from "@/lib/api-calls";

export const metadata = {
  title: "Who We Are — Organic BPS",
  description:
    "Organic BPS began in Kochi in 1999 as an advertising agency and grew into a Brand Purpose Consultancy with more than 26 years of experience.",
};

const local_data = {
  hero: {
    title: [
      [{ t: "Purpose", ring: true }],
      [{ t: "has shaped" }],
      [{ t: "our " }, { t: "journey.", accent: true }],
    ],
  },
  story: {
    title: [
      [{ t: "Born in brand communication." }],
      [{ t: "Evolved through purpose.", accent: true }],
    ],
  },
  belief: {
    title: [
      [{ t: "Growth for All." }],
      [{ t: "Growth for Good.", accent: true }],
    ],
  },
  values: {
    title: [[{ t: "What" }], [{ t: "guides us?", accent: true }]],
  },
  team: {
    title: [
      [{ t: "Strategic minds." }],
      [{ t: "Creative hands.", accent: true }],
      [{ t: "Shared commitment." }],
    ],
  },
  recognition: {
    title: [
      [{ t: "Recognised for" }],
      [{ t: "strategic & creative" }],
      [{ t: "excellence", accent: true }],
    ],
  },
};



export default async function page() {
  const { data } = await apiGet("who-we-are");
  if (!data) return null;

  const { page_cms: cms, banner, history,core_belief, our_values, awards } = data;

  return (
    <div>
      {banner && <Hero banner={banner} title={local_data.hero.title} />}
      {cms?.section_one && (
        <OurStory
          data={cms.section_one}
          history={history}
          title={local_data.story.title}
        />
      )}
      {cms?.section_two && <OurPurpose data={cms.section_two} />}
      {cms?.section_three && (
        <CoreBelief data={cms.section_three} core_belief={core_belief} title={local_data.belief.title} />
      )}
      {cms?.section_four && (
        <Values
          data={cms.section_four}
          items={our_values}
          title={local_data.values.title}
        />
      )}
      {cms?.founder && <FounderBio data={cms.founder} />}
      {cms?.section_six && (
        <Team data={cms.section_six} title={local_data.team.title} />
      )}
      {cms?.section_seven && (
        <Recognition
          data={cms.section_seven}
          awards={awards}
          title={local_data.recognition.title}
        />
      )}
    </div>
  );
}
