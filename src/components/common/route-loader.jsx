import Image from "next/image";

export default function RouteLoader() {
  // holds a screen of height so the footer does not jump when the page replaces the loader
  return (
    <div className="min-h-svh">
      <div
        className="route-loader fixed inset-0 z-90 flex flex-col items-center justify-center gap-10 bg-basecolor4"
        role="status"
        aria-label="Loading"
      >
        <div className="route-loader-logo relative aspect-250/47 w-56 sm:w-72 xl:w-87.5">
          <Image
            src="/images/organic-bps-logo.png"
            alt="Organic BPS"
            title="Organic BPS"
            fill
            loading="eager"
            sizes="350px"
            className="object-contain"
          />
        </div>
        <div className="route-loader-ring" aria-hidden="true">
          <span className="route-loader-dot" />
        </div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
