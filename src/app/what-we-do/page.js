import Hero from "@/components/sections/what-we-do/hero";
import Practices from "@/components/sections/what-we-do/practices";

export const metadata = {
  title: "What We Do — Organic BPS",
  description:
    "Organic BPS brings together four specialist practices to help organisations discover what they stand for, express it with clarity and put it into action.",
};

/*
 * One object, one key per section — shaped like the future CMS response.
 * Rich copy uses segments: { t: text, accent?: red, ring?: swap the first "o" for the energy ring }.
 */
const local_data = {
  hero: {
    slides: [
      { id: 1, type: "image", src: "/images/what-we-do/hero.jpg", alt: "" },
    ],
    title: [
      [{ t: "From " }, { t: "purpose", ring: true }],
      [{ t: "to action." }],
      [{ t: "From strategy" }],
      [{ t: "to " }, { t: "execution.", accent: true }],
    ],
    paragraph:
      "Organic BPS brings together four specialist practices to help organisations discover what they stand for, express it with clarity and put it into action. Together, they form our Brand Purpose Solutions across strategy, communication, behaviour and sustainability.",
    cta: { label: "Explore our practices", href: "#practices" },
    scroll: { label: "Scroll to the next section", href: "#practices" },
  },

  practices: {
    eyebrow: "Our practices",
    title: [[{ t: "Four specialist practices" }, { t: ".", accent: true }]],
    tabs: [
      { id: 1, label: "Strategy", href: "#purpose-consulting" },
      { id: 2, label: "Communication", href: "#brand-communication" },
      { id: 3, label: "Behaviour", href: "#behaviour-design" },
      { id: 4, label: "Sustainability", href: "#sustainability-solutions" },
    ],
    items: [
      {
        id: 1,
        anchorId: "purpose-consulting",
        number: "01",
        label: "Purpose Consulting",
        heading: [
          { t: "Discover what your organisation truly " },
          { t: "stands for.", accent: true },
        ],
        logo: {
          src: "/images/what-we-do/logo-brandfarm.png",
          alt: "BRANDFARM",
          width: 348,
          height: 205,
        },
        paragraph:
          "We work with founders and leadership teams to uncover an authentic corporate purpose, then turn it into a clear direction for strategy, brand, culture and action.",
        services: [
          { icon: "search", text: "Purpose discovery and articulation" },
          { icon: "users-round", text: "Leadership and stakeholder alignment" },
          {
            icon: "file-text",
            text: "Purpose strategy and activation roadmap",
          },
        ],
      },
      {
        id: 2,
        anchorId: "brand-communication",
        number: "02",
        label: "Brand Communication",
        heading: [
          { t: "Build a brand people can " },
          { t: "believe in.", accent: true },
        ],
        logo: {
          src: "/images/what-we-do/logo-brand-bloom.png",
          alt: "Brand Bloom",
          width: 171,
          height: 109,
        },
        paragraph:
          "Brand Bloom turns strategic thinking into distinctive positioning, identity and communication. We create stories and campaigns that help brands build understanding, relevance and trust.",
        services: [
          { icon: "target", text: "Brand strategy, positioning and identity" },
          {
            icon: "megaphone",
            text: "Purpose storytelling and leadership communication",
          },
          {
            icon: "chart-no-axes-combined",
            text: "Integrated campaigns and communication programmes",
          },
        ],
      },
      {
        id: 3,
        anchorId: "behaviour-design",
        number: "03",
        label: "Behaviour Design & Activation",
        heading: [{ t: "Turn belief into " }, { t: "action.", accent: true }],
        logo: {
          src: "/images/what-we-do/logo-brandize.png",
          alt: "brandize",
          width: 188,
          height: 38,
        },
        paragraph:
          "Knowing what matters does not always change what people do. Using behavioural insight and MicroStimuli, we design cues, experiences and communication that make desired actions easier to take.",
        services: [
          {
            icon: "chart-no-axes-combined",
            text: "Behaviour and journey diagnosis",
          },
          { icon: "lightbulb", text: "MicroStimuli intervention design" },
          {
            icon: "settings",
            text: "Behaviour-led communication and activation",
          },
        ],
      },
      {
        id: 4,
        anchorId: "sustainability-solutions",
        number: "04",
        label: "Sustainability Solutions",
        heading: [
          { t: "Make sustainability part of " },
          { t: "how you grow.", accent: true },
        ],
        logo: {
          src: "/images/what-we-do/logo-greenhouse.png",
          alt: "Green House",
          width: 249,
          height: 114,
        },
        // Source PDF/Figma reuses the Purpose Consulting copy here verbatim — flagged to the client, not rewritten.
        paragraph:
          "We work with founders and leadership teams to uncover an authentic corporate purpose, then turn it into a clear direction for strategy, brand, culture and action.",
        services: [
          { icon: "search", text: "Sustainability and ESG strategy" },
          { icon: "users-round", text: "Reporting and impact communication" },
          {
            icon: "file-text",
            text: "Stakeholder engagement and sustainability campaigns",
          },
        ],
      },
    ],
  },
};

export default function page() {
  return (
    <main>
      <Hero data={local_data.hero} />
      <Practices data={local_data.practices} />
    </main>
  );
}
