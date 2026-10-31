import CareersCta from "@/components/sections/contact/careers-cta";
import Enquiry from "@/components/sections/contact/enquiry";
import Hero from "@/components/sections/contact/hero";
import Locations from "@/components/sections/contact/locations";

export const metadata = {
  title: "Contact — Organic BPS",
  description: "Every meaningful relationship begins with a conversation. Tell us what you're working towards.",
};

/*
 * One object, one key per section — shaped like the future CMS response.
 * Rich copy uses segments: { t: text, accent?: red, ring?: swap the first "o" for the energy ring }.
 */
const local_data = {
  hero: {
    slides: [{ id: 1, type: "image", src: "/images/contact/hero.jpg", alt: "" }],
    title: [[{ t: "Let’s start a " }], [{ t: "conversation.", accent: true }]],
    paragraph: "Every meaningful relationship begins with a conversation. Tell us what you’re working towards.",
    avatars: [
      { id: 1, src: "/images/contact/team-1.png", alt: "" },
      { id: 2, src: "/images/contact/team-2.png", alt: "" },
      { id: 3, src: "/images/contact/team-3.png", alt: "" },
    ],
    avatarsCaption: "Real people, helpful answers",
    scroll: { label: "Scroll to the next section", href: "#enquiry" },
  },

  enquiry: {
    eyebrow: "Put purpose to work",
    title: [[{ t: "What’s your" }], [{ t: "next chapter?" }]],
    paragraph: "A clearer purpose. A stronger brand. A change in behaviour. Let’s explore how we can help you move forward.",
    business: { label: "Business enquiries", email: "admin@organicbps.com", phone: "+91 99611 42800" },
  },

  locations: {
    title: [[{ t: "Where to" }], [{ t: "find us", accent: true }]],
    text: "Let’s connect with the team closest to you.",
    eyebrow: "Office locations",
    map: { label: "Location Map", href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Organic BPS, Kochi") },
    offices: [
      {
        id: 1,
        country: "India",
        city: "Kochi",
        address: "GTWRA 31, Parthasarathy Temple Road, Changampuzha Park, Kochi – 682024, Kerala, India",
        email: "kochi@organicbps.com",
        phone: "+91 484 2345323",
      },
      {
        id: 2,
        country: "UAE",
        city: "Dubai",
        address: "6th Floor, Business Center, Meydan Road, Nad Al Sheba, Dubai, United Arab Emirates",
        email: "Dubai@organicbps.com",
        // Source Figma repeats the Kochi phone number here verbatim — flagged to the client, not invented.
        phone: "+91 484 2345323",
      },
    ],
  },

  careers: {
    title: [[{ t: "Want to grow" }], [{ t: "with us?" }]],
    text: "Get in touch about career opportunities.",
    email: "jobs@organicbps.com",
  },
};

export default function page() {
  return (
    <main>
      <Hero data={local_data.hero} />
      <Enquiry data={local_data.enquiry} />
      <Locations data={local_data.locations} />
      <CareersCta data={local_data.careers} />
    </main>
  );
}
