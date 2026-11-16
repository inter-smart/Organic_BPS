import { request } from "@/lib/api";

export function apiGet(path, { params } = {}) {
  return request(path, { method: "GET", params });
}

export function apiPost(path, body = {}) {
  return request(path, { method: "POST", body });
}
