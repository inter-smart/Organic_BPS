import Heading from "@/components/common/heading";
import Reveal from "@/components/common/reveal";
import { RichLines } from "@/components/common/rich-text";
import ContactForm from "./contact-form";

export default function Enquiry({ data, title, email, phone, topics }) {
  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-title"
      className="relative bg-white py-16 sm:py-20 lg:py-[50px_110px]! 2xl:py-[calc(100*var(--u))]"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_540px] xl:grid-cols-[minmax(0,1fr)_620px] 2xl:grid-cols-[minmax(0,1fr)_750px] 3xl:grid-cols-[minmax(0,1fr)_940px]! lg:items-start lg:gap-2.5">
          <div>
            <Reveal
              as="p"
              variant="fade"
              className="text-xs font-bold tracking-[0.2em] text-basecolor uppercase lg:text-[clamp(14px,calc(20*var(--u)),20px)]"
            >
              {data?.title}
            </Reveal>
            <Reveal variant="up" delay={0.1}>
              <Heading
                as="h2"
                id="enquiry-title"
                size="display"
                className="mt-3 text-basecolor2 lg:mt-[calc(14*var(--u))] text-[40px] sm:text-[58px]! lg:text-[67px]! 2xl:text-[80px]! 3xl:text-[100px]!"
              >
                <RichLines lines={title} />
              </Heading>
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.2}
              className="mt-5 max-w-130 text-sm/[1.6] font-medium text-pretty text-basecolor2 lg:mt-[calc(30*var(--u))] 2xl:text-base! 3xl:text-xl!"
            >
              {data?.description}
            </Reveal>
            <Reveal
              variant="up"
              delay={0.3}
              className="mt-10 lg:mt-[calc(140*var(--u))]"
            >
              <p className="text-sm font-semibold text-basecolor2 2xl:text-base 3xl:text-xl">
                {data?.description_address_title}
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-3 block text-2xl font-normal [overflow-wrap:anywhere] text-basecolor hover:underline text-[18px] sm:text-[22px] lg:mt-[calc(16*var(--u))] lg:text-[26px]! 2xl:text-[32px]! 3xl:text-[40px]! mb-3.75 sm:mb-5 2xl:mb-7.5"
              >
                {email}
              </a>
              <a
                href={`tel:${phone?.replace(/\s+/g, "")}`}
                className="block text-2xl font-normal text-basecolor2 hover:underline text-[18px] sm:text-[22px] lg:text-[26px]! 2xl:text-[32px]! 3xl:text-[40px]!"
              >
                {phone}
              </a>
            </Reveal>
          </div>
          <Reveal
            variant="up"
            delay={0.15}
            className="rounded-[15px] sm:rounded-[20px] lg:rounded-[25px] 2xl:rounded-[30px] 3xl:rounded-[38px] border border-transparent p-5 shadow-[0_4px_44px_0_rgba(0,0,0,0.1)] [background-origin:border-box] [background-clip:padding-box,border-box] bg-[image:linear-gradient(#fff,#fff),linear-gradient(150deg,#DA4D47_0%,#d6d6d6_35%,#d6d6d6_65%,#2552AA_100%)] sm:p-8 lg:ml-auto lg:w-full lg:p-[50px]! 2xl:p-17.5! lg:pb-10! 3xl:p-20! 3xl:pb-12.5!"
          >
            <ContactForm topics={topics} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
