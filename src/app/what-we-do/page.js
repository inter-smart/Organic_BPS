import { Suspense, cache } from "react";
import Hero from "@/components/sections/what-we-do/hero";
import Practices from "@/components/sections/what-we-do/practices";
import MetaTags from "@/components/common/meta-tags";
import { apiGet } from "@/lib/api-calls";
import { buildMetadata, cmsMeta } from "@/lib/seo";

const getWhatWeDo = cache(() => apiGet("what-we-do"));

export async function generateMetadata() {
  const { data } = await getWhatWeDo();
  return buildMetadata(cmsMeta(data?.banner), "/what-we-do");
}

const local_data = {
  hero: {
    // title: [
    //   [{ t: "From " }, { t: "purpose", ring: true }],
    //   [{ t: "to action." }],
    //   [{ t: "From strategy" }],
    //   [{ t: "to " }, { t: "execution.", accent: true }],
    // ],
    title: "From purp<b>o</b>se<br>to action.<br>From strategy<br>to <span>execution.</span>",
    scroll: { label: "Scroll to the next section", href: "#practices" },
  },
  practices: {
    // title: [[{ t: "Four specialist practices" }, { t: ".", accent: true }]],
    title: "Four specialist practices<span>.</span>",
    // the API sends the logo image only; size and alt follow the practice order
    logos: [
      { alt: "BRANDFARM", width: 348, height: 205 },
      { alt: "Brand Bloom", width: 171, height: 109 },
      { alt: "brandize", width: 188, height: 38 },
      { alt: "Green House", width: 249, height: 114 },
    ],
  },
};

export default async function page() {
  const { data } = await getWhatWeDo();
  if (!data) return null;

  const { page_cms: cms, banner, practices } = data;

  return (
    <main>
      <MetaTags html={data.banner?.other_meta_tags} />
      {banner && (
        <Hero
          banner={banner}
          title={local_data.hero.title}
          scroll={local_data.hero.scroll}
        />
      )}
      {practices?.length > 0 && (
        <Practices
          eyebrow={cms?.title_one}
          title={local_data.practices.title}
          practices={practices}
          logos={local_data.practices.logos}
        />
      )}
    </main>
  );
}

