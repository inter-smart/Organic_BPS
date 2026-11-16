import Image from "next/image";
import Heading from "@/components/common/heading";
import Parallax from "@/components/common/parallax";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";
import { paragraphs } from "@/lib/cms-text";

function Photo({ image, sizes, className, delay = 0 }) {
  return (
    <Reveal
      variant="clip"
      delay={delay}
      className={`relative overflow-hidden rounded-[30px] ${className}`}
    >
      <Parallax className="absolute inset-0" from={-5} to={5} scale={1.12}>
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
          />
        ) : null}
      </Parallax>
    </Reveal>
  );
}

export default function Team({ data, title }) {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="relative overflow-hidden bg-basecolor7 py-16 text-white sm:py-20 lg:flex lg:min-h-270 lg:items-center lg:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[976fr_630fr] lg:gap-x-[5vw] lg:gap-y-0">
          <div className="lg:flex lg:flex-col lg:justify-between lg:gap-[calc(60*var(--u))]">
            <Reveal variant="up">
              <Heading
                as="h2"
                id="team-title"
                size="display"
                className="text-white lg:text-[clamp(40px,calc(88*var(--u)),88px)]"
              >
                <RichLines lines={title} />
              </Heading>
            </Reveal>
            <Photo
              image={data?.image_two}
              sizes="(min-width: 1280px) 52vw, 92vw"
              delay={0.1}
              className="mt-8 aspect-1672/941 w-full lg:mt-0 lg:max-w-[976px]"
            />
          </div>

          <div className="lg:pt-[calc(10*var(--u))]">
            <Photo
              image={data?.image_one}
              sizes="(min-width: 1280px) 33vw, 92vw"
              className="aspect-2520/1575 w-full"
            />
            <div className="mt-8 lg:mt-[calc(85*var(--u))]">
              <Reveal
                variant="left"
                className="h-0.5 w-10 origin-left bg-basecolor lg:h-[calc(3*var(--u))] lg:w-[calc(40*var(--u))]"
              />
              <div className="mt-6 space-y-5 text-base/[1.7] font-medium text-white sm:text-lg/[1.7] lg:mt-[calc(36*var(--u))] lg:space-y-[calc(30*var(--u))] lg:text-body">
                {paragraphs(data?.description).map((p, i) => (
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
