import { siteUrl } from "@/data/seo";
import { cmsGet } from "@/lib/cms";

const routes = [
  { path: "/", priority: 1 },
  { path: "/who-we-are", priority: 0.8 },
  { path: "/what-we-do", priority: 0.8 },
  { path: "/why-purpose", priority: 0.8 },
  { path: "/how-we-work", priority: 0.8 },
  { path: "/blog", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms-and-conditions", priority: 0.3 },
];

const CACHE = false;

export default async function sitemap() {
  const { data } = await cmsGet("blogs/filter", {
    params: { per_page: 1000 },
    cache: CACHE,
  });
  const posts = (data?.data ?? []).filter((b) => b.slug);

  return [
    ...routes.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      priority,
    })),
    ...posts.map((b) => ({
      url: `${siteUrl}/blog/${b.slug}`,
      priority: 0.6,
    })),
  ];
}
