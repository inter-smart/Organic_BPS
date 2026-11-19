import RouteLoader from "@/components/common/route-loader";
import { Suspense, cache } from "react";
import Cta from "@/components/sections/privacy/cta";
import Hero from "@/components/sections/privacy/hero";
import Policy from "@/components/sections/privacy/policy";
import MetaTags from "@/components/common/meta-tags";
import { apiGet } from "@/lib/api-calls";
import { buildMetadata, cmsMeta } from "@/lib/seo";
import { paragraphs, slug, text } from "@/lib/cms-text";
import { titleLines } from "@/lib/utils";

const getPrivacy = cache(() => apiGet("policies/privacy-policy"));

export async function generateMetadata() {
  const { data } = await getPrivacy();
  return buildMetadata(cmsMeta(data?.policy), "/privacy");
}

async function PrivacyContent() {
  const { data } = await getPrivacy();
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
      <MetaTags html={data.policy?.other_meta_tags} />
      {banner && (
        <Hero
          data={{
            image: { src: banner.banner, alt: banner.banner_alt_text ?? "" },
            // one line per segment, the accent word sits on its own line
            title: titleLines(banner.banner_title),
            paragraph: text(banner.banner_description),
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
            name: "Policy",
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
    <Suspense fallback={<RouteLoader />}>
      <PrivacyContent />
    </Suspense>
  );
}
