import ClientCarousel from "@/components/common/client-carousel";
import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";

export default function ClientLogos({ data }) {
  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="relative overflow-hidden border-t border-[#cdc6c6] bg-white pt-14 pb-12 sm:pt-16 xl:pt-39 xl:pb-16"
    >
      <div className="container mx-auto px-4 text-center">
        <Reveal variant="up">
          <Heading as="h2" id="clients-title" size="displayMd" className="mx-auto max-w-5xl text-[#171717]">
            <RichLines lines={data?.title} />
          </Heading>
        </Reveal>
        <Reveal as="p" variant="up" delay={0.15} className="mx-auto mt-5 max-w-3xl text-sm/[1.8] text-black sm:text-base/[1.8] xl:mt-6 xl:max-w-221 xl:text-lead/[1.6] text-pretty">
          {data?.text}
        </Reveal>
      </div>
      <Reveal variant="scale" delay={0.2} className="mt-0 xl:-mt-6">
        <ClientCarousel items={data?.items} />
      </Reveal>
    </section>
  );
}
