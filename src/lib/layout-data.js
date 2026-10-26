/* Shared chrome data (header + footer), rendered once in app/layout.js; shaped like the future CMS response. */
export const layout_data = {
  header: {
    logo: { alt: "Organic BPS" },
    links: [
      { id: 1, label: "Home", href: "/#home" },
      { id: 2, label: "How We Do", href: "/#how-we-do" },
      { id: 3, label: "What We Do", href: "/#what-we-do" },
      { id: 4, label: "Why We Do", href: "/#why-we-do" },
      { id: 5, label: "Who We Are", href: "/#who-we-are" },
    ],
    cta: { label: "Contact", href: "/#contact" },
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
    cta: { label: "Contact", href: "/#contact" },
    copyright: "© Copyright 2026, Organic BPS Pvt ltd, All rights reserved",
    social: [
      { id: 1, label: "Facebook", href: "#", icon: "/images/social-facebook.svg" },
      { id: 2, label: "Instagram", href: "#", icon: "/images/social-instagram.svg" },
      { id: 3, label: "WhatsApp", href: "#", icon: "/images/social-whatsapp.svg" },
    ],
    credit: { label: "Designed & Developed By:", name: "Intersmart", href: "https://intersmart.in" },
  },
};
