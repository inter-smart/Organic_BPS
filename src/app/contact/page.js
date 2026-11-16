import { Suspense } from "react";
import CareersCta from "@/components/sections/contact/careers-cta";
import Enquiry from "@/components/sections/contact/enquiry";
import Hero from "@/components/sections/contact/hero";
import Locations from "@/components/sections/contact/locations";
import { link } from "@/lib/cms-text";
import { apiGet } from "@/lib/api-calls";
import { parseTitle } from "@/lib/utils";

export const metadata = {
  title: "Contact — Organic BPS",
  description:
    "Every meaningful relationship begins with a conversation. Tell us what you're working towards.",
};

const local_data = {
  hero: {
    // title: [[{ t: "Let’s start a " }], [{ t: "conversation.", accent: true }]],
    scroll: { label: "Scroll to the next section", href: "#enquiry" },
  },
  enquiry: {
    // title: [[{ t: "What’s your" }], [{ t: "next chapter?" }]],
  },
  locations: {
    // title: [[{ t: "Where to" }], [{ t: "find us", accent: true }]],
    mapLabel: "Location Map",
  },
  careers: {
    // title: [[{ t: "Want to grow" }], [{ t: "with us?" }]],
  },
};

export default async function page() {
  const { data } = await apiGet("contact");
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
      {banner && (
        <Hero
          banner={banner}
          title={parseTitle(banner.banner_title)}
          scroll={local_data.hero.scroll}
        />
      )}
      {cms?.section_one && (
        <Enquiry
          data={cms.section_one}
          title={parseTitle(cms.section_one.subtitle)}
          email={email}
          phone={phone_number}
          topics={explore_options}
        />
      )}
      {cms?.section_two && (
        <Locations
          data={cms.section_two}
          title={parseTitle(cms.section_two.title)}
          offices={office_locations}
          map={{ label: local_data.locations.mapLabel, href: link(map_link) }}
        />
      )}
      {cms?.section_three && (
        <CareersCta data={cms.section_three} title={parseTitle(cms.section_three.title)} />
      )}
    </main>
  );
}