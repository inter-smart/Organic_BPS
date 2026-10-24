import PurposeWord from "@/components/common/ring";

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

/** Multi-line variant: lines = [segments, segments, ...] — each line is its own block. */
export function RichLines({ lines = [], className }) {
  return lines?.map((line, i) => (
    <span key={i} className={`block ${className ?? ""}`}>
      <RichText segments={line} />
    </span>
  ));
}
