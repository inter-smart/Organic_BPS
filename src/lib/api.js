const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Every call returns { data, error } and never throws.
export async function request(path, { method = "GET", params, body }) {
  let url = `${BASE_URL}/${path}`;
  if (params) url += `?${new URLSearchParams(params)}`;

  const headers = { Accept: "application/json" };

  // The token is server-only, so it is only added when running on the server.
  if (typeof window === "undefined") {
    headers.Authorization = `Bearer ${process.env.API_SECRET_TOKEN}`;
  }

  let payload;
  if (body instanceof FormData) {
    payload = body;
  } else if (body) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, { method, headers, body: payload });
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        data: null,
        error: {
          status: res.status,
          message: json?.message || "Something went wrong",
          errors: json?.errors || null,
        },
      };
    }

    return { data: json.data, error: null };
  } catch {
    return {
      data: null,
      error: { status: 0, message: "Network error", errors: null },
    };
  }
}
