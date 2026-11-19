import { cache } from "react";
import Hero from "@/components/sections/blog/hero";
import Insights from "@/components/sections/blog/insights";
import Newsletter from "@/components/sections/blog/newsletter";
import { BlogFilterProvider } from "@/components/sections/blog/blog-filter";
import MetaTags from "@/components/common/meta-tags";
import { apiGet } from "@/lib/api-calls";
import { mapBlog, mapPage } from "@/lib/blog-api";
import { buildMetadata, cmsMeta } from "@/lib/seo";
import { text } from "@/lib/cms-text";

const getBlogs = cache(() => apiGet("blogs"));

export async function generateMetadata() {
  const { data } = await getBlogs();
  return buildMetadata(cmsMeta(data?.banner), "/blog");
}

export default async function BlogPage() {
  const [{ data }, { data: all }] = await Promise.all([
    getBlogs(),
    apiGet("blogs/filter", { cache: false }),
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
      <MetaTags html={banner?.other_meta_tags} />
      <BlogFilterProvider categories={categories}>
        {banner && (
          <Hero
            data={{
              image: { src: banner.banner, alt: banner.banner_alt_text ?? "" },
              title: banner.banner_title,
              topics,
            }}
          />
        )}
        <Insights
          featured={{
            eyebrow: text(cms?.section_one?.title),
            title: cms?.section_one?.subtitle,
            text: text(cms?.section_one?.description),
            items: (data.featured_blogs ?? []).map(mapBlog),
          }}
          listing={{
            eyebrow: text(cms?.section_two?.title),
            title: text(cms?.section_two?.subtitle),
            filters: { items: categories },
            // the plain list leaves the featured blog out; the filter list has every blog
            initial: mapPage(all ?? data.blogs),
          }}
        />
      </BlogFilterProvider>
      {sub && (
        <Newsletter
          data={{
            title: text(sub.title),
            text: text(sub.description_one),
            note: text(sub.description_two),
          }}
        />
      )}
    </main>
  );
}
