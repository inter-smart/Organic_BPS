import Hero from "@/components/sections/not-found/hero";
import QuickLinks from "@/components/sections/not-found/quick-links";

export const metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or may have moved.",
};

/*
 * One object, one key per section — shaped like the future CMS response.
 * Rich copy uses segments: { t: text, accent?: red }.
 */
const local_data = {
  hero: {
    image: {
      src: "/images/privacy/hero.jpg",
      alt: "A man at a desk using a tablet that shows data privacy controls",
    },
    // title: [[{ t: "Page not" }], [{ t: "found.", accent: true }]],
    title: "Page not<br><span>found.</span>",
    text: "The page you’re looking for doesn’t exist or may have moved. Start fresh with one of the routes below, or return to the homepage to continue exploring.",
    cards: [
      // {
      //   id: "browse",
      //   icon: "/images/not-found/search.svg",
      //   eyebrow: "Explore content",
      //   title: "Browse useful pages",
      //   text: "Visit the pages most people use when they need a clear next step.",
      //   cta: { label: "Browse pages", href: "#quick-links" },
      // },
      {
        id: "home",
        icon: "/images/not-found/home-circle.svg",
        eyebrow: "Back to home",
        title: "Return to the homepage",
        text: "Jump back to the main entry point and continue from there.",
        cta: { label: "Back to home", href: "/" },
      },
    ],
  },

  quickLinks: {
    label: "Quick links",
    items: [
      { id: "home", label: "Home", href: "/", icon: "/images/not-found/home.svg" },
      { id: "what-we-do", label: "What We Do", href: "/what-we-do", icon: "/images/not-found/briefcase.svg" },
      { id: "who-we-are", label: "Who We Are", href: "/who-we-are", icon: "/images/not-found/users.svg" },
    ],
  },
};

export default function NotFound() {
  return (
    <main>
      <Hero data={local_data.hero} />
      <QuickLinks data={local_data.quickLinks} />
    </main>
  );
}
