import { siteUrl } from "@/data/seo";
import { metadataFromTags } from "@/lib/meta-tags";

const SITE_NAME = "Organic BPS";
const DEFAULT_IMAGE = "/images/organic-bps-logo.png";

// CMS fields live under different keys per endpoint; this reads the shared shape
export function cmsMeta(source) {
  return {
    title: source?.meta_title,
    description: source?.meta_description,
    keywords: source?.meta_keywords,
    otherMetaTags: source?.other_meta_tags,
  };
}

// path is the route, e.g. "/blog/my-post". The page owns title, description,
// keywords, robots and canonical; the CMS tags only add or override og/twitter.
export function buildMetadata(
  { title, description, keywords, otherMetaTags, robots },
  path = "/",
) {
  const cms = metadataFromTags(otherMetaTags);

  const url = new URL(path, siteUrl).href;

  const alternates = { canonical: url };
  if (Object.keys(cms.languages).length) alternates.languages = cms.languages;

  const metadata = {
    title: title || undefined,
    description: description || undefined,
    keywords: keywords || undefined,
    alternates,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url,
      title: title || undefined,
      description: description || undefined,
      images: [DEFAULT_IMAGE],
      ...cms.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: title || undefined,
      description: description || undefined,
      images: [DEFAULT_IMAGE],
      ...cms.twitter,
    },
  };
  if (Object.keys(cms.other).length) metadata.other = cms.other;
  if (robots) metadata.robots = robots;
  return metadata;
}
