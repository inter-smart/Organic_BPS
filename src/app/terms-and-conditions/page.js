import Cta from "@/components/sections/privacy/cta";
import Hero from "@/components/sections/privacy/hero";
import Policy from "@/components/sections/privacy/policy";
import MetaTags from "@/components/common/meta-tags";
import { cmsGet } from "@/lib/cms";
import { buildMetadata, cmsMeta } from "@/lib/seo";
import { paragraphs, slug, text, withImageText } from "@/lib/cms-text";
import { titleLines } from "@/lib/utils";

// const CACHE = false;
const getTerms = () =>
  cmsGet("policies/terms-and-conditions");

export async function generateMetadata() {
  const { data } = await getTerms();
  return buildMetadata(cmsMeta(data?.policy), "/terms-and-conditions");
}

export default async function TermsPage() {
  const { data } = await getTerms();
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
        `<h3 id="${slug(s.title)}">${s.title}</h3>${withImageText(s.description, s.title)}`,
    )
    .join("");

  return (
    <main>
      <MetaTags html={data.policy?.other_meta_tags} />
      {banner && (
        <Hero
          data={{
            image: {
              src: banner.banner,
              mobileSrc: banner.banner_mobile,
              alt: banner.banner_alt_text ?? "",
            },
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
            name: "Terms and conditions",
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
