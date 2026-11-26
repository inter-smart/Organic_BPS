import CareersCta from "@/components/sections/contact/careers-cta";
import Enquiry from "@/components/sections/contact/enquiry";
import Hero from "@/components/sections/contact/hero";
import Locations from "@/components/sections/contact/locations";
import { link } from "@/lib/cms-text";
import MetaTags from "@/components/common/meta-tags";
import { cmsGet } from "@/lib/cms";
import { buildMetadata, cmsMeta } from "@/lib/seo";

// const CACHE = false;
const getContact = () => cmsGet("contact");

export async function generateMetadata() {
  const { data } = await getContact();
  return buildMetadata(cmsMeta(data?.banner), "/contact");
}

export default async function page() {
  const { data } = await getContact();
  if (!data) return null;

  const {
    page_cms: cms,
    banner,
    office_locations,
    explore_options,
    email,
    phone_number,
    map_link,
  } = data;

  return (
    <main>
      <MetaTags html={data.banner?.other_meta_tags} />
      {banner && (
        <Hero
          banner={banner}
          title={banner.banner_title}
        />
      )}
      {cms?.section_one && (
        <Enquiry
          data={cms.section_one}
          title={cms.section_one.subtitle}
          email={email}
          phone={phone_number}
          topics={explore_options}
        />
      )}
      {cms?.section_two && (
        <Locations
          data={cms.section_two}
          title={cms.section_two.title}
          offices={office_locations}
          mapHref={link(map_link)}
        />
      )}
      {cms?.section_three && (
        <CareersCta data={cms.section_three} title={cms.section_three.title} />
      )}
    </main>
  );
}