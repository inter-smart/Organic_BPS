export const author = {
  name: "Anjali Menon",
  role: "Strategy Director",
  bio: "Anjali is Strategy Director at Organic BPS. She works with leadership teams to turn organisational purpose into sharper choices, stronger culture and change people can feel.",
  image: { src: "/images/blog/author-anjali-menon.png", alt: "" },
  imageLarge: { src: "/images/blog/author-anjali-menon-lg.png", alt: "" },
};

/** Featured article with a full body; it is not part of the listing grid. */
const spotlight = {
  id: "purpose-makes-possible",
  category: "Purpose",
  date: "2026-09-18",
  readTime: 8,
  title: "Purpose isn’t what you say. It’s what your organisation ",
  accent: "makes possible.",
  summary:
    "The strongest purpose is visible in the choices a business makes — especially when no one is watching. Here’s how leaders can move from aspiration to everyday action.",
  image: { src: "/images/blog/featured-purpose.jpg", alt: "Three young monks holding umbrellas above a misty valley at sunrise", width: 1600, height: 931 },
  detail: {
    badge: "Organic viewpoints",
    caption: "Purpose becomes credible when people can use it to choose.",
    topics: ["Brand strategy", "Purpose", "Culture", "Leadership"],
    related: [
      "growth-question-brand-strategy",
      "build-the-brand-from-the-inside",
      "clarity-is-a-creative-act",
      "distinctive-beats-different",
      "culture-is-the-strategy",
      "making-change-feel-possible",
      "leader-as-meaning-maker",
      "can-purpose-be-measured",
      "your-employer-brand-already-exists",
    ],
    body: `
      <p class="lead">Most organisations already have a purpose. Far fewer have built the conditions for people to <em>act on it.</em></p>
      <p>The gap is rarely a lack of belief. It is a lack of translation. Purpose is often framed at the level of ambition — a statement about the contribution an organisation hopes to make — while work happens at the level of choices: what gets funded, what ships, what is measured, who gets heard and which compromise is accepted.</p>
      <p>When those choices are disconnected from purpose, the words remain polished but peripheral. Employees learn that the real strategy lives elsewhere. Customers notice the inconsistency. Leaders, meanwhile, can feel frustrated that a carefully considered idea is not creating momentum.</p>

      <h2 id="purpose-shows-up-in-the-trade-offs">Purpose shows up in the trade-offs.</h2>
      <p>Easy decisions do not test purpose. Trade-offs do. A consumer brand deciding whether to remove a profitable but wasteful product line; a bank considering who its next service excludes; a technology company choosing speed or safeguards — these are the moments when purpose becomes operational.</p>
      <p>The useful question is not “Does this support our purpose?” Almost any initiative can be made to sound supportive. Ask instead: “What would we choose differently because this is our purpose?” Difference is the evidence. If purpose cannot alter a priority, an allocation or a behaviour, it is not yet doing strategic work.</p>

      <h2 id="translate-belief-into-decision-rules">Translate belief into decision rules.</h2>
      <p>A strong purpose creates a useful boundary. It tells teams what to advance, what to refuse and what “better” means in a particular context. That requires more than a memorable sentence. It requires a small set of decision rules people can apply without waiting for permission.</p>
      <p>Start with the decisions teams make repeatedly. Product teams might need a rule for accessibility. Procurement may need one for supplier relationships. People leaders may need one for how performance is recognised. The language can vary; the underlying contribution should not.</p>

      <blockquote>
        <p>Purpose becomes real when it changes the answer — not when it decorates the question.</p>
        <footer>Anjali Menon · Strategy Director</footer>
      </blockquote>

      <h2 id="design-the-system-not-the-slogan">Design the system, not the slogan.</h2>
      <p>People take cues from the system around them. If a purpose asks for long-term value while incentives reward quarterly volume alone, the incentive wins. If leaders talk about inclusion while the same voices shape every decision, the meeting wins. Culture is not what people are told to value; it is what their environment repeatedly makes easier.</p>
      <p>Look for the practical infrastructure that carries decisions: planning templates, investment criteria, role scorecards, briefs, onboarding, governance and review rituals. A purposeful organisation makes the desired choice legible in these places. It reduces the effort required to do the right thing and raises the quality of challenge when a decision drifts.</p>

      <aside>
        <p>Three questions for leaders</p>
        <ol>
          <li>Where should our purpose change a decision this quarter?</li>
          <li>What currently makes that choice harder than it should be?</li>
          <li>What evidence would show that people experienced a different outcome?</li>
        </ol>
      </aside>
    `,
  },
};

/** Listing articles, newest first. Articles with a `detail` get their own page. */
const listed = [
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
];

export const articles = listed;
export const allArticles = [spotlight, ...listed];

export const hrefFor = (article) => (article?.detail ? `/blog/${article.id}` : "#");

export function getArticle(slug) {
  return allArticles.find((a) => a.id === slug && a.detail) ?? null;
}

export const newsletter = {
  title: "A sharper perspective, once a month.",
  text: "One considered idea on brand, culture and positive change. No noise, no weekly chase.",
  form: { label: "Your work email", placeholder: "Your work email", submit: "Subscribe", done: "Thank you. You are on the list." },
  note: "By subscribing, you agree to our privacy policy. Unsubscribe anytime.",
  privacy: { label: "privacy policy", href: "/privacy" },
};
