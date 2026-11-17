// The CMS sends one raw HTML string of <meta>/<link> tags. It is untrusted, so
// it is parsed into attribute objects and filtered; nothing is injected as HTML.

const META_ATTRS = new Set([
  "name",
  "property",
  "content",
  "itemprop",
  "http-equiv",
  "media",
]);
const LINK_ATTRS = new Set(["rel", "href", "hreflang"]);

// the page owns these, so the CMS cannot override (or un-noindex) them
const OWNED_NAMES = new Set(["title", "description", "keywords", "robots"]);
const HTTP_EQUIV = new Set(["x-ua-compatible", "content-language"]);

const OG_FIELDS = {
  "og:title": "title",
  "og:description": "description",
  "og:url": "url",
  "og:site_name": "siteName",
  "og:type": "type",
  "og:locale": "locale",
};
const TWITTER_FIELDS = {
  "twitter:title": "title",
  "twitter:description": "description",
  "twitter:card": "card",
  "twitter:site": "site",
  "twitter:creator": "creator",
};
const OG_IMAGE_FIELDS = {
  "og:image:alt": "alt",
  "og:image:width": "width",
  "og:image:height": "height",
};

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(value) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const num =
        code[1].toLowerCase() === "x"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      return Number.isFinite(num) && num > 0 && num <= 0x10ffff
        ? String.fromCodePoint(num)
        : match;
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

function readAttrs(tag, allowed) {
  const attrs = {};
  const re = /([a-zA-Z][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(tag))) {
    const key = m[1].toLowerCase();
    if (allowed.has(key) && !(key in attrs)) {
      attrs[key] = decode(m[2] ?? m[3] ?? "").trim();
    }
  }
  return attrs;
}

function parse(html) {
  const metas = [];
  const alternates = [];
  if (typeof html !== "string" || !html) return { metas, alternates };

  const tags = html.match(/<(?:meta|link)\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (/^<meta/i.test(tag)) {
      const attrs = readAttrs(tag, META_ATTRS);
      if (attrs.content === undefined) continue;
      if (!attrs.name && !attrs.property && !attrs.itemprop && !attrs["http-equiv"]) {
        continue;
      }
      if (attrs.name && OWNED_NAMES.has(attrs.name.toLowerCase())) continue;
      if (attrs["http-equiv"]) {
        if (!HTTP_EQUIV.has(attrs["http-equiv"].toLowerCase())) continue;
      }
      metas.push(attrs);
    } else {
      const attrs = readAttrs(tag, LINK_ATTRS);
      if (attrs.rel?.toLowerCase() === "alternate" && attrs.hreflang && attrs.href) {
        alternates.push(attrs);
      }
    }
  }
  return { metas, alternates };
}

// og:/twitter: keys may arrive as name= or property=
function socialKey(attrs) {
  const key = (attrs.property || attrs.name || "").toLowerCase();
  return /^(og|twitter):/.test(key) ? key : null;
}

function isHandled(attrs) {
  const key = socialKey(attrs);
  if (!key) return false;
  return (
    key === "og:image" ||
    key in OG_FIELDS ||
    key in OG_IMAGE_FIELDS ||
    key === "twitter:image" ||
    key in TWITTER_FIELDS
  );
}

// Fields Next's Metadata API can render: plain name= tags, og, twitter, hreflang.
export function metadataFromTags(html) {
  const { metas, alternates } = parse(html);
  const other = {};
  const openGraph = {};
  const twitter = {};
  const ogImages = [];
  const twitterImages = [];

  for (const attrs of metas) {
    const key = socialKey(attrs);
    if (key) {
      if (key === "og:image") ogImages.push({ url: attrs.content });
      else if (key in OG_IMAGE_FIELDS) {
        const last = ogImages[ogImages.length - 1];
        if (last) last[OG_IMAGE_FIELDS[key]] = attrs.content;
      } else if (key in OG_FIELDS) openGraph[OG_FIELDS[key]] = attrs.content;
      else if (key === "twitter:image") twitterImages.push(attrs.content);
      else if (key in TWITTER_FIELDS) twitter[TWITTER_FIELDS[key]] = attrs.content;
    }
    if (isHandled(attrs)) continue;

    if (attrs.name && !attrs.media && !attrs.property) {
      const prev = other[attrs.name];
      if (prev === undefined) other[attrs.name] = attrs.content;
      else if (Array.isArray(prev)) prev.push(attrs.content);
      else if (prev !== attrs.content) other[attrs.name] = [prev, attrs.content];
    }
  }

  if (ogImages.length) openGraph.images = ogImages;
  if (twitterImages.length) twitter.images = twitterImages;

  const languages = {};
  for (const link of alternates) languages[link.hreflang] = link.href;

  return {
    other,
    openGraph,
    twitter,
    languages,
  };
}

// Everything Next's `other` cannot write: property=, itemprop, http-equiv and
// name= tags with a media attribute.
export function rawMetaTags(html) {
  return parse(html).metas.filter((attrs) => {
    if (isHandled(attrs)) return false;
    if (attrs.itemprop || attrs["http-equiv"] || attrs.property) return true;
    return Boolean(attrs.name && attrs.media);
  });
}
