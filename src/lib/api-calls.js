import { request } from "@/lib/api";

// For the browser and route handlers. Server components use cmsGet from lib/cms.
export function apiGet(path, { params, signal } = {}) {
  return request(path, { method: "GET", params, signal });
}

export function apiPost(path, body = {}) {
  return request(path, { method: "POST", body });
}
