/* Shared chrome data (header + footer), rendered once in app/layout.js; shaped like the future CMS response. */
export const layout_data = {
  header: {
    logo: { alt: "Organic BPS" },
    links: [
      { id: 1, label: "Why Purpose", href: "/why-purpose" },
      { id: 2, label: "What we do", href: "/what-we-do" },
      { id: 3, label: "How We Work", href: "/how-we-work" },
      { id: 4, label: "Who we are", href: "/who-we-are" },
      { id: 4, label: "Blogs", href: "/blog" },
      { id: 4, label: "Contact", href: "/contact" },
    ],
  },

  footer: {
    logo: { alt: "Organic BPS" },
    legal: [
      { id: 1, label: "Privacy", href: "/privacy" },
      { id: 2, label: "Terms of use", href: "#" },
    ],
    copyright: "© Copyright 2026, Organic BPS Pvt ltd, All rights reserved",
    credit: { label: "Designed & Developed By:", name: "Intersmart", href: "https://www.intersmartsolution.com" },
  },
};
