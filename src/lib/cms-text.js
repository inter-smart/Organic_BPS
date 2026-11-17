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

// "Behaviour Design & Activation" -> "behaviour-design-activation"
export function slug(value) {
  return text(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// One plain string per <li>.
export function listItems(html) {
  return (html?.match(/<li[\s\S]*?<\/li>/g) ?? []).map(text).filter(Boolean);
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

// Scroll-reveal headline: one line per sentence, <span> words in the accent
// colour, "purpose" with the ring, sentence-ending full stops in the accent.
export function revealLines(html) {
  if (!html) return [];
  const words = html.split(/(<span[^>]*>[\s\S]*?<\/span>)/i).flatMap((part) => {
    const accent = /^<span/i.test(part);
    return text(part)
      .split(" ")
      .filter(Boolean)
      .map((t) => ({ t, accent }));
  });
  const lines = [];
  let line = [];
  for (const { t, accent } of words) {
    const end = /[.!?]$/.test(t);
    const word = end ? t.slice(0, -1) : t;
    const ring = word.toLowerCase() === "purpose";
    line.push({
      t: word,
      c: accent ? "#da4d47" : ring ? "#222222" : "#333333",
      ...(ring && { ring }),
    });
    if (end) {
      line.push({ t: t.slice(-1), c: "#da4d47", attach: true });
      lines.push(line);
      line = [];
    }
  }
  if (line.length) lines.push(line);
  return lines;
}

// Two-line sign-off: the text before the <span> stays plain, the <span> text
// becomes the accent line.
export function noteLines(html) {
  if (!html) return [];
  return html
    .split(/(<span[^>]*>[\s\S]*?<\/span>)/i)
    .map((part) => ({ t: text(part), accent: /^<span/i.test(part) }))
    .filter((s) => s.t)
    .map((s) => [s.accent ? s : { t: s.t }]);
}

// Links that only point back at the CMS site are ignored.
export function link(url) {
  console.log("url", url)
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
