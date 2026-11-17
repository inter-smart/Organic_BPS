const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Every call returns { data, error } and never throws.
export async function request(path, { method = "GET", params, body, signal }) {
  let url = `${BASE_URL}/${path}`;
  if (params) url += `?${new URLSearchParams(params)}`;

  const headers = { Accept: "application/json" };

  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload;
  if (body instanceof FormData) {
    payload = body;
  } else if (body) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, { method, headers, body: payload, signal });
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
