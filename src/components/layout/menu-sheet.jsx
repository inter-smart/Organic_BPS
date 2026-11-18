"use client";

import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

/** Off-canvas menu (shadcn Sheet): the hamburger in the header, plus the nav links on small screens. */
export default function MenuSheet({ links = [], cta }) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className="relative block aspect-[34/23.4] w-7 shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white sm:w-8 lg:w-8.5"
      >
        <Image src="/images/menu-icon.svg" alt="Menu" title="Menu" fill className="object-contain" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-0 bg-basecolor4 p-0 text-white sm:max-w-md [&>button]:text-white">
        <SheetTitle className="sr-only">Site menu</SheetTitle>
        <SheetDescription className="sr-only">Navigate to a section of the site</SheetDescription>
        <nav aria-label="Primary" className="flex h-full flex-col justify-center gap-6 px-8 sm:px-12">
          {links?.map((link) => (
            <SheetClose asChild key={link?.id}>
              <Link
                href={link?.href ?? "#"}
                className="group flex items-center gap-4 text-3xl font-bold tracking-tight transition-colors hover:text-basecolor sm:text-4xl"
              >
                <span className="h-px w-0 bg-basecolor transition-all duration-500 group-hover:w-10" />
                {link?.label}
              </Link>
            </SheetClose>
          ))}
          {cta ? (
            <SheetClose asChild>
              <Link
                href={cta?.href ?? "#"}
                className="mt-6 w-fit rounded-full border-[2.5px] border-basecolor3 px-8 py-3 text-lg font-medium transition-colors hover:bg-basecolor3"
              >
                {cta?.label}
              </Link>
            </SheetClose>
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
