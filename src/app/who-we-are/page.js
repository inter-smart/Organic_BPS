import CoreBelief from "@/components/sections/who-we-are/core-belief";
import FounderBio from "@/components/sections/who-we-are/founder-bio";
import Hero from "@/components/sections/who-we-are/hero";
import OurPurpose from "@/components/sections/who-we-are/our-purpose";
import OurStory from "@/components/sections/who-we-are/our-story";
import Recognition from "@/components/sections/who-we-are/recognition";
import Team from "@/components/sections/who-we-are/team";
import Values from "@/components/sections/who-we-are/values";

export const metadata = {
  title: "Who We Are — Organic BPS",
  description:
    "Organic BPS began in Kochi in 1999 as an advertising agency and grew into a Brand Purpose Consultancy with more than 26 years of experience.",
};

/*
 * One object, one key per section — shaped like the future CMS response.
 * Rich copy uses segments: { t: text, accent?: red, ring?: swap the first "o" for the energy ring }.
 */
const local_data = {
  hero: {
    slides: [
      { id: 1, type: "image", src: "/images/who-we-are/hero.jpg", alt: "" },
    ],
    title: [
      [{ t: "Purpose", ring: true }],
      [{ t: "has shaped" }],
      [{ t: "our " }, { t: "journey.", accent: true }],
    ],
    paragraphs: [
      "Organic BPS is a Brand Purpose Consultancy with more than 26 years of experience in brand strategy and communication.",
      "We bring together strategic capability and creative execution to help organisations discover purpose, build belief and drive action for sustainable growth",
    ],
    stats: [
      { id: 1, value: 1999, label: "Founded" },
      { id: 2, text: "Kochi + Dubai", label: "Our locations" },
      { id: 3, value: 80, suffix: "+", label: "Awards" },
    ],
    scroll: { label: "Scroll to the next section", href: "#our-story" },
  },

  story: {
    title: [
      [{ t: "Born in brand communication." }],
      [{ t: "Evolved through purpose.", accent: true }],
    ],
    eyebrow: "Our story",
    paragraphs: [
      [
        {
          t: "Organic BPS began in Kochi in 1999 as an advertising agency. Working closely with organisations over many years taught us that enduring brands are anchored in a clear belief and a larger reason to exist.",
        },
      ],
      [
        {
          t: "This conviction led us to place purpose at the centre of our work and develop ",
        },
        { t: "BPS — Brand Purpose Solutions", accent: true },
        {
          t: ", our proprietary framework for purpose discovery and activation.",
        },
      ],
      [
        {
          t: "Today, from Kochi and Dubai, we continue to combine the depth of strategic thinking with the power of creative communication.",
        },
      ],
    ],
    timeline: [
      { id: 1, year: "1999", label: "The Beginning" },
      { id: 2, year: "2004", label: "Industry Recognition" },
      { id: 3, year: "2009", label: "Launched Greenstorm" },
      { id: 4, year: "2016", label: "Introduce BPS" },
      { id: 5, year: "2019", label: "Build headquarters" },
      { id: 6, year: "2023", label: "Expanded to Chennai" },
      { id: 7, year: "2024", label: "Partnered with UNCCD" },
    ],
  },

  purpose: {
    image: { src: "/images/who-we-are/purpose.jpg", alt: "" },
    eyebrow: "Our purpose",
    // c = final colour of each word; the scroll animation fills the words in from dark grey
    lines: [
      [
        { t: "To", c: "#ffffff" },
        { t: "create", c: "#ffffff" },
        { t: "a", c: "#ffffff" },
        { t: "beautiful", c: "#ffffff" },
        { t: "world", c: "#ffffff" },
      ],
      [
        { t: "where", c: "#ffffff" },
        { t: "Business,", c: "#ffffff" },
        { t: "People", c: "#ffffff" },
        { t: "and", c: "#ffffff" },
        { t: "the", c: "#ffffff" },
      ],
      [
        { t: "Planet", c: "#ffffff" },
        { t: "thrive", c: "#ffffff" },
        { t: "in", c: "#ffffff" },
        { t: "harmony.", c: "#ffffff" },
      ],
    ],
  },

  belief: {
    eyebrow: "Our core belief",
    title: [
      [{ t: "Growth for All." }],
      [{ t: "Growth for Good.", accent: true }],
    ],
    paragraphs: [
      "We believe businesses can grow while creating value for people and contributing positively to the planet.",
      "This belief shapes the organisations we work with, the ideas we pursue and the way we conduct ourselves.",
    ],
    diagramLabel: "Overlapping circles for Business, People and Planet",
  },

  values: {
    title: [[{ t: "What" }], [{ t: "guides us?", accent: true }]],
    text: "Our values shape how we think, create, collaborate and deliver.",
    items: [
      { id: 1, kicker: "Commitment to", title: "Righteousness" },
      { id: 2, kicker: "Commitment to", title: "Excellence" },
      { id: 3, kicker: "Commitment to", title: "Results" },
    ],
  },

  founder: {
    watermark: "Organic BPS",
    name: "Dileep Narayanan",
    role: "Founder & Managing Director",
    image: {
      src: "/images/who-we-are/founder.png",
      alt: "Dileep Narayanan, founder and managing director of Organic BPS",
    },
    paragraphs: [
      "Dileep Narayanan founded Organic BPS in 1999 and has more than 26 years of experience in brand strategy, communication and purpose consulting.",
      "His work has focused on helping organisations discover the beliefs that can guide their business, build stronger brands and create wider value.",
      "He is a PhD Scholar at the Indian Institute of Management Shillong, where his research focuses on Corporate Purpose Authenticity — the alignment between an organisation’s stated purpose and its actual practices.",
      "Dileep is also the Managing Trustee of Greenstorm Foundation, Organic BPS’s global creative conservancy for climate action.",
      "His continuing engagement with business, management education and social impact brings together research, practice and leadership.",
    ],
  },

  team: {
    title: [
      [{ t: "Strategic minds." }],
      [{ t: "Creative hands.", accent: true }],
      [{ t: "Shared commitment." }],
    ],
    images: [
      {
        id: 1,
        src: "/images/who-we-are/team-1.jpg",
        alt: "The Organic BPS team gathered for a group photo",
      },
      {
        id: 2,
        src: "/images/who-we-are/team-2.jpg",
        alt: "The core team of Organic BPS posing together in the office lobby",
      },
    ],
    paragraphs: [
      "Our core team brings together strategic thinking and creative execution.",
      "We work across disciplines, challenge assumptions and stay close to our clients as ideas move from strategy into action.",
      "What connects us is a shared commitment to meaningful work, creative excellence and results that matter.",
    ],
  },

  recognition: {
    eyebrow: "Recognition",
    title: [
      [{ t: "Recognised for" }],
      [{ t: "strategic & creative" }],
      [{ t: "excellence", accent: true }],
    ],
    count: { value: 80, suffix: "+" },
    text: [
      { t: "Over the years, the work of Organic BPS has received more than " },
      { t: "80 national and international awards", accent: true },
      { t: "." },
    ],
    items: [
      {
        id: 1,
        title: "IAA Olive Crown Awards",
        text: "Receiving the IAA Olive Crown Awards 2025.",
        image: "/images/who-we-are/award-1.jpg",
        alt: "Organic BPS team receiving the IAA Olive Crown Award on stage",
      },
      {
        id: 2,
        title: "Pepper Awards",
        text: "Three awards at Pepper Awards 2022.",
        image: "/images/who-we-are/award-2.jpg",
        alt: "Organic BPS team holding their trophies at the Pepper Awards",
      },
      {
        id: 3,
        title: "IMA Awards",
        text: "Indian Marketing Awards (South), 2023.",
        image: "/images/who-we-are/award-3.jpg",
        alt: "Organic BPS team receiving an award at the Indian Marketing Awards",
      },
    ],
  },
};

export default function page() {
  return (
    <main>
      <Hero data={local_data.hero} />
      <OurStory data={local_data.story} />
      <OurPurpose data={local_data.purpose} />
      <CoreBelief data={local_data.belief} />
      <Values data={local_data.values} />
      <FounderBio data={local_data.founder} />
      <Team data={local_data.team} />
      <Recognition data={local_data.recognition} />
    </main>
  );
}
