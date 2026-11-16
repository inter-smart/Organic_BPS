import { Suspense } from "react";
import Authentic from "@/components/sections/why-purpose/authentic";
import Cta from "@/components/sections/why-purpose/cta";
import Definition from "@/components/sections/why-purpose/definition";
import Growth from "@/components/sections/why-purpose/growth";
import Hero from "@/components/sections/why-purpose/hero";
import Importance from "@/components/sections/why-purpose/importance";
import Moments from "@/components/sections/why-purpose/moments";
import Perspectives from "@/components/sections/why-purpose/perspectives";
import { apiGet } from "@/lib/api-calls";
import { allArticles } from "@/lib/blog-data";

export const metadata = {
  title: "Why Purpose — Organic BPS",
  description:
    "Purpose clarifies why your organisation exists, the value it seeks to create and the choices that will take it forward.",
};

// the design shows three cards; these extend the slider from the blog list
const moreArticles = [
  "can-purpose-be-measured",
  "leader-as-meaning-maker",
  "growth-question-brand-strategy",
]
  .map((id) => allArticles.find((article) => article.id === id))
  .filter(Boolean)
  .map(({ id, image, title, summary }) => ({
    id,
    image,
    title,
    summary,
    cta: { label: "Read the article", href: "/blog" },
  }));

const local_data = {
  hero: {
    title: [
      [{ t: "Purpose", ring: true }, { t: " gives" }],
      [{ t: "growth direction." }],
    ],
    scroll: {
      label: "Scroll to what is corporate purpose",
      href: "#what-is-purpose",
    },
  },
  definition: {
    title: [
      [{ t: "What is" }],
      [{ t: "corporate" }],
      [{ t: "purpose?", accent: true }],
    ],
    distinctionsLabel: "Vision, mission, values and purpose",
  },
  importance: {
    title: [[{ t: "Why does" }], [{ t: "purpose matter?", accent: true }]],
    diagramLabel: "What a shared direction does",
  },
  growth: {
    title: [
      { t: "How can purpose " },
      { t: "help you grow?", className: "text-basecolor17" },
    ],
  },
  moments: {
    title: [
      [{ t: "When does" }],
      [{ t: "purpose" }],
      [{ t: "become" }],
      [{ t: "especially", className: "text-basecolor17" }],
      [{ t: "valuable?", className: "text-basecolor17" }],
    ],
  },
  authentic: {
    image: {
      alt: "Aerial view of a small blue boat on bright green water",
      width: 1100,
      height: 734,
    },
    title: [
      [{ t: "Purpose" }],
      [{ t: "must be" }],
      [{ t: "authentic.", className: "text-basecolor17" }],
    ],
    equationLabel: "Words plus actions lead to authenticity",
  },
  perspectives: {
    slider: {
      label: "Purpose perspectives",
      prev: "Previous articles",
      next: "Next articles",
      goTo: "Go to articles",
    },
    items: [
      {
        id: "performance",
        image: {
          src: "/images/why-purpose/article-3.jpg",
          alt: "Four speakers seated on a stage in front of an audience",
          width: 750,
          height: 500,
        },
        title: "Brand Purpose and Corporate Performance",
        summary:
          "How purpose, sustainability and stakeholder value can contribute to long-term business performance.",
        cta: { label: "Read the article", href: "/blog" },
      },
      {
        id: "authentic",
        image: {
          src: "/images/why-purpose/article-2.jpg",
          alt: "Colleagues shaking hands across a meeting table",
          width: 750,
          height: 500,
        },
        title: "What Makes Corporate Purpose Authentic?",
        summary:
          "Why the alignment between stated purpose and organisational practice matters for credibility and trust.",
        cta: { label: "Explore the research", href: "/blog" },
      },
      {
        id: "playbook",
        image: {
          src: "/images/why-purpose/article-1.jpg",
          alt: "A humanoid robot working at a production line",
          width: 750,
          height: 500,
        },
        title: "Brand Purpose: The Playbook for 21st-Century CEOs",
        summary:
          "A guide to answering a fundamental leadership question: why should this business exist?",
        cta: { label: "Read the article", href: "/blog" },
      },
      ...moreArticles,
    ],
  },
  cta: {
    title: [[{ t: "Ready to put" }], [{ t: "purpose to work?" }]],
  },
};

export default async function WhyPurposePage() {
  const { data } = await apiGet("why-purpose");
  if (!data) return null;

  const {
    page_cms: cms,
    banner,
    corporate_statements,
    why_purpose,
    how_purpose,
    when_purpose,
  } = data;

  return (
    <main>
      {banner && (
        <Hero
          banner={banner}
          title={local_data.hero.title}
          scroll={local_data.hero.scroll}
        />
      )}
      {cms?.section_one && (
        <Definition
          data={cms.section_one}
          statements={corporate_statements}
          title={local_data.definition.title}
          label={local_data.definition.distinctionsLabel}
        />
      )}
      {cms?.section_two && (
        <Importance
          data={cms.section_two}
          benefits={why_purpose}
          title={local_data.importance.title}
          label={local_data.importance.diagramLabel}
        />
      )}
      {cms?.section_three && (
        <Growth
          data={cms.section_three}
          items={how_purpose}
          title={local_data.growth.title}
        />
      )}
      {cms?.section_four && (
        <Moments
          data={cms.section_four}
          items={when_purpose}
          title={local_data.moments.title}
        />
      )}
      {cms?.section_five && (
        <Authentic data={cms.section_five} {...local_data.authentic} />
      )}
      {cms?.section_six && (
        <Perspectives
          data={cms.section_six}
          slider={local_data.perspectives.slider}
          items={local_data.perspectives.items}
        />
      )}
      {cms?.section_seven && (
        <Cta data={cms.section_seven} title={local_data.cta.title} />
      )}
    </main>
  );
}
