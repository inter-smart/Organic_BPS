import Image from "next/image";
import Link from "next/link";
import MenuSheet from "@/components/layout/menu-sheet";

/** Site header — floats over the hero. Nav links show from xl; below that they live in the menu sheet. */
export default function Header({ data }) {
  return (
    <header className="absolute inset-x-0 top-0 z-50 pt-5 text-white sm:pt-7 xl:pt-11">
      <div className="container flex items-center justify-between">
        <Link href="/" aria-label={`${data?.logo?.alt ?? "Organic BPS"} — home`} className="relative block shrink-0">
          <div className="relative aspect-250/47 w-40 sm:w-48 xl:w-63.5">
            <Image src="/images/organic-bps-logo.png" alt={data?.logo?.alt ?? "Organic BPS"} fill priority sizes="254px" className="object-contain object-left" />
          </div>
          <div className="absolute -top-0.5 right-0 w-2.5 xl:w-3">
            <Image src="/images/registered-mark.svg" alt="" width={10} height={10} className="size-full" />
          </div>
        </Link>

        <nav aria-label="Main" className="ml-auto mr-20 hidden items-center gap-15 xl:flex">
          <span aria-hidden="true" className="-mr-9 size-1.5 rounded-full bg-basecolor" />
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

        <MenuSheet links={data?.links} cta={data?.cta} />
      </div>
    </header>
  );
}
