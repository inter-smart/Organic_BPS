import { notFound } from "next/navigation";
import Newsletter from "@/components/sections/blog/newsletter";
import Close from "@/components/sections/blog-detail/close";
import Hero from "@/components/sections/blog-detail/hero";
import Related from "@/components/sections/blog-detail/related";
import Share from "@/components/sections/blog-detail/share";
import {
  allArticles,
  author,
  getArticle,
  hrefFor,
  newsletter,
} from "@/lib/blog-data";

export function generateStaticParams() {
  return allArticles.filter((a) => a.detail).map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }) {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: `${article.title}${article.accent ?? ""} — Organic BPS`.replace(
      /\s+/g,
      " ",
    ),
    description: article.summary,
  };
}

export default async function BlogDetailPage({ params }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const { detail } = article;
  const related = detail.related
    .map((id) => allArticles.find((a) => a.id === id))
    .filter(Boolean)
    .map((a) => ({ ...a, href: hrefFor(a) }));

  const local_data = {
    hero: {
      date: article.date,
      readTime: article.readTime,
      title: article.title,
      accent: article.accent,
      summary: article.summary,
      image: article.image,
      badge: detail.badge,
      caption: detail.caption,
      scroll: "Scroll to the article",
      author,
      topics: detail.topics,
      topicsLabel: "Topics",
    },
    share: {
      label: "Share",
      linkedin: "LinkedIn",
      copy: "Copy link",
      copied: "Link copied",
    },
    body: detail.body,
    close: {
      next: { label: "Next perspective", href: "/blog" },
      bio: { eyebrow: "About the author" },
      author,
    },
    related: {
      eyebrow: "Related thinking",
      title: "Keep putting purpose to work.",
      cta: { label: "View More", href: "/blog" },
      slider: {
        label: "Related perspectives",
        prev: "Previous perspectives",
        next: "Next perspectives",
        goTo: "Go to perspective",
      },
      card: { readTime: "{n} min read", link: "Read More" },
    },
    newsletter,
  };

  return (
    <main>
      <Hero data={local_data.hero} />
      <article
        id="article"
        className="scroll-mt-20 bg-white py-12 lg:pt-[calc(80*var(--u))] lg:pb-[calc(100*var(--u))]"
      >
        <div className="container mx-auto px-4">
          <Share data={local_data.share} />
          <div
            className="typography article-copy mt-8 lg:mt-[calc(32*var(--u))]"
            dangerouslySetInnerHTML={{ __html: local_data.body }}
          />
          <Close data={local_data.close} />
        </div>
      </article>
      <Related data={local_data.related} articles={related} />
      <Newsletter data={local_data.newsletter} />
    </main>
  );
}
