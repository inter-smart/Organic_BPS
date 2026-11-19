import Approach from "@/components/sections/how-we-work/approach";
import Clients from "@/components/sections/how-we-work/clients";
import Cta from "@/components/sections/how-we-work/cta";
import Hero from "@/components/sections/how-we-work/hero";
import Methodology from "@/components/sections/how-we-work/methodology";
import Methods from "@/components/sections/how-we-work/methods";
import MicroStimuli from "@/components/sections/how-we-work/micro-stimuli";
import Testimonials from "@/components/sections/how-we-work/testimonials";
import { apiGet } from "@/lib/api-calls";
import { buildMetadata, cmsMeta } from "@/lib/seo";
import { cache } from "react";


const getHowWeWorks = cache(() => apiGet("how-its-works"));

export async function generateMetadata() {
  const { data } = await getHowWeWorks();
  return buildMetadata(cmsMeta(data?.banner), "/how-its-works");
}


const local_data = {
  hero: {
    scroll: { label: "Scroll to our approach", href: "#our-approach" },
  },
  methodology: {
    mechanism: {
      label:
        "The BPS framework as a mechanism: purpose at the core, wrapped by belief and behaviour, drives the wheel of sustainable growth.",
      scrollLabel: "Framework diagram, scrollable",
    },
    steps: { label: "The four framework principles" },
  },
  methods: {
    map: {
      label: "Brand Farm explores four dimensions of an organisation",
    },
  },
};

export default async function HowWeWorkPage() {
  const { data, error } = await apiGet("how-its-works");
  const {
    page_cms,
    banner,
    methodologies,
    testimonials,
    brand_pillers,
    partners,
  } = data;

  const { section_one, section_two, section_three, section_four, section_five, section_six, section_seven } = page_cms;

  return (
    <main>
      <Hero data={local_data.hero} banner={banner} />
      <Approach section_one={section_one} />
      <div className="container mx-auto px-4 xl:px-0 mb-10 2xl:mb-25">
        <div className="rounded-[20px] sm:rounded-[40px] 2xl:rounded-[60px] bg-[#F6F6F6] overflow-hidden">
          <Methodology
            section_two={section_two}
            data={local_data.methodology}
            methodologies={methodologies}
          />
          <Methods
            section_three={section_three}
            brand_pillers={brand_pillers}
            data={local_data.methods}
          />
          <MicroStimuli data={section_four} />
        </div>
      </div>
      <Testimonials section_five={section_five} testimonials={testimonials} data={local_data.testimonials} />
      <Clients section_six={section_six} partners={partners} />
      <Cta section_seven={section_seven}/>
    </main>
  );
}
