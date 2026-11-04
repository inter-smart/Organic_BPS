import Hero from "@/components/sections/blog/hero";
import Insights from "@/components/sections/blog/insights";
import Newsletter from "@/components/sections/blog/newsletter";
import { BlogFilterProvider } from "@/components/sections/blog/blog-filter";

export const metadata = {
  title: "Blog — Organic BPS",
  description:
    "Perspectives on brand strategy, purpose, culture, change and leadership from the team at Organic BPS.",
};

const author = {
  name: "Anjali Menon",
  role: "Strategy Director",
  image: { src: "/images/blog/author-anjali-menon.png", alt: "" },
};

/*
 * One object, one key per section — shaped like the future CMS response.
 * `featured.items` is the pool for the slider; one article per category is picked at random on load.
 */
const local_data = {
  hero: {
    image: { src: "/images/blog/hero.jpg", alt: "" },
    title: [[{ t: "Thinking for" }], [{ t: "brands with" }], [{ t: "purpose.", accent: true }]],
    scroll: { label: "Scroll to featured perspectives", href: "#featured" },
    topics: {
      label: "Explore the thinking",
      items: ["Brand strategy", "Purpose", "Culture", "Change", "Leadership"],
    },
  },

  featured: {
    eyebrow: "Put purpose to work",
    title: [[{ t: "A point of view" }], [{ t: "worth pausing for." }]],
    text: "A clearer purpose. A stronger brand. A change in behaviour. Let’s explore how we can help you move forward.",
    cta: { label: "Read more" },
    slider: { label: "Featured perspectives", prev: "Previous perspective", next: "Next perspective", goTo: "Go to perspective" },
    author,
    items: [
      {
        id: "purpose-makes-possible",
        category: "Purpose",
        date: "2026-09-18",
        readTime: 8,
        title: "Purpose isn’t what you say. It’s what your organisation ",
        accent: "makes possible.",
        summary:
          "The strongest purpose is visible in the choices a business makes — especially when no one is watching. Here’s how leaders can move from aspiration to everyday action.",
        image: { src: "/images/blog/featured-purpose.jpg", alt: "Three young monks holding umbrellas above a misty valley at sunrise", width: 1600, height: 931 },
        href: "#",
      },
      { id: "distinctive-beats-different" },
      { id: "culture-is-the-strategy" },
      { id: "making-change-feel-possible" },
      { id: "leader-as-meaning-maker" },
    ],
  },

  insights: {
    eyebrow: "Latest thinking",
    title: "Ideas for putting purpose to work.",
    count: "Showing {shown} of {total} perspectives",
    empty: "No perspectives match your search yet. Try another topic or clear the search.",
    filters: {
      label: "Filter by topic",
      all: "All",
      items: ["Brand strategy", "Purpose", "Culture", "Change", "Leadership"],
    },
    search: { label: "Search perspectives", placeholder: "Search perspectives" },
    card: { readTime: "{n} min read", link: "Read More" },
    loadMore: "View More",
    pageSize: 9,
    articles: [
      {
        id: "distinctive-beats-different",
        category: "Brand strategy",
        date: "2026-09-12",
        readTime: 6,
        title: "Distinctive beats different: building a brand people can find",
        summary:
          "Why recognisable choices compound — and how to build a system without sanding away your character.",
        image: { src: "/images/blog/distinctive-beats-different.jpg", alt: "Poster reading Nature says WOW, the biggest ever prize money, submissions open on 1 September 2023", width: 1100, height: 1100 },
        href: "#",
      },
      {
        id: "culture-is-the-strategy",
        category: "Culture",
        date: "2026-09-04",
        readTime: 7,
        title: "Culture is the strategy people experience every day",
        summary:
          "Values only matter when they shape meetings, decisions, rewards and the stories teams tell each other.",
        image: { src: "/images/blog/culture-is-the-strategy.jpg", alt: "Award winners posing with a trophy at an Organic BPS event", width: 1100, height: 425 },
        href: "#",
      },
      {
        id: "making-change-feel-possible",
        category: "Change",
        date: "2026-08-27",
        readTime: 5,
        title: "Making change feel possible, not inevitable",
        summary:
          "A practical case for involving people early, naming the trade-offs and creating momentum through proof.",
        image: { src: "/images/blog/making-change-feel-possible.jpg", alt: "Chalk-style drawing of a globe held in a hand, surrounded by eco and recycling icons on green", width: 1100, height: 880 },
        href: "#",
      },
      {
        id: "leader-as-meaning-maker",
        category: "Leadership",
        date: "2026-08-19",
        readTime: 8,
        title: "The leader as meaning-maker",
        summary:
          "In uncertainty, people do not need more slogans. They need a coherent story, repeated with honesty.",
        image: { src: "/images/blog/leader-as-meaning-maker.jpg", alt: "Performance with Purpose logo beside a colourful speech-bubble mark", width: 1100, height: 596 },
        href: "#",
      },
      {
        id: "can-purpose-be-measured",
        category: "Purpose",
        date: "2026-08-11",
        readTime: 6,
        title: "Can purpose be measured? Start with the decisions it changes",
        summary:
          "Move beyond awareness scores. The useful measures reveal where purpose changes priorities and behaviour.",
        image: { src: "/images/blog/can-purpose-be-measured.jpg", alt: "A large oak tree in a green field with overlaid text about sustainable growth", width: 1100, height: 423 },
        href: "#",
      },
      {
        id: "your-employer-brand-already-exists",
        category: "People",
        date: "2026-07-30",
        readTime: 7,
        title: "Your employer brand already exists. Listen before you write it",
        summary:
          "The truest employee proposition is discovered in the gap between the promise and the lived experience.",
        image: { src: "/images/blog/your-employer-brand-already-exists.jpg", alt: "Aerial view of a circular flower installation spelling growth for good", width: 1100, height: 625 },
        href: "#",
      },
      {
        id: "growth-question-brand-strategy",
        category: "Brand strategy",
        date: "2026-07-22",
        readTime: 5,
        title: "The growth question your brand strategy should answer",
        summary:
          "Where should we be useful next? A sharper question for finding opportunity without losing coherence.",
        image: { src: "/images/blog/growth-question-brand-strategy.jpg", alt: "A virtual conference stage with speakers on large screens", width: 1100, height: 509 },
        href: "#",
      },
      {
        id: "build-the-brand-from-the-inside",
        category: "Culture",
        date: "2026-07-14",
        readTime: 9,
        title: "Build the brand from the inside — then invite the world in",
        summary:
          "When teams understand the idea and their role in it, consistency becomes an outcome rather than a rule.",
        image: { src: "/images/blog/build-the-brand-from-the-inside.jpg", alt: "An hourglass on a pale blue background", width: 1100, height: 528 },
        href: "#",
      },
      {
        id: "clarity-is-a-creative-act",
        category: "Viewpoint",
        date: "2026-07-03",
        readTime: 4,
        title: "Clarity is a creative act",
        summary:
          "Strategy earns its place when it helps people choose. Four ways to make complexity genuinely useful.",
        image: { src: "/images/blog/clarity-is-a-creative-act.jpg", alt: "A hand watering a plant beside a rising green arrow", width: 1000, height: 680 },
        href: "#",
      },
    ],
  },

  newsletter: {
    title: "A sharper perspective, once a month.",
    text: "One considered idea on brand, culture and positive change. No noise, no weekly chase.",
    form: { label: "Your work email", placeholder: "Your work email", submit: "Subscribe", done: "Thank you. You are on the list." },
    note: "By subscribing, you agree to our privacy policy. Unsubscribe anytime.",
    privacy: { label: "privacy policy", href: "/privacy" },
  },
};

export default function BlogPage() {
  return (
    <main>
      <BlogFilterProvider>
        <Hero data={local_data.hero} />
        <Insights featured={local_data.featured} listing={local_data.insights} />
      </BlogFilterProvider>
      <Newsletter data={local_data.newsletter} />
    </main>
  );
}
