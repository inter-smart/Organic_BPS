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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    let accumulatedScroll = 0;
    let ticking = false;

    const TOP_THRESHOLD = 80;
    const HIDE_THRESHOLD = 20;
    const SHOW_THRESHOLD = 10;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Keep header visible while navigation menu / dialog is open
          if (document.querySelector('[role="dialog"]')) {
            setVisible(true);
            ticking = false;
            return;
          }

          const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;
          const maxScroll = Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight
          );

          // Always visible and unstuck near the top of the page
          if (currentScrollY <= TOP_THRESHOLD) {
            setStuck(false);
            setVisible(true);
            accumulatedScroll = 0;
            lastScrollY = currentScrollY;
            ticking = false;
            return;
          }

          setStuck(true);

          // Prevent iOS/macOS rubber-band at the bottom from triggering false scroll up
          if (maxScroll > 0 && currentScrollY >= maxScroll - 15) {
            lastScrollY = currentScrollY;
            ticking = false;
            return;
          }

          const delta = currentScrollY - lastScrollY;

          // Reset accumulation if scroll direction flipped
          if ((delta > 0 && accumulatedScroll < 0) || (delta < 0 && accumulatedScroll > 0)) {
            accumulatedScroll = 0;
          }
          accumulatedScroll += delta;

          if (accumulatedScroll >= HIDE_THRESHOLD) {
            // Forward scroll -> hide
            setVisible(false);
            accumulatedScroll = 0;
          } else if (accumulatedScroll <= -SHOW_THRESHOLD) {
            // Reverse scroll -> show
            setVisible(true);
            accumulatedScroll = 0;
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onFocusCapture={() => setVisible(true)}
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-white header-smooth",
        visible ? "header-visible" : "header-hidden",
        stuck
          ? "bg-basecolor7/90 py-3 backdrop-blur-md lg:py-4 shadow-md shadow-black/20"
          : "pt-5 sm:pt-7 lg:pt-11",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label={`${data?.logo?.alt ?? "Organic BPS"} — home`}
            className="relative block shrink-0"
          >
            <div className="relative aspect-250/47 w-40 sm:w-48 lg:w-63.5">
              <Image
                src="/images/organic-bps-logo.png"
                alt={data?.logo?.alt ?? "Organic BPS"}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="350px"
                className="object-contain object-left"
              />
            </div>
            <div className="absolute -top-0.5 right-0 w-2.5 lg:w-3">
              <Image
                src="/images/registered-mark.svg"
                alt=""
                width={10}
                height={10}
                className="size-full"
              />
            </div>
          </Link>

          <nav
            aria-label="Main"
            className="mx-auto hidden items-center gap-10 xl:gap-15 whitespace-nowrap lg:flex"
          >
            <span
              aria-hidden="true"
              className="-mr-6 xl:-mr-9 size-1.5 rounded-full bg-basecolor"
            />
            {data?.links?.map((link) => (
              <Link
                key={link?.id}
                href={link?.href ?? "#"}
                className="relative text-sm 2xl:text-lg font-medium text-white transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-basecolor after:transition-transform after:duration-500 hover:text-white/90 hover:after:scale-x-100"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <MenuSheet links={data?.links} cta={data?.cta} />
          </div>
        </div>
      </div>
    </header>
  );
}
