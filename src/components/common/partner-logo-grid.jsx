import Image from "next/image";
import Reveal from "@/components/common/reveal";
import { cn } from "@/lib/utils";

/**
 * Grid of logo cards; any number of logos flows onto new rows.
 * logos: [{ id, src, alt, width, height, w }] — `w` is the logo width as a percentage of its card.
 * `bleed` widens the grid past its column so the last column runs off the page edge, as in the design.
 */
export default function PartnerLogoGrid({
  logos = [],
  label,
  bleed = false,
  className,
}) {
  return (
    <ul
      aria-label={label}
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-x-[1.75%] lg:gap-y-[calc(24*var(--u))]",
        bleed && "lg:w-[126.2%]",
        className,
      )}
    >
      {logos.map((logo, i) => (
        <div
          as="li"
          key={logo.id}
          className="flex aspect-[330/242] items-center justify-center rounded-[20px] bg-basecolor28 lg:rounded-[calc(20*var(--u))]"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            title={logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="(min-width: 1024px) 18vw, 40vw"
            style={{ "--logo-w": logo.w }}
            className="h-auto max-h-[60%] w-[calc(var(--logo-w)*1%)] object-contain"
          />
        </div>
      ))}
    </ul>
  );
}
