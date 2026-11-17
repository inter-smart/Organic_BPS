import { apiPost } from "@/lib/api-calls";
import { fieldErrors } from "@/lib/contact-schema";
import { newsletterSchema } from "@/lib/newsletter-schema";

export async function POST(request) {
  const input = await request.json().catch(() => null);

  const result = newsletterSchema.safeParse({ email: "", ...input });

  if (!result.success) {
    return Response.json(
      {
        message: "Please enter a valid email address.",
        errors: fieldErrors(result.error),
      },
      { status: 400 },
    );
  }

  const body = Object.fromEntries(
    Object.entries(result.data).filter(([, value]) => value),
  );

  const { error } = await apiPost("email-subscription", body);

  if (error) {
    return Response.json(
      { message: error.message, errors: error.errors },
      { status: error.status || 502 },
    );
  }

  return Response.json({ ok: true });
}
