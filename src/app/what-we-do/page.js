import { Suspense, cache } from "react";
import Hero from "@/components/sections/what-we-do/hero";
import Practices from "@/components/sections/what-we-do/practices";
import MetaTags from "@/components/common/meta-tags";
import { apiGet } from "@/lib/api-calls";
import { buildMetadata, cmsMeta } from "@/lib/seo";

const getWhatWeDo = cache(() => apiGet("what-we-do"));

export async function generateMetadata() {
  const { data } = await getWhatWeDo();
  return buildMetadata(cmsMeta(data?.banner), "/what-we-do");
}

export default async function page() {
  const { data } = await getWhatWeDo();
  if (!data) return null;

  const { page_cms: cms, banner, practices } = data;

  return (
    <main>
      <MetaTags html={data.banner?.other_meta_tags} />
      {banner && <Hero banner={banner} />}
      {practices?.length > 0 && (
        <Practices data={cms} practices={practices} />
      )}
    </main>
  );
}
