import { notFound } from "next/navigation";
import Newsletter from "@/components/sections/blog/newsletter";
import Close from "@/components/sections/blog-detail/close";
import Hero from "@/components/sections/blog-detail/hero";
import Related from "@/components/sections/blog-detail/related";
import Share from "@/components/sections/blog-detail/share";
import { apiGet } from "@/lib/api-calls";
import { mapDetail } from "@/lib/blog-api";
import { newsletter } from "@/lib/blog-data";
import { text } from "@/lib/cms-text";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await apiGet(`blogs/${slug}`);
  const blog = data?.blog;
  if (!blog) return {};
  return {
    title: `${blog.meta_title || blog.title} — Organic BPS`,
    description: blog.meta_description || blog.small_description,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const { data } = await apiGet(`blogs/${slug}`);
  if (!data?.blog) notFound();

  const { page_cms: cms, blog, related_blogs: relatedBlogs } = data;
  const article = mapDetail(blog, relatedBlogs);
  const sub = cms.subscription_section;
  const relatedCms = cms.related_blog_section;

  return (
    <main>
      <Hero data={article.hero} />
      <article
        id="article"
        className="scroll-mt-20 bg-white py-12 lg:pt-[calc(80*var(--u))] lg:pb-[calc(100*var(--u))]"
      >
        <div className="container mx-auto px-4">
          <Share />
          <div
            className="typography article-copy mt-8 lg:mt-[calc(32*var(--u))]"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          <Close data={{ author: article.author }} />
        </div>
      </article>
      {article.related.length > 0 && (
        <Related
          data={{
            eyebrow: text(relatedCms.title),
            title: text(relatedCms.subtitle),
          }}
          articles={article.related}
        />
      )}
      <Newsletter
        data={{
          form: newsletter.form,
          privacy: newsletter.privacy,
          title: text(sub.title),
          text: text(sub.description_one),
          note: text(sub.description_two),
        }}
      />
    </main>
  );
}
