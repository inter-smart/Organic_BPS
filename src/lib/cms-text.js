const API_HOST = process.env.NEXT_PUBLIC_API_URL
  ? new URL(process.env.NEXT_PUBLIC_API_URL).host
  : "";

const entities = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#039;": "'",
  "&rsquo;": "’",
  "&ldquo;": "“",
  "&rdquo;": "”",
  "&lt;": "<",
  "&gt;": ">",
};

const blocks = (html) => html?.match(/<p[\s\S]*?<\/p>/g) ?? [];

export function text(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (m) => entities[m] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

// One plain string per <p>.
export function paragraphs(html) {
  return blocks(html).map(text).filter(Boolean);
}

// One segment list per <p>; <span class="text-basecolor"> becomes an accent.
export function segmentParagraphs(html) {
  return blocks(html)
    .map((block) => {
      const spans = [...block.matchAll(/<span([^>]*)>([\s\S]*?)<\/span>/g)];
      const parts = spans.length
        ? spans.map(([, attrs, inner]) => ({
            t: text(inner),
            accent: /text-basecolor\b/.test(attrs),
          }))
        : [{ t: text(block) }];
      return parts
        .filter((s) => s.t)
        .map((s, i, all) => {
          const gap = i && !/\s$/.test(all[i - 1].t) ? " " : "";
          return s.accent ? { t: gap + s.t, accent: true } : { t: gap + s.t };
        });
    })
    .filter((p) => p.length);
}

// Links that only point back at the CMS site are ignored.
export function link(url) {
  if (!url) return undefined;
  try {
    return new URL(url).host === API_HOST ? undefined : url;
  } catch {
    return url;
  }
}

export function cta(section) {
  return { label: section?.button_name, href: link(section?.button_link) };
}

// "76 %" -> { value: 76, suffix: "%" }
export function figure(raw) {
  const m = /^(\d+(?:\.\d+)?)\s*(.*)$/.exec((raw ?? "").trim());
  return { value: m ? Number(m[1]) : 0, suffix: m?.[2] ?? "" };
}
