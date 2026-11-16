import { Suspense } from "react";
import Cta from "@/components/sections/privacy/cta";
import Hero from "@/components/sections/privacy/hero";
import Policy from "@/components/sections/privacy/policy";
import { apiGet } from "@/lib/api-calls";
import { paragraphs, slug, text } from "@/lib/cms-text";
import { parseTitle } from "@/lib/utils";

export const metadata = {
  title: "Privacy — Organic BPS",
  description:
    "This policy explains what personal information Organic BPS collects, why we use it, and the choices available to you.",
};

const local_data = {
  hero: {
    scroll: { label: "Scroll to the policy", href: "#policy" },
  },
  contents: {
    title: "On this page",
    label: "Policy contents",
    toggle: {
      open: "Expand policy contents",
      close: "Collapse policy contents",
    },
  },
};

async function PrivacyContent() {
  const { data } = await apiGet("policies/privacy-policy");
  const policy = data?.policy;
  if (!policy) return null;

  const { banner } = policy;
  const [lead, copy] = paragraphs(policy.content);
  const sections = [...(policy.contents ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );
  const body = sections
    .map(
      (s) =>
        `<h3 id="${slug(s.title)}">${s.title}</h3>${s.description ?? ""}`,
    )
    .join("");

  return (
    <main>
      {banner && (
        <Hero
          data={{
            image: { src: banner.banner, alt: banner.banner_alt_text ?? "" },
            // one line per segment, the accent word sits on its own line
            title: parseTitle(banner.banner_title)
              .flat()
              .map((seg) => [{ ...seg, t: seg.t.trim() }]),
            paragraph: text(banner.banner_description),
            scroll: local_data.hero.scroll,
          }}
        />
      )}
      <Policy
        data={{
          eyebrow: text(policy.section_heading),
          title: text(policy.section_subheading),
          lead,
          copy,
          contents: {
            ...local_data.contents,
            note: {
              title: text(policy.help_setion_title),
              text: text(policy.help_setion_description),
            },
          },
          content: body,
        }}
      />
      <Cta
        data={{
          title: text(policy.bottom_section_title),
          text: text(policy.bottom_section_description),
          email: text(policy.bottom_section_email),
        }}
      />
    </main>
  );
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={null}>
      <PrivacyContent />
    </Suspense>
  );
}
