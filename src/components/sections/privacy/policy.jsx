import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import Contents from "@/components/sections/privacy/contents";

export default function Policy({ data }) {
  const items = [...(data?.content ?? "").matchAll(/<h3 id="([^"]+)">([^<]+)<\/h3>/g)].map((m) => ({ id: m[1], title: m[2] }));

  return (
    <section
      id="policy"
      aria-labelledby="policy-title"
      className="relative bg-white py-16 sm:py-20 lg:pt-[calc(124*var(--u))] lg:pb-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[783fr_928fr] lg:gap-0">
          <div>
            <Reveal as="p" variant="fade" className="text-xs font-bold tracking-[0.18em] text-basecolor14 uppercase lg:text-body">
              {data?.eyebrow}
            </Reveal>
            <Reveal variant="up" className="mt-3 lg:mt-[calc(9*var(--u))]">
              <Heading as="h2" id="policy-title" size="display" className="text-basecolor7 lg:max-w-[688px] lg:leading-[1.05]">
                {data?.title}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:pt-[calc(20*var(--u))]">
            <Reveal as="p" variant="up" delay={0.1} className="text-lg/[1.5] font-medium text-basecolor7 lg:max-w-[900px] lg:text-intro/[1.5]">
              {data?.lead}
            </Reveal>
            <Reveal as="p" variant="up" delay={0.2} className="mt-5 text-base/[1.65] text-basecolor9 lg:mt-[calc(38*var(--u))] lg:max-w-[900px] lg:text-lead/[1.65]">
              {data?.copy}
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:mt-[calc(102*var(--u))] lg:grid-cols-[485fr_1023fr] lg:gap-x-[11.4%]">
          <div className="lg:sticky lg:top-28">
            <Contents data={data?.contents} items={items} />
          </div>
    
          <div className="typography policy-copy" dangerouslySetInnerHTML={{ __html: data?.content }} />
        </div>
      </div>
    </section>
  );
}
