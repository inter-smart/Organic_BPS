import Image from "next/image";
import Button from "@/components/common/button";
import Heading from "@/components/common/heading";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { RichLines, renderTitle } from "@/components/common/rich-text";
import { cta, noteLines, paragraphs, text } from "@/lib/cms-text";

export default function Founder({ data, title }) {
  const button = cta(data);

  return (
    <section
      id="who-we-are"
      aria-labelledby="founder-title"
      className="relative isolate overflow-hidden bg-black text-white lg:h-270"
    >
      <div className="relative z-10 lg:flex lg:h-full lg:items-center">
        <div className="container mx-auto px-4">
          <div className="py-16 sm:py-20 lg:py-0">
            <div className="lg:max-w-[50%] 2xl:max-w-[56%]">
              <Reveal variant="up">
                <Heading
                  as="h2"
                  id="founder-title"
                  size="display"
                  className="text-white"
                >
                  {/* <RichLines lines={title} /> */}
                  {renderTitle(title)}
                </Heading>
              </Reveal>
              <Reveal
                as="p"
                variant="fade"
                delay={0.1}
                className="mt-3 text-sm font-medium tracking-[0.14em] text-basecolor uppercase lg:mt-6 lg:text-lead lg:tracking-[0.14em]"
              >
                {data.designation}
              </Reveal>
              <div className="mt-4 space-y-5 text-base/[1.8] font-medium text-white sm:text-lg/[1.8] lg:mt-6 lg:space-y-8 lg:text-lead/[2]">
                {paragraphs(data.message).map((p, i) => (
                  <Reveal
                    as="p"
                    key={i}
                    variant="up"
                    delay={0.1 * (i + 1)}
                    className="text-pretty"
                  >
                    {p}
                  </Reveal>
                ))}
              </div>
              <Reveal variant="up" delay={0.3} className="mt-7 lg:mt-8">
                <p className="text-2xl/[1.4] font-bold sm:text-3xl/[1.4] lg:text-title/[1.4]">
                  <RichLines lines={noteLines(data.note)} />
                </p>
              </Reveal>
              <Reveal variant="up" delay={0.4} className="mt-7 lg:mt-11">
                <Button href={button.href} variant="dark">
                  {button.label}
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* portrait — bleeds off the bottom-right edge on xl+, stacked below the copy on smaller screens */}
      <Reveal
        variant="right"
        duration={1.1}
        className="relative mx-auto aspect-1095/955 w-full max-w-2xl lg:absolute lg:right-[2.6%] lg:bottom-0 lg:mx-0 lg:w-[57%] lg:max-w-none"
      >
        <Parallax
          className="absolute inset-0"
          from={12}
          to={0}
          scale={1}
          end="center center"
        >
          {data.image ? (
            <Image
              src={data.image}
              alt={text(data.title)}
              fill
              sizes="(min-width: 1280px) 57vw, 100vw"
              className="object-contain object-bottom"
            />
          ) : null}
        </Parallax>
      </Reveal>
    </section>
  );
}
