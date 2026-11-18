import PurposeWord, { Ring } from "@/components/common/ring";
import { text } from "@/lib/cms-text";

/**
 * Renders mixed-colour copy from data: segments = [{ t: "text", accent?: true, ring?: true, className? }].
 * `ring` swaps the first "o" of the segment's word for the animated energy ring.
 */
export function RichText({ segments = [] }) {
  return segments?.map((s, i) => {
    const content = s?.ring ? <PurposeWord word={s?.t} /> : s?.t;
    return s?.accent || s?.className ? (
      <span key={i} className={s?.accent ? `text-basecolor ${s?.className ?? ""}` : s?.className}>
        {content}
      </span>
    ) : (
      <span key={i}>{content}</span>
    );
  });
}

// A full stop outside a highlighted span takes the accent colour too.
function withStops(t, accent) {
  return t
    .split(/(\.(?=\s|$))/)
    .map((chunk, i) =>
      chunk === "." ? (
        <span key={i} className={accent}>
          .
        </span>
      ) : (
        chunk
      ),
    );
}

// Plain text between tags; text() trims, so the edge spaces are put back.
function plain(part, cls, key, accent) {
  const body = text(part);
  const t = body
    ? (/^\s/.test(part) ? " " : "") + body + (/\s$/.test(part) ? " " : "")
    : /\s/.test(part)
      ? " "
      : "";
  if (!t) return null;
  // if (!cls && accent) return <span key={key}>{withStops(t, accent)}</span>;
  return cls ? (
    <span key={key} className={cls}>
      {t}
    </span>
  ) : (
    <span key={key}>{t}</span>
  );
}

// <b>o</b> becomes the ring image (the letter stays for screen readers). The
// word around it is kept on one line.
function ringParts(html, cls, accent) {
  return html.split(/(\S*<b[^>]*>[\s\S]*?<\/b>\S*)/i).map((chunk, i) => {
    if (!/<b/i.test(chunk)) return plain(chunk, cls, i, accent);
    return (
      <span key={i} className="whitespace-nowrap">
        {chunk.split(/(<b[^>]*>[\s\S]*?<\/b>)/i).map((part, j) =>
          /^<b/i.test(part) ? (
            <span key={j} className={cls}>
              <span className="sr-only">{text(part)}</span>
              <Ring />
            </span>
          ) : (
            plain(part, cls, j, accent)
          ),
        )}
      </span>
    );
  });
}

// Only the brand colour tokens are honoured; CMS classes are not generated.
function spanColor(tag, accent) {
  const cls = /class=["']\s*(text-basecolor\d*)\s*["']/i.exec(tag)?.[1];
  return cls ?? accent;
}

/**
 * Title from CMS html: <span> text is highlighted, <b>o</b> is swapped for the
 * ring image and <br> starts a new line.
 */
export function renderTitle(title, accent = "text-basecolor") {
  if (!title) return null;
  return title.split(/<\/?br\s*\/?>/i).map((line, i) => (
    <span key={i} className="block">
      {line.split(/(<span[^>]*>[\s\S]*?<\/span>)/i).map((part, j) => {
        const isSpan = /^<span/i.test(part);
        const inner = isSpan
          ? part.replace(/^<span[^>]*>|<\/span>$/gi, "")
          : part;
        const cls = isSpan ? spanColor(part, accent) : undefined;
        return <span key={j}>{ringParts(inner, cls, accent)}</span>;
      })}
    </span>
  ));
}

/** Multi-line variant: lines = [segments, segments, ...] — each line is its own block. */
export function RichLines({ lines = [], className }) {
  return lines?.map((line, i) => (
    <span key={i} className={`block ${className ?? ""}`}>
      <RichText segments={line} />
    </span>
  ));
}
