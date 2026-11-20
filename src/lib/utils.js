import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));

const entities = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#039;": "'",
  "&mdash;": "—",
  "&ndash;": "–",
};
const plainText = (v) =>
  v.replace(/<[^>]*>/g, "").replace(/&[a-z#0-9]+;/gi, (m) => entities[m] ?? m);

// CMS title html -> lines of { t, accent? } segments for RichLines: text inside
// <span> is the highlighted colour, <br> or </br> starts a new line.
export function parseTitle(html) {
  if (!html) return [];
  return html
    .split(/<\/?br\s*\/?>/i)
    .map((line) =>
      line
        .split(/(<span[^>]*>[\s\S]*?<\/span>)/i)
        .map((part) => ({ t: plainText(part), accent: /^<span/i.test(part) }))
        .filter((seg) => seg.t.trim())
        .map(({ t, accent }) => (accent ? { t, accent } : { t })),
    )
    .filter((line) => line.length);
}

// CMS title html -> one line per <span> / plain run: "Our <span>story</span>"
// becomes "Our<br><span>story</span>".
export function titleLines(html) {
  if (!html) return "";
  return html
    .split(/(<span[^>]*>[\s\S]*?<\/span>)/i)
    .map((part) => part.trim())
    .filter((part) => plainText(part).trim())
    .join("<br>");
}
