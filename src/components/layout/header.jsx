"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/common/button";
import MenuSheet from "@/components/layout/menu-sheet";

/** Site header — fixed to the top; transparent over the hero, solid once the page scrolls. Nav links show from xl; below that they live in the menu sheet. */
export default function Header({ data }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-white transition-[padding,background-color,backdrop-filter] duration-500",
        stuck ? "bg-basecolor7/90 py-3 backdrop-blur-md lg:py-4" : "pt-5 sm:pt-7 lg:pt-11"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" aria-label={`${data?.logo?.alt ?? "Organic BPS"} — home`} className="relative block shrink-0">
          <div className="relative aspect-250/47 w-40 sm:w-48 lg:w-63.5">
            <Image src="/images/organic-bps-logo.png" alt={data?.logo?.alt ?? "Organic BPS"} fill loading="eager" fetchPriority="high" sizes="350px" className="object-contain object-left" />
          </div>
          <div className="absolute -top-0.5 right-0 w-2.5 lg:w-3">
            <Image src="/images/registered-mark.svg" alt="" width={10} height={10} className="size-full" />
          </div>
        </Link>

        <nav aria-label="Main" className="ml-auto mr-10 hidden items-center gap-10 xl:mr-14 xl:gap-15 whitespace-nowrap lg:flex">
          <span aria-hidden="true" className="-mr-6 xl:-mr-9 size-1.5 rounded-full bg-basecolor" />
          {data?.links?.map((link) => (
            <Link
              key={link?.id}
              href={link?.href ?? "#"}
              className="relative text-lg font-medium text-white transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-basecolor after:transition-transform after:duration-500 hover:text-white/90 hover:after:scale-x-100"
            >
              {link?.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {data?.cta ? (
            <Button href={data.cta.href} variant="dark" size="sm" arrow={false} className="hidden lg:inline-flex">
              {data.cta.label}
            </Button>
          ) : null}
          <MenuSheet links={data?.links} cta={data?.cta} />
        </div>
      </div>
    </header>
  );
}
