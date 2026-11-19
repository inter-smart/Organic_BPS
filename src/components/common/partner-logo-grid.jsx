"use client";

import { Suspense } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { A11y, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";

function LogoCard({ logo }) {
  return (
    <div className="flex aspect-[330/242] items-center justify-center rounded-[20px] bg-basecolor28 lg:rounded-[calc(20*var(--u))]">
      <div className="relative h-[60%] w-3/4">
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          draggable={false}
          sizes="(min-width: 640px) 30vw, 40vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function PartnerLogoGrid({
  logos = [],
  label,
  bleed = false,
  className,
}) {
  const gridClassName = cn(
    "w-full xl:hidden",
    bleed && "lg:w-[126.2%]",
    className,
  );

  return (
    <Suspense
      fallback={
        <div
          role="region"
          aria-label={label}
          className={cn(gridClassName, "grid grid-cols-2 gap-3 sm:grid-cols-3")}
        >
          {logos.map((logo, i) => (
            <LogoCard key={`${logo.id}-${i}`} logo={logo} />
          ))}
        </div>
      }
    >
      <Swiper
        aria-label={label}
        aria-roledescription="carousel"
        className={gridClassName}
        modules={[A11y, Grid]}
        role="region"
        slidesPerGroup={1}
        slidesPerView={2}
        spaceBetween={12}
        breakpoints={{
          640: {
            grid: {
              fill: "row",
              rows: 2,
            },
            slidesPerGroup: 1,
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            grid: {
              fill: "row",
              rows: 3,
            },
            slidesPerView: 3,
          },
        }}
      >
        {logos.map((logo) => (
          <SwiperSlide key={logo.id}>
            <LogoCard logo={logo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Suspense>
  );
}
