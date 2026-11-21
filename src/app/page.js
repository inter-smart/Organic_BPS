import RouteLoader from "@/components/common/route-loader";
import { Suspense, cache } from "react";
import { apiGet } from "@/lib/api-calls";
import { buildMetadata, cmsMeta } from "@/lib/seo";
import { HomeComponent } from "@/components/sections/home/home-component";

const getHome = cache(() => apiGet("home"));

export async function generateMetadata() {
  const { data } = await getHome();
  return buildMetadata(cmsMeta(data?.banner), "/");
}

async function HomeContent() {
  const { data } = await getHome();
  if (!data) return null;

  return (
    <div>
      <HomeComponent data={data} />
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <HomeContent />
    </Suspense>
  );
}
