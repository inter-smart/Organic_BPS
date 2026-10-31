/* Shared chrome data (header + footer), rendered once in app/layout.js; shaped like the future CMS response. */
export const layout_data = {
  header: {
    logo: { alt: "Organic BPS" },
    links: [
      { id: 1, label: "Why Purpose", href: "/#why-purpose" },
      { id: 2, label: "What we do", href: "/what-we-do" },
      { id: 3, label: "How We Work", href: "/#how-we-work" },
      { id: 4, label: "Who we are", href: "/who-we-are" },
    ],
    cta: { label: "Let’s Connect", href: "/contact" },
  },

  footer: {
    logo: { alt: "Organic BPS" },
    title: [[{ t: "Let’s" }], [{ t: "Connect" }, { t: ".", accent: true }]],
    legal: [
      { id: 1, label: "Privacy", href: "#" },
      { id: 2, label: "Terms of use", href: "#" },
    ],
    text: "To founders building businesses, brands looking for change, and people ready to create it.",
    welcome: "Welcome.",
    cta: { label: "Contact", href: "/contact" },
    copyright: "© Copyright 2026, Organic BPS Pvt ltd, All rights reserved",
    social: [
      { id: 1, label: "Facebook", href: "#", icon: "/images/social-facebook.svg" },
      { id: 2, label: "Instagram", href: "#", icon: "/images/social-instagram.svg" },
      { id: 3, label: "WhatsApp", href: "#", icon: "/images/social-whatsapp.svg" },
    ],
    credit: { label: "Designed & Developed By:", name: "Intersmart", href: "https://intersmart.in" },
  },
};
