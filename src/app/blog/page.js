import Hero from "@/components/sections/blog/hero";
import Insights from "@/components/sections/blog/insights";
import Newsletter from "@/components/sections/blog/newsletter";
import { BlogFilterProvider } from "@/components/sections/blog/blog-filter";
import {
  allArticles,
  articles,
  author,
  hrefFor,
  newsletter,
} from "@/lib/blog-data";

export const metadata = {
  title: "Blog — Organic BPS",
  description:
    "Perspectives on brand strategy, purpose, culture, change and leadership from the team at Organic BPS.",
};

const local_data = {
  hero: {
    image: { src: "/images/blog/hero.jpg", alt: "" },
    title: [
      [{ t: "Thinking for" }],
      [{ t: "brands with" }],
      [{ t: "purpose.", accent: true }],
    ],
    scroll: { label: "Scroll to featured perspectives", href: "#featured" },
    topics: {
      label: "Explore the thinking",
      items: ["Brand strategy", "Purpose", "Culture", "Change", "Leadership"],
    },
  },

  featured: {
    eyebrow: "Put purpose to work",
    title: [[{ t: "A point of view" }], [{ t: "worth pausing for." }]],
    text: "A clearer purpose. A stronger brand. A change in behaviour. Let’s explore how we can help you move forward.",
    cta: { label: "Read more" },
    slider: {
      label: "Featured perspectives",
      prev: "Previous perspective",
      next: "Next perspective",
      goTo: "Go to perspective",
    },
    author,
    items: [
      { ...allArticles[0], href: hrefFor(allArticles[0]) },
      { id: "distinctive-beats-different" },
      { id: "culture-is-the-strategy" },
      { id: "making-change-feel-possible" },
      { id: "leader-as-meaning-maker" },
    ],
  },

  insights: {
    eyebrow: "Latest thinking",
    title: "Ideas for putting purpose to work.",
    count: "Showing {shown} of {total} perspectives",
    empty:
      "No perspectives match your search yet. Try another topic or clear the search.",
    filters: {
      label: "Filter by topic",
      all: "All",
      items: ["Brand strategy", "Purpose", "Culture", "Change", "Leadership"],
    },
    search: {
      label: "Search perspectives",
      placeholder: "Search perspectives",
    },
    card: { readTime: "{n} min read", link: "Read More" },
    loadMore: "View More",
    pageSize: 9,
    articles: articles.map((a) => ({ ...a, href: hrefFor(a) })),
  },

  newsletter,
};

export default function BlogPage() {
  return (
    <main>
      <BlogFilterProvider>
        <Hero data={local_data.hero} />
        <Insights
          featured={local_data.featured}
          listing={local_data.insights}
        />
      </BlogFilterProvider>
      <Newsletter data={local_data.newsletter} />
    </main>
  );
}
