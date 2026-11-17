import { Suspense } from "react";
import Hero from "@/components/sections/blog/hero";
import Insights from "@/components/sections/blog/insights";
import Newsletter from "@/components/sections/blog/newsletter";
import { BlogFilterProvider } from "@/components/sections/blog/blog-filter";
import { apiGet } from "@/lib/api-calls";
import { mapBlog, mapPage } from "@/lib/blog-api";
import { newsletter } from "@/lib/blog-data";
import { text } from "@/lib/cms-text";
import { parseTitle } from "@/lib/utils";

export const metadata = {
  title: "Blog — Organic BPS",
  description:
    "Perspectives on brand strategy, purpose, culture, change and leadership from the team at Organic BPS.",
};

const local_data = {
  hero: {
    scroll: { label: "Scroll to featured perspectives", href: "#featured" },
    topicsLabel: "Explore the thinking",
  },
  featured: {
    cta: { label: "Read more" },
    slider: {
      label: "Featured perspectives",
      prev: "Previous perspective",
      next: "Next perspective",
      goTo: "Go to perspective",
    },
  },
  insights: {
    count: "Showing {shown} of {total} perspectives",
    empty:
      "No perspectives match your search yet. Try another topic or clear the search.",
    error: "We couldn’t load the perspectives. Please try again.",
    loading: "Loading perspectives",
    filters: { label: "Filter by topic" },
    search: {
      label: "Search perspectives",
      placeholder: "Search perspectives",
    },
    card: { readTime: "{n} min read", link: "Read More" },
    loadMore: "View More",
  },
  newsletter: {
    form: newsletter.form,
    privacy: newsletter.privacy,
  },
};

async function BlogContent() {
  const [{ data }, { data: all }] = await Promise.all([
    apiGet("blogs"),
    apiGet("blogs/filter"),
  ]);
  if (!data) return null;

  const { page_cms: cms, banner } = data;
  // the API lists "All" first; the banner rail only shows real topics
  const categories = (data.categories ?? []).map((c) => ({
    name: c.name,
    slug: c.slug,
  }));
  const topics = categories.filter((c) => c.slug !== "all");
  const sub = cms?.subscription_section;

  return (
    <main>
      <BlogFilterProvider categories={categories}>
        {banner && (
          <Hero
            data={{
              image: { src: banner.banner, alt: banner.banner_alt_text ?? "" },
              title: parseTitle(banner.banner_title),
              scroll: local_data.hero.scroll,
              topics: { label: local_data.hero.topicsLabel, items: topics },
            }}
          />
        )}
        <Insights
          featured={{
            ...local_data.featured,
            eyebrow: text(cms?.section_one?.title),
            title: parseTitle(cms?.section_one?.subtitle),
            text: text(cms?.section_one?.description),
            items: (data.featured_blogs ?? []).map(mapBlog),
          }}
          listing={{
            ...local_data.insights,
            eyebrow: text(cms?.section_two?.title),
            title: text(cms?.section_two?.subtitle),
            filters: { ...local_data.insights.filters, items: categories },
            // the plain list leaves the featured blog out; the filter list has every blog
            initial: mapPage(all ?? data.blogs),
          }}
        />
      </BlogFilterProvider>
      {sub && (
        <Newsletter
          data={{
            ...local_data.newsletter,
            title: text(sub.title),
            text: text(sub.description_one),
            note: text(sub.description_two),
          }}
        />
      )}
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogContent />
    </Suspense>
  );
}
