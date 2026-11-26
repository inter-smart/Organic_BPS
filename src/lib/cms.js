import { cacheLife } from "next/cache";
import { request } from "@/lib/api";

// Server reads only. api-calls.js is also bundled for the browser, so the
// cache directive has to live apart from it.
export async function cmsGet(path, params) {
  "use cache";
  const result = await request(path, { method: "GET", params });
  // a failed read is retried straight away instead of being held for a minute
  cacheLife(
    result.error
      ? { stale: 30, revalidate: 1, expire: 300 }
      : { stale: 60, revalidate: 60, expire: 86400 },
  );
  return result;
}
