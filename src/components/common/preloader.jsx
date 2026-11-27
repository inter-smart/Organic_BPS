import Image from "next/image";

/**
 * Intro loader: logo + 0-100 counter over the brand-black screen, then a curtain wipes up to reveal the hero.
 * CSS only (`.preloader` in globals.css), so it lifts about a second after first paint without waiting for scripts.
 * Plays on the first page load of a browser session.
 */
export default function Preloader() {
  return (
    <div className="preloader fixed inset-0 z-100 flex flex-col items-center justify-center bg-basecolor4 text-white [clip-path:inset(0_0_0_0)]" role="status" aria-label="Loading">
      <div data-logo className="relative aspect-250/47 w-56 sm:w-72 xl:w-87.5">
        <Image src="/images/organic-bps-logo.png" alt="Organic BPS" title="Organic BPS" fill loading="eager" fetchPriority="high" sizes="350px" className="object-contain" />
      </div>
      <div data-meta className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-6 sm:px-10 sm:pb-10">
        <span className="text-sm tracking-[0.14em] text-white/60 uppercase sm:text-base">Purpose is the journey</span>
        <span data-count aria-hidden="true" className="font-inter text-5xl font-bold tabular-nums sm:text-7xl xl:text-8xl" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.75 bg-white/10">
        <div data-bar className="h-full origin-left scale-x-0 bg-basecolor" />
      </div>
    </div>
  );
}
