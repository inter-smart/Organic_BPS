import { Suspense } from "react";
import Hero from "@/components/sections/what-we-do/hero";
import Practices from "@/components/sections/what-we-do/practices";
import { apiGet } from "@/lib/api-calls";

export const metadata = {
  title: "What We Do — Organic BPS",
  description:
    "Organic BPS brings together four specialist practices to help organisations discover what they stand for, express it with clarity and put it into action.",
};

const local_data = {
  hero: {
    title: [
      [{ t: "From " }, { t: "purpose", ring: true }],
      [{ t: "to action." }],
      [{ t: "From strategy" }],
      [{ t: "to " }, { t: "execution.", accent: true }],
    ],
    scroll: { label: "Scroll to the next section", href: "#practices" },
  },
  practices: {
    title: [[{ t: "Four specialist practices" }, { t: ".", accent: true }]],
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
  const { data } = await apiGet("what-we-do");
  if (!data) return null;

  const { page_cms: cms, banner, practices } = data;

  return (
    <main>
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

