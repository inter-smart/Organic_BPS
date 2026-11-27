const API_HOST = process.env.API_URL
  ? new URL(process.env.API_URL).host
  : "";

const entities = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#039;": "'",
  "&rsquo;": "’",
  "&ldquo;": "“",
  "&rdquo;": "”",
  "&lsquo;": "‘",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
  "&lt;": "<",
  "&gt;": ">",
};

const decode = (value) =>
  value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);/gi, (m, code) => {
    if (code[0] !== "#") return entities[m] ?? m;
    const point =
      code[1].toLowerCase() === "x"
        ? parseInt(code.slice(2), 16)
        : parseInt(code.slice(1), 10);
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : m;
  });

const blocks = (html) => html?.match(/<p[\s\S]*?<\/p>/g) ?? [];

export function text(html) {
  if (!html) return "";
  return decode(html.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

const imageTag = /<img\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi;
const attribute = /([^\s=/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

const escapeAttribute = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Editor images often arrive without alt or title text.
export function withImageText(html, fallback) {
  return (html ?? "").replace(imageTag, (_, source) => {
    const attrs = new Map(
      [...source.matchAll(attribute)].map(([, name, a, b, c]) => [
        name.toLowerCase(),
        (a ?? b ?? c ?? "").replace(/"/g, "&quot;"),
      ]),
    );
    const alt = attrs.get("alt")?.trim();
    const title = attrs.get("title")?.trim();
    const spare = alt || title || escapeAttribute(fallback ?? "");
    attrs.set("alt", alt || spare);
    attrs.set("title", title || spare);
    return `<img ${[...attrs].map(([name, value]) => `${name}="${value}"`).join(" ")}>`;
  });
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

// Body copy with inline emphasis: one segment per <span>, keeping only the
// classes we generate ourselves.
const emphasis = ["font-semibold", "text-basecolor14"];

export function emphasisSegments(html) {
  const first = blocks(html)[0];
  if (!first) return [];
  const segs = [...first.matchAll(/<span([^>]*)>([\s\S]*?)<\/span>/g)]
    .map(([, attrs, inner]) => {
      const t = decode(inner.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ");
      const classes = (/class="([^"]*)"/.exec(attrs)?.[1] ?? "")
        .split(/\s+/)
        .filter((c) => emphasis.includes(c))
        .join(" ");
      return classes ? { t, className: classes } : { t };
    })
    .filter((seg) => seg.t);
  if (segs.length) {
    segs[0].t = segs[0].t.trimStart();
    segs[segs.length - 1].t = segs[segs.length - 1].t.trimEnd();
  }
  return segs;
}

// Scroll-reveal headline: one line per sentence, <span> words in the accent
// colour, the first "o" inside <em> with the ring, sentence-ending full stops in the
// accent.
export function revealLines(html) {
  if (!html) return [];
  const mark = (part) =>
    part.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, (_, inner) =>
      inner.replace(/o/i, "\u0001$&\u0002"),
    );
  const words = html.split(/(<span[^>]*>[\s\S]*?<\/span>)/i).flatMap((part) => {
    const accent = /^<span/i.test(part);
    return text(mark(part))
      .split(" ")
      .filter(Boolean)
      .map((t) => ({ t, accent }));
  });
  const lines = [];
  let line = [];
  for (const { t, accent } of words) {
    const end = /[.!?]$/.test(t);
    const raw = end ? t.slice(0, -1) : t;
    const at = raw.indexOf("\u0001");
    const word = raw.replace(/[\u0001\u0002]/g, "");
    line.push({
      t: word,
      c: accent ? "#da4d47" : at >= 0 ? "#222222" : "#333333",
      ...(at >= 0 && { ring: at }),
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
  if (!url) return undefined;
  try {
    return new URL(url).host === API_HOST ? undefined : url;
  } catch {
    return url;
  }
}

export function cta(section) {
  return { label: section?.button_name, href: section?.button_link };
}

// "76 %" -> { value: 76, suffix: "%" }
export function figure(raw) {
  const m = /^(\d+(?:\.\d+)?)\s*(.*)$/.exec((raw ?? "").trim());
  return { value: m ? Number(m[1]) : 0, suffix: m?.[2] ?? "" };
}


// One line per block span; word colours come from the editor's data-color.
export const lineFrom = (html) => {
  if (!html) return [];
  const blocks = html.split(/<span[^>]*class="[^"]*\bblock\b[^"]*"[^>]*>/i);
  const parts = blocks.length > 1 ? blocks.slice(1) : [html];
  return parts
    .map((block) => {
      const words = [
        ...block.matchAll(
          /<span[^>]*data-color="([^"]*)"[^>]*>([\s\S]*?)<\/span>/gi,
        ),
      ]
        .map(([, c, inner]) => ({ t: text(inner), c }))
        .filter((w) => w.t);
      if (words.length) return words;
      return text(block)
        .split(" ")
        .filter(Boolean)
        .map((t) => ({ t, c: "#da4d47" }));
    })
    .filter((line) => line.length);
};