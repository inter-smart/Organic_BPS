import Image from "next/image";

/** The glowing "energy ring" that stands in for the letter "o" in the brand word. */
export function Ring({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`relative mx-[0.04em] inline-block h-[0.46em] w-[0.46em] -translate-y-[0.02em] align-baseline ${className}`}
    >
      <Image src="/images/energy-ring.svg" alt="Energy ring" title="Energy ring" width={122} height={122} className="pointer-events-none absolute -inset-[82%] max-w-none w-[264%] h-[264%]" />
    </span>
  );
}

/** "purpose" with the first "o" replaced by the ring; screen readers still read the word. */
export default function PurposeWord({ word = "purpose", at }) {
  const i = at ?? word.toLowerCase().indexOf("o");
  return (
    <span className="whitespace-nowrap">
      <span className="sr-only">{word}</span>
      <span aria-hidden="true">
        {word.slice(0, i)}
        <Ring />
        {word.slice(i + 1)}
      </span>
    </span>
  );
}
