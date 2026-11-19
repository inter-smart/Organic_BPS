# Metadata implementation guide (Next.js App Router + CMS API)

How SEO/meta tags work in this project, written so it can be reproduced in another Next.js project whose CMS sends `meta_title`, `meta_description`, `meta_keywords` and a raw-HTML `other_meta_tags` string per page.

## 1. Big picture

Four layers, each with one job:

| Layer | File | Job |
|---|---|---|
| Env/config | `src/data/seo.js` | `siteUrl` (required) and `allowIndexing` flag |
| Global defaults | `src/app/[lang]/layout.js` | `metadataBase`, default `robots`, `viewport.themeColor`, JSON-LD |
| Per-page builder | `src/lib/seo.js` → `buildMetadata()` | Turns CMS fields into a Next `Metadata` object (title, canonical, hreflang, OG, Twitter) |
| CMS tag parser | `src/lib/meta-tags.js` + `<MetaTags>` | Safely parses the CMS `other_meta_tags` HTML string; splits it into what Next Metadata can render vs. raw `<meta>` tags |

Plus crawler files: `src/app/robots.js`, `src/app/[lang]/sitemap.xml/route.js`, and an `X-Robots-Tag` header in `next.config.mjs`.

## 2. Data flow on every page

```
page.js
  const getX = cache(() => apiGet("/x"))        // one fetch shared by metadata + page
  generateMetadata()  -> buildMetadata({ title, description, keywords, otherMetaTags }, "/route")
  page()              -> <MetaTags html={banner.other_meta_tags} />  + sections
```

Every page does both calls. `generateMetadata` produces the head tags Next can write; `<MetaTags>` renders the leftovers.

### Where the CMS puts the fields

| Page type | Source of meta fields |
|---|---|
| Home, About, Owners, Gallery, Contact, Newsroom list, Special-offers list, Certified, Quote, Test drive | `banner.meta_title / meta_description / meta_keywords / other_meta_tags` |
| Newsroom detail | `news.meta_tags.meta_*` |
| Special-offer detail | top-level `meta_tags.meta_*`; title falls back to `special_offer.title` |
| Vehicle detail | `vehicle.meta_tags.title / description / keywords / other_meta_tags` (no `meta_` prefix) |
| Privacy / Terms | on `policy` itself (`policy.meta_title` ...) |
| Thank-you | static; `robots: { index: false, follow: false }` passed to `buildMetadata` |
| 404 | plain `{ title }` only |

Detail pages pass the slug from the API response (`/newsroom/${news.slug}`) so the canonical is correct.

Typical page:

```js
const getHome = cache(() => apiGet("/home"));

export async function generateMetadata() {
  const { banner } = ensureData(await getHome());
  return buildMetadata(
    {
      title: banner.meta_title,
      description: banner.meta_description,
      keywords: banner.meta_keywords,
      otherMetaTags: banner.other_meta_tags,
    },
    "/", // route WITHOUT the language prefix
  );
}

export default async function Page() {
  const { banner } = ensureData(await getHome());
  return (<><MetaTags html={banner.other_meta_tags} /> ...sections</>);
}
```

## 3. `buildMetadata(fields, path)` (`src/lib/seo.js`)

Inputs: `{ title, description, keywords, otherMetaTags, robots? }` and the route path.

Output:
- `title`, `description`, `keywords` passed straight through (null is fine).
- `alternates.canonical` = absolute `siteUrl` + `/{lang}{path}`.
- `alternates.languages` = one entry per locale + `x-default` (default locale), merged with any `<link rel=alternate hreflang>` the CMS sent.
- `openGraph` defaults: `type: website`, `siteName` (from dictionary), `locale` (`en_OM` / `ar_OM`), `url`, title, description, default image `/images/logo.png` 1200×630. Then **spread the CMS OG values last** so they override defaults.
- `twitter` defaults: `summary_large_image`, title, description, default image; CMS values spread last.
- `robots` only if passed (used by thank-you pages).
- `other` = CMS plain `name=` metas.

Rule: **CMS wins for og/twitter; the page wins for title/description/keywords/robots/canonical.**

## 4. CMS `other_meta_tags` parser (`src/lib/meta-tags.js`)

The CMS sends one raw HTML string such as `<meta name="author" content="..."><meta property="og:image" content="..."><link rel="alternate" hreflang="ar" href="...">`. It is untrusted, so it is parsed with regex into attribute objects (no `dangerouslySetInnerHTML`) and filtered by allowlists.

Parsing rules:
- Only `<meta>` and `<link rel="alternate">` are read. Scripts, JSON-LD and everything else are dropped.
- Allowed attributes: `name, property, content, itemprop, http-equiv, media` (meta); `rel, href, hreflang` (link). HTML entities are decoded.
- **Owned (ignored from CMS):** `title, description, keywords, robots` – so the CMS cannot override noindex.
- **`http-equiv` allowlist:** only `x-ua-compatible`, `content-language` (blocks `refresh`, `set-cookie`, CSP).
- `<link rel=canonical>` is ignored so there is never a second canonical.

Two exports split the result so nothing renders twice:

### `metadataFromTags(html)` → Next Metadata fields (used by `buildMetadata`)
| CMS tag | Goes to |
|---|---|
| `<meta name=X>` | `other[X]` (duplicates collapsed, repeats become an array) |
| `og:image` (+ `og:image:alt/width/height`) | `openGraph.images` |
| `og:title/description/url/site_name/type/locale` | `openGraph.*` |
| `twitter:title/description/card/site/creator` | `twitter.*` |
| `twitter:image` | `twitter.images` |
| `<link rel=alternate hreflang>` | `alternates.languages` |

### `rawMetaTags(html)` → `<MetaTags>` component
Next's `metadata.other` only writes `name=` tags, so the rest is rendered as real `<meta>` elements: other `property=` (`fb:app_id`, `article:*`), `itemprop`, allowlisted `http-equiv`, and `name=` with `media` (e.g. `theme-color`).

```jsx
// components/layout/common/MetaTags.jsx
const REACT_PROPS = { "http-equiv": "httpEquiv", itemprop: "itemProp" };
export default function MetaTags({ html }) {
  return rawMetaTags(html).map((attrs, i) => (
    <meta key={i} {...Object.fromEntries(
      Object.entries(attrs).map(([k, v]) => [REACT_PROPS[k] ?? k, v]))} />
  ));
}
```
React 19 hoists `<meta>` into `<head>` (except `itemProp` ones, which stay in the body).

## 5. Global layer (`layout.js`, `seo.js` data)

```js
export const metadata = {
  metadataBase: new URL(siteUrl),
  robots: allowIndexing ? { index: true, follow: true }
                        : { index: false, follow: false, noarchive: true },
};
export const viewport = { themeColor: "#231f20" };
```
- `siteUrl` = `NEXT_PUBLIC_SITE_URL` (module throws if missing). `allowIndexing` = `NEXT_PUBLIC_APP_ENV === "production"`.
- JSON-LD (dealer/organization) is rendered once in the layout as `<script type="application/ld+json">`, built from `/site-settings`, with `<` escaped. Omitted if the API fails.
- `opengraph-image.jpg`, `icon.png`, `apple-icon.png` live in `src/app` (file-convention icons).
- Caveat: the layout's `themeColor` renders first, so a CMS `theme-color` tag has no effect.

## 6. Indexing control (three independent layers)

When `allowIndexing` is false (staging/default):
1. `<meta name="robots" content="noindex, nofollow, noarchive">` from layout metadata.
2. `robots.js` returns `Disallow: /`.
3. `next.config.mjs` adds header `X-Robots-Tag: noindex, nofollow, noarchive`.

When true: index/follow, `Allow: /`, no header. Sitemap URLs are listed in `robots.js` either way.

## 7. Sitemap (`app/[lang]/sitemap.xml/route.js`)

A **route handler**, not `sitemap.js` (metadata files inside a root-param segment get emitted at `/-/sitemap.xml`). One per language (`/en/sitemap.xml`, `/ar/sitemap.xml`), `force-dynamic`, a static route list with priorities plus dynamic URLs fetched live from the CMS (news, offers, vehicles). `next.config.mjs` rewrites `/en/robots.txt`-style probes to the root file.

## 8. Checklist to port to another project

1. Add `src/data/seo.js` with `siteUrl` (throw if unset) and `allowIndexing`.
2. Add `src/lib/meta-tags.js` (parser, allowlists, `metadataFromTags`, `rawMetaTags`) - keep it pure (no `@/` imports) so `node --test` can run it.
3. Add `src/lib/seo.js` `buildMetadata` (drop the locale parts if single-language: keep canonical, OG, Twitter defaults).
4. Add `<MetaTags>` component.
5. In `layout.js` set `metadataBase`, default `robots`, `viewport`, optional JSON-LD.
6. In every page: `cache()` the fetch, then `generateMetadata → buildMetadata(...)` and `<MetaTags html={...} />` in the body.
7. Add `robots.js`, the sitemap, and the `X-Robots-Tag` header for non-production.
8. Set env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_ENV=production` on live only.
9. Thank-you/utility pages: pass `robots: { index: false, follow: false }`.
10. Add the unit tests for the parser (the originals were deleted in commit `8f89856`; recover them with `git show 8f89856^:src/lib/meta-tags.test.js` if it existed there).

## 9. Notes / gotchas

- Pages must render `<MetaTags>` themselves; forgetting it silently drops `property=`/`itemprop`/`media` tags.
- A null CMS field passes through; the page title is then empty, so add fallbacks (as the offer detail does) where needed.
- **CLAUDE.md is stale here:** it says `layout.js` has no `export const metadata`; it now does (`metadataBase` + robots), but there is still no title template or default canonical in the layout.
- Lighthouse SEO score is lowered by design while noindex is on.
