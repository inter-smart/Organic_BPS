import { apiPost } from "@/lib/api-calls";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { data, error } = await apiPost("email-subscription", body);

  if (error) {
    return Response.json(error, { status: error.status || 502 });
  }
  return Response.json({ data });
}
