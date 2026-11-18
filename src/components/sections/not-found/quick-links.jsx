import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/common/reveal";

export default function QuickLinks({ data }) {
  return (
    <section id="quick-links" aria-labelledby="quick-links-title" className="scroll-mt-20 bg-white py-12 sm:py-16 lg:pt-[calc(41*var(--u))] lg:pb-[calc(60*var(--u))]">
      <div className="container mx-auto px-4">
        <Reveal as="h2" variant="fade" id="quick-links-title" className="text-xs font-bold tracking-[0.18em] text-basecolor14 uppercase lg:text-[clamp(11px,calc(14*var(--u)),14px)]">
          {data?.label}
        </Reveal>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3 lg:mt-[calc(20*var(--u))] lg:gap-[calc(16*var(--u))]">
          {data?.items?.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-[20px] border border-basecolor7/20 bg-white/5 px-6 py-5 text-base font-medium text-basecolor7 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-basecolor14 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basecolor3 motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:rounded-[calc(20*var(--u))] lg:px-[calc(24*var(--u))] lg:py-[calc(20*var(--u))] lg:text-[clamp(14px,calc(18*var(--u)),18px)]"
              >
                <Image src={item.icon} alt={item.label} title={item.label} width={20} height={20} className="size-5 shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="mt-12 h-px bg-basecolor16 lg:mt-[calc(59*var(--u))]" />
      </div>
    </section>
  );
}
