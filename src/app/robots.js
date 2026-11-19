import { allowIndexing, siteUrl } from "@/data/seo";

export default function robots() {
  return {
    rules: allowIndexing
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
