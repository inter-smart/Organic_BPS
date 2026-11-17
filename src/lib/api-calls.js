import { request } from "@/lib/api";

export function apiGet(path, { params, signal } = {}) {
  return request(path, { method: "GET", params, signal });
}

export function apiPost(path, body = {}) {
  return request(path, { method: "POST", body });
}
