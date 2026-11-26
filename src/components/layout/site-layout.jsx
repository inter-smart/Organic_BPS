import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { cmsGet } from "@/lib/cms";
import { text } from "@/lib/cms-text";
import { layout_data } from "@/lib/layout-data";

// const CACHE = false;

// "Let’s Connect." -> two lines, the closing full stop in the accent colour.
function footerTitle(value) {
  const title = text(value);
  if (!title) return [];
  const [first, ...rest] = title.replace(/\.$/, "").split(" ");
  const lines = [[{ t: first }]];
  if (rest.length) {
    const last = [{ t: rest.join(" ") }];
    if (title.endsWith(".")) last.push({ t: ".", accent: true });
    lines.push(last);
  }
  return lines;
}

export default async function SiteLayout({ children }) {
  const [settings, social] = await Promise.all([
    cmsGet("site-settings"),
    cmsGet("social-links"),
  ]);
  const s = settings.data;

  const header = {
    ...layout_data.header,
    cta: s?.header_button_name
      ? { label: s.header_button_name, href: s.header_button_link || "/contact" }
      : null,
  };

  const footer = {
    ...layout_data.footer,
    title: footerTitle(s?.footer_title_left),
    text: text(s?.footer_description_right),
    welcome: s?.footer_title_right,
    cta: s?.footer_button_name
      ? { label: s.footer_button_name, href: s.footer_button_link || "/contact" }
      : null,
    social: [...(social.data ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((l) => ({ id: l.id, label: l.name, href: l.url, icon: l.icon })),
  };

  return (
    <>
      <Header data={header} />
      {children}
      <Footer data={footer} />
    </>
  );
}
