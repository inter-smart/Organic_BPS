import { request } from "@/lib/api";

// cache: true revalidates every 5 minutes, false always hits the API.
export function apiGet(path, { params, signal, cache = false } = {}) {
  return request(path, { method: "GET", params, signal, cache });
}

export function apiPost(path, body = {}) {
  return request(path, { method: "POST", body });
}
