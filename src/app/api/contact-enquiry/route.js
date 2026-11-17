import { apiPost } from "@/lib/api-calls";
import { contactSchema, fieldErrors } from "@/lib/contact-schema";

export async function POST(request) {
  const input = await request.json().catch(() => null);

  const result = contactSchema.safeParse({
    name: "",
    email: "",
    organization: "",
    phone_number: "",
    explore_together: "",
    message: "",
    ...input,
  });

  if (!result.success) {
    return Response.json(
      {
        message: "Please check the highlighted fields.",
        errors: fieldErrors(result.error),
      },
      { status: 400 },
    );
  }

  const body = Object.fromEntries(
    Object.entries(result.data).filter(([, value]) => value),
  );

  const { error } = await apiPost("contact-enquiry", body);

  if (error) {
    return Response.json(
      { message: error.message, errors: error.errors },
      { status: error.status || 502 },
    );
  }

  return Response.json({ ok: true });
}
