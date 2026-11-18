import Image from "next/image";

export default function RouteLoader() {
  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center bg-basecolor4"
      role="status"
      aria-label="Loading"
    >
      <div className="relative aspect-250/47 w-56 sm:w-72 xl:w-87.5">
        <Image
          src="/images/organic-bps-logo.png"
          alt="Organic BPS"
          fill
          loading="eager"
          sizes="350px"
          className="object-contain"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.75 overflow-hidden bg-white/10">
        <div className="route-loader-bar h-full w-1/3 bg-basecolor" />
      </div>
    </div>
  );
}
