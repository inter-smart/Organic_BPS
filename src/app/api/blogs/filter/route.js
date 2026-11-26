import { apiGet } from "@/lib/api-calls";

export async function GET(request) {
  const { data, error } = await apiGet("blogs/filter", {
    params: request.nextUrl.searchParams,
  });

  if (error) {
    return Response.json(error, { status: error.status || 502 });
  }

  // the other paginator fields are links that carry the backend address
  const { data: blogs, current_page, last_page, total } = data;
  return Response.json({
    data: { data: blogs, current_page, last_page, total },
  });
}
