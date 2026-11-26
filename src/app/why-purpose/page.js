import { Suspense } from "react";
import Authentic from "@/components/sections/why-purpose/authentic";
import Cta from "@/components/sections/why-purpose/cta";
import Definition from "@/components/sections/why-purpose/definition";
import Growth from "@/components/sections/why-purpose/growth";
import Hero from "@/components/sections/why-purpose/hero";
import Importance from "@/components/sections/why-purpose/importance";
import Moments from "@/components/sections/why-purpose/moments";
import Perspectives from "@/components/sections/why-purpose/perspectives";
import MetaTags from "@/components/common/meta-tags";
import { cmsGet } from "@/lib/cms";
import { buildMetadata, cmsMeta } from "@/lib/seo";

const getWhyPurpose = () => cmsGet("why-purpose");

export async function generateMetadata() {
  const { data } = await getWhyPurpose();
  return buildMetadata(cmsMeta(data?.banner), "/why-purpose");
}

export default async function WhyPurposePage() {
  const { data } = await getWhyPurpose();
  if (!data) return null;

  const {
    page_cms: cms,
    banner,
    corporate_statements,
    why_purpose,
    how_purpose,
    when_purpose,
    latest_blogs
  } = data;

  return (
    <main>
      <MetaTags html={data.banner?.other_meta_tags} />
      {banner && (
        <Hero
          banner={banner}
          title={banner.banner_title}
        />
      )}
      {cms?.section_one && (
        <Definition
          data={cms.section_one}
          statements={corporate_statements}
          title={cms.section_one.title}
        />
      )}
      {cms?.section_two && (
        <Importance
          data={cms.section_two}
          benefits={why_purpose}
          title={cms.section_two.title}
        />
      )}
      {cms?.section_three && (
        <Growth
          data={cms.section_three}
          items={how_purpose}
          title={cms.section_three.title}
        />
      )}
      {cms?.section_four && (
        <Moments
          data={cms.section_four}
          items={when_purpose}
          title={cms.section_four.title}
        />
      )}
      {cms?.section_five && (
        <Authentic
          data={cms.section_five}
          title={cms.section_five.title}
        />
      )}
      {cms?.section_six && (
        <Perspectives
          data={cms.section_six}
          items={latest_blogs}
        />
      )}
      {cms?.section_seven && (
        <Cta data={cms.section_seven} title={cms.section_seven.title} />
      )}
    </main>
  );
}
