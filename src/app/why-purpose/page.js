import Authentic from "@/components/sections/why-purpose/authentic";
import Cta from "@/components/sections/why-purpose/cta";
import Definition from "@/components/sections/why-purpose/definition";
import Growth from "@/components/sections/why-purpose/growth";
import Hero from "@/components/sections/why-purpose/hero";
import Importance from "@/components/sections/why-purpose/importance";
import Moments from "@/components/sections/why-purpose/moments";
import Perspectives from "@/components/sections/why-purpose/perspectives";
import { allArticles } from "@/lib/blog-data";

export const metadata = {
  title: "Why Purpose — Organic BPS",
  description:
    "Purpose clarifies why your organisation exists, the value it seeks to create and the choices that will take it forward.",
};

// the design shows three cards; these extend the slider from the blog list
const moreArticles = [
  "can-purpose-be-measured",
  "leader-as-meaning-maker",
  "growth-question-brand-strategy",
]
  .map((id) => allArticles.find((article) => article.id === id))
  .filter(Boolean)
  .map(({ id, image, title, summary }) => ({
    id,
    image,
    title,
    summary,
    cta: { label: "Read the article", href: "/blog" },
  }));

/*
 * One object, one key per section — shaped like the future CMS response.
 * Rich copy uses segments: { t: text, accent?: red, ring?: swap the first "o" for the ring }.
 */
const local_data = {
  hero: {
    image: { src: "/images/why-purpose/hero.jpg", alt: "" },
    title: [
      [{ t: "Purpose", ring: true }, { t: " gives" }],
      [{ t: "growth direction." }],
    ],
    paragraph:
      "Purpose clarifies why your organisation exists, the value it seeks to create and the choices that will take it forward.",
    cta: { label: "Let’s talk", href: "/contact" },
    scroll: {
      label: "Scroll to what is corporate purpose",
      href: "#what-is-purpose",
    },
  },

  definition: {
    title: [
      [{ t: "What is" }],
      [{ t: "corporate" }],
      [{ t: "purpose?", accent: true }],
    ],
    paragraphs: [
      "Corporate purpose is an organisation’s enduring reason for being and the value it seeks to create through its business.",
      "Vision describes where you want to go. Mission defines what you do. Values guide how you operate. Purpose explains why it matters.",
      "A clear purpose connects commercial ambition with the needs of customers, employees and other stakeholders. It gives strategy a longer horizon and everyday decisions a point of reference.",
    ],
    distinctionsLabel: "Vision, mission, values and purpose",
    distinctions: [
      {
        id: "vision",
        icon: "/images/why-purpose/eye.svg",
        title: "Vision",
        text: "Where you want to go",
      },
      {
        id: "mission",
        icon: "/images/why-purpose/target.svg",
        title: "Mission",
        text: "What you do",
      },
      {
        id: "values",
        icon: "/images/why-purpose/users-round-2.svg",
        title: "Values",
        text: "How you operate",
      },
      {
        id: "purpose",
        icon: "/images/why-purpose/heart.svg",
        title: "Purpose",
        text: "Why it matters",
        active: true,
      },
    ],
  },

  importance: {
    title: [[{ t: "Why does" }], [{ t: "purpose matter?", accent: true }]],
    question: {
      intro: "Growth brings choices.",
      items: [
        "Which opportunities should you pursue?",
        "What should you protect as the organisation changes?",
        "Where should you focus your resources?",
      ],
    },
    copy: "Purpose helps leaders answer these questions. It gives teams a shared direction, helps a brand remain relevant and gives stakeholders a clearer basis for judging whether the organisation lives up to its commitments.",
    diagram: {
      label: "What a shared direction does",
      core: {
        title: "Shared direction",
        icon: "/images/why-purpose/compass.svg",
      },
      benefits: [
        {
          id: "decisions",
          place: "tl",
          icon: "/images/why-purpose/benefit-decisions.svg",
          text: "Helps leaders\nmake better\ndecisions",
        },
        {
          id: "people",
          place: "tr",
          icon: "/images/why-purpose/benefit-people.svg",
          text: "Aligns &\nmotivates\npeople",
        },
        {
          id: "relevant",
          place: "bl",
          icon: "/images/why-purpose/benefit-relevant.svg",
          text: "Keeps the\nbrand relevant\nover time",
        },
        {
          id: "trust",
          place: "br",
          icon: "/images/why-purpose/benefit-trust.svg",
          text: "Builds\ntrust with\nstakeholders",
        },
      ],
    },
  },

  growth: {
    title: [
      { t: "How can purpose " },
      { t: "help you grow?", className: "text-basecolor17" },
    ],
    copy: "A purpose statement does not create performance on its own. Its value comes from the decisions and actions it shapes. Put into practice, purpose can help an organisation:",
    items: [
      {
        id: "opportunities",
        icon: "/images/why-purpose/chart.svg",
        text: "Pursue Opportunities That Fit Its Strengths and Ambitions",
      },
      {
        id: "brand",
        icon: "/images/why-purpose/star.svg",
        text: "Build a More Relevant and Distinctive Brand",
      },
      {
        id: "employees",
        icon: "/images/why-purpose/users-round-2.svg",
        text: "Give Employees a Stronger Reason to Contribute",
      },
      {
        id: "trust",
        icon: "/images/why-purpose/shield-check.svg",
        text: "Earn Trust Through Consistent Behaviour",
      },
      {
        id: "value",
        icon: "/images/why-purpose/leaf.svg",
        text: "Create Commercial Value While Contributing to Wider Progress",
      },
    ],
  },

  moments: {
    image: { src: "/images/why-purpose/valuable.jpg", alt: "" },
    title: [
      [{ t: "When does" }],
      [{ t: "purpose" }],
      [{ t: "become" }],
      [{ t: "especially", className: "text-basecolor17" }],
      [{ t: "valuable?", className: "text-basecolor17" }],
    ],
    intro: "Purpose can provide clarity at defining moments:",
    items: [
      {
        id: "growth",
        n: "01",
        text: "when an organisation enters a new phase of growth",
      },
      {
        id: "brand",
        n: "02",
        text: "when its brand needs renewed relevance or differentiation",
      },
      {
        id: "leadership",
        n: "03",
        text: "when leadership changes or businesses and teams come together",
      },
      {
        id: "belief",
        n: "04",
        text: "when employee belief or stakeholder trust is weakening",
      },
      {
        id: "questions",
        n: "05",
        text: "when people are asking harder questions about its role and impact",
      },
    ],
  },

  authentic: {
    image: {
      src: "/images/why-purpose/authentic.jpg",
      alt: "Aerial view of a small blue boat on bright green water",
      width: 1100,
      height: 734,
    },
    title: [
      [{ t: "Purpose" }],
      [{ t: "must be" }],
      [{ t: "authentic.", className: "text-basecolor17" }],
    ],
    paragraphs: [
      "People look beyond what an organisation says. They judge its purpose through leadership decisions, everyday behaviour and the way it responds when commitments are tested.",
      "When words and actions align, purpose earns credibility. When they diverge, even a compelling statement can lose meaning.",
    ],
    equationLabel: "Words plus actions lead to authenticity",
    equation: {
      words: { icon: "/images/why-purpose/message-circle.svg", label: "Words" },
      actions: { icon: "/images/why-purpose/settings.svg", label: "Actions" },
      result: { icon: "/images/why-purpose/gem.svg", label: "Authenticity" },
    },
  },

  perspectives: {
    eyebrow: "The pursuit of purpose",
    title: [
      { t: "Ideas & perspectives for leaders putting " },
      { t: "purpose into practice.", accent: true },
    ],
    slider: {
      label: "Purpose perspectives",
      prev: "Previous articles",
      next: "Next articles",
      goTo: "Go to articles",
    },
    items: [
      {
        id: "performance",
        image: {
          src: "/images/why-purpose/article-3.jpg",
          alt: "Four speakers seated on a stage in front of an audience",
          width: 750,
          height: 500,
        },
        title: "Brand Purpose and Corporate Performance",
        summary:
          "How purpose, sustainability and stakeholder value can contribute to long-term business performance.",
        cta: { label: "Read the article", href: "/blog" },
      },
      {
        id: "authentic",
        image: {
          src: "/images/why-purpose/article-2.jpg",
          alt: "Colleagues shaking hands across a meeting table",
          width: 750,
          height: 500,
        },
        title: "What Makes Corporate Purpose Authentic?",
        summary:
          "Why the alignment between stated purpose and organisational practice matters for credibility and trust.",
        cta: { label: "Explore the research", href: "/blog" },
      },
      {
        id: "playbook",
        image: {
          src: "/images/why-purpose/article-1.jpg",
          alt: "A humanoid robot working at a production line",
          width: 750,
          height: 500,
        },
        title: "Brand Purpose: The Playbook for 21st-Century CEOs",
        summary:
          "A guide to answering a fundamental leadership question: why should this business exist?",
        cta: { label: "Read the article", href: "/blog" },
      },
      ...moreArticles,
    ],
  },

  cta: {
    image: { src: "/images/why-purpose/cta.jpg", alt: "" },
    title: [[{ t: "Ready to put" }], [{ t: "purpose to work?" }]],
    text: "We help organisations turn purpose into clear choices and meaningful action.",
    cta: { label: "Let’s talk", href: "/contact" },
  },
};

export default function WhyPurposePage() {
  return (
    <main>
      <Hero data={local_data.hero} />
      <Definition data={local_data.definition} />
      <Importance data={local_data.importance} />
      <Growth data={local_data.growth} />
      <Moments data={local_data.moments} />
      <Authentic data={local_data.authentic} />
      <Perspectives data={local_data.perspectives} />
      <Cta data={local_data.cta} />
    </main>
  );
}
