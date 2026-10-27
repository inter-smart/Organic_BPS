import Hero from "@/components/sections/home/hero";
import Founder from "@/components/sections/home/founder";
import WhatWeDo from "@/components/sections/home/what-we-do";
import Clients from "@/components/sections/home/client-logos";
import Greenstorm from "@/components/sections/home/greenstorm";
import GlobeImpact from "@/components/sections/home/globe-impact";
import TeamGallery from "@/components/sections/home/team-gallery";
import PurposeInsights from "@/components/sections/home/purpose-insights";
import PurposeActivation from "@/components/sections/home/purpose-activation";

const local_data = {
  hero: {
    // Any mix of videos and images. Videos advance on end, images after `duration` ms.
    // e.g. { id: 2, type: "video", src: "/videos/hero-2.mp4", poster: "/images/hero-2.jpg" }
    slides: [
      { id: 1, type: "video", src: "/videos/MainVideo.mp4", alt: "" },
      // { id: 2, type: "image", src: "/images/hero-1.png", alt: "" }
    ],
    title: [
      [{ t: "Purpose", ring: true }, { t: " is the" }],
      [
        { t: "journey", accent: true },
        { t: " that powers every other " },
        { t: "journey.", accent: true },
      ],
    ],
    cta: { label: "Activate your purpose", href: "#how-we-do" },
    scroll: { label: "Scroll to the next section", href: "#what-we-do" },
  },

  whatWeDo: {
    // Set `video` (e.g. "/videos/hi.mp4") and the "Hi" mask will clip it; until then the poster is shown.
    media: {
      video: "/videos/whatwedo.mp4",
      poster: "/images/hi-photo-1.png",
      alt: "Colleagues collaborating in a modern office",
    },
    title: [
      [{ t: "We do", accent: true }],
      [{ t: "purpose", ring: true }, { t: " on" }],
      [{ t: "purpose" }, { t: ".", accent: true }],
    ],
    paragraphs: [
      [
        { t: "We are a Brand Purpose Consultancy with more than " },
        { t: "26 years of experience", accent: true },
        { t: " in brand strategy and communication." },
      ],
      [
        {
          t: "We work with founders and leadership teams to discover and activate purpose across strategy, brand, culture and action.",
        },
      ],
      [
        {
          t: "We bring together the depth of strategy consultancy and the creative capability of a brand communication agency.",
        },
      ],
    ],
    cta: { label: "Discover our purpose", href: "#how-we-do" },
  },

  globe: {
    title: [
      [{ t: "Good for business." }],
      [{ t: "better for the world.", accent: true }],
    ],
    text: "Purpose is not a nice-to-have. When embedded in the business, it strengthens clarity, alignment, trust, differentiation, and long-term performance.",
    cta: { label: "Discover why purpose matters", href: "#how-we-do" },
    pins: [
      {
        id: 1,
        title: "Patagonia",
        subtitle: "Purpose-led growth",
        lat: 44.9778,
        lng: -93.265,
        icon: "mountain",
      },
      {
        id: 2,
        title: "Organic BPS",
        subtitle: "Client impact stories",
        lat: 9.082,
        lng: 8.6753,
        icon: "target",
      },
      {
        id: 3,
        title: "Natura",
        subtitle: "ESG leadership",
        lat: -14.235,
        lng: -51.9253,
        icon: "leaf",
      },
    ],
    stats: [
      {
        id: 1,
        value: 76,
        suffix: "%",
        label: "higher consumer trust",
        icon: { src: "/images/stat-trust.svg", w: 59, h: 65 },
      },
      {
        id: 2,
        value: 72,
        suffix: "%",
        label: "stronger customer loyalty",
        icon: { src: "/images/stat-loyalty.svg", w: 50, h: 46 },
      },
      {
        id: 3,
        value: 93,
        suffix: "%",
        label: "of executives prioritise societal value",
        icon: { src: "/images/stat-value.svg", w: 43, h: 38 },
      },
    ],
  },

  purposeActivation: {
    // c = final colour of each word; the scroll animation fills the words in from pale grey
    lines: [
      [
        { t: "We discover", c: "#da4d47" },
        { t: "purpose", c: "#222222", ring: true },
        { t: ".", c: "#da4d47", attach: true },
      ],
      [
        { t: "We", c: "#333333" },
        { t: "build", c: "#555555" },
        { t: "belief", c: "#777777" },
        { t: "around", c: "#999999" },
        { t: "it", c: "#a8a8a8" },
        { t: ".", c: "#da4d47", attach: true },
      ],
      [
        { t: "We", c: "#b8b8b8" },
        { t: "drive", c: "#b8b8b8" },
        { t: "action", c: "#b8b8b8" },
        { t: ".", c: "#da4d47", attach: true },
      ],
    ],
    links: [
      { id: 1, label: "Purpose strategy", href: "#contact" },
      { id: 2, label: "Brand communication", href: "#contact" },
      { id: 3, label: "Purpose activation", href: "#contact" },
    ],
  },

  clients: {
    title: [
      [{ t: "Good intentions deserve" }],
      [{ t: "great experience.", accent: true }],
      [{ t: "That’s where we come in" }, { t: ".", accent: true }],
    ],
    text: "For more than two decades, we have partnered with organisations across sectors at defining moments of growth and change by helping them clarify what they stand for, communicate it meaningfully and put it into action.",
    items: [
      {
        id: 1,
        name: "Kerala Management Association",
        logo: "/images/logo-kma.png",
      },
      {
        id: 2,
        name: "SCMS Group of Educational Institutions",
        logo: "/images/logo-scms.png",
      },
      { id: 3, name: "Agappe", logo: "/images/logo-agappe.png" },
      { id: 4, name: "ASSET", logo: "/images/logo-asset.png" },
      { id: 5, name: "Aster MIMS Hospital", logo: "/images/logo-aster.png" },
    ],
  },

  greenstorm: {
    title: [
      [
        { t: "When " },
        { t: "purpose", ring: true, accent: true },
        { t: " crosses borders" },
        { t: ".", accent: true },
      ],
    ],
    paragraphs: [
      "17 years ago, Greenstorm began in one city. Today, it belongs to 177 countries.",
      "Greenstorm is our global creative conservancy for climate action, exemplifying what purpose can achieve when creativity turns belief into participation.",
      "Over 17 years, Greenstorm has engaged more than 12 million young minds.",
    ],
    photos: [
      {
        id: 1,
        src: "/images/greenstorm-1.png",
        alt: "Monks with umbrellas on a hillside at sunset",
      },
      {
        id: 3,
        src: "/images/greenstorm-3.png",
        alt: "Storm clouds over a lake with a fisherman",
      },
      {
        id: 2,
        src: "/images/greenstorm-2.png",
        alt: "Greenstorm delegates at the COP17 conference",
      },
      {
        id: 4,
        src: "/images/greenstorm-4.png",
        alt: "Aerial view of pink flowers over dark water",
      },
    ],
    partners: {
      alt: "United Nations Convention to Combat Desertification and G20 Global Land Initiative",
      markAlt: "Greenstorm Global Photography Festival",
    },
    stats: [
      { id: 1, value: 50, suffix: "K+", label: "Photographers" },
      { id: 2, value: 12, suffix: "M", label: "Young Minds" },
      { id: 3, value: 177, suffix: "", label: "Countries" },
      { id: 4, value: 17, suffix: "", label: "Impactful Years" },
    ],
    cta: { label: "Discover Greenstorm", href: "#contact" },
  },

  founder: {
    title: [
      [{ t: "Hi, I'm " }],
      [{ t: "Dileep Narayanan" }, { t: ".", accent: true }],
    ],
    role: "Founder",
    paragraphs: [
      "In 1999, long before organic became a fashionable word, I chose it as our name for growth that is natural, rooted and life-giving. That belief still guides us in creating a beautiful world where business, people and planet thrive in harmony.",
      "We live it through Righteousness, Excellence and Results, and relationships built over decades. Because how we grow matters as much as how much we grow.",
    ],
    tagline: [
      [{ t: "Growth for all." }],
      [{ t: "Growth for good.", accent: true }],
    ],
    cta: { label: "Connect with the founder", href: "#contact" },
    photoAlt: "Dileep Narayanan, founder of Organic BPS",
  },

  people: {
    title: [
      [{ t: "Good work", className: "text-black" }],
      [{ t: "finds good people." }],
    ],
    subtitle: "Thankfully, they keep finding us.",
    cta: { label: "View all", href: "#contact" },
    images: [
      {
        id: 1,
        src: "/images/team-1.png",
        alt: "Notebook, sticky notes and coffee from a brainstorming session",
      },
      {
        id: 2,
        src: "/images/team-2.png",
        alt: "Team discussion around a meeting table",
      },
      {
        id: 3,
        src: "/images/team-3.png",
        alt: "Team toasting a celebration with a cake",
      },
      {
        id: 4,
        src: "/images/team-4.png",
        alt: "Colleagues sharing a meal together",
      },
      {
        id: 5,
        src: "/images/team-5.png",
        alt: "Colleagues collaborating in an open office",
      },
      {
        id: 6,
        src: "/images/team-6.png",
        alt: "Volunteers planting a community garden",
      },
    ],
  },

  insights: {
    title: [
      [{ t: "The pursuit of" }],
      [
        { t: "purpose", ring: true, accent: true },
        { t: ".", accent: true },
      ],
    ],
    text: "Ideas, insights and perspectives on purpose, growth and the changing role of business in creating lasting impact.",
    cta: { label: "Explore our thinking", href: "#contact" },
    items: [
      {
        id: 1,
        title: "Why purpose needs to move beyond the mission statement",
        text: "Purpose becomes powerful when it moves from words on a wall into the decisions a business makes every day.",
        image: "/images/insight-1.png",
        alt: "Designer working at a desk with two monitors",
      },
      {
        id: 2,
        title: "Can purpose become a competitive advantage?",
        text: "The strongest brands are discovering that meaningful impact isn't separate from business growth — it can become the foundation for it.",
        image: "/images/insight-2.png",
        alt: "Smiling colleagues at a table with a dartboard",
      },
      {
        id: 3,
        title: "Building organisations people believe in",
        text: "When people understand what an organisation stands for, they don't just work for it. They become part of its journey.",
        image: "/images/insight-3.png",
        alt: "Team members high-fiving in a meeting",
      },
      {
        id: 4,
        title: "Building organisations people believe in",
        text: "When people understand what an organisation stands for, they don't just work for it. They become part of its journey.",
        image: "/images/insight-4.png",
        alt: "Colleagues gathered together in an office",
      },
    ],
  },
};

export default function page() {
  return (
    <main>
      <Hero data={local_data.hero} />
      <WhatWeDo data={local_data.whatWeDo} />
      <GlobeImpact data={local_data.globe} />
      <PurposeActivation data={local_data.purposeActivation} />
      <Clients data={local_data.clients} />
      <Greenstorm data={local_data.greenstorm} />
      <Founder data={local_data.founder} />
      <TeamGallery data={local_data.people} />
      <PurposeInsights data={local_data.insights} />
    </main>
  );
}
