// config.ts
let apiBaseUrl = "http://localhost:8080";

export const API_BASE_URL_DEFAULTS = [
  "http://localhost:8080",
  "https://ichthyosaurian-curvedly-reese.ngrok-free.dev",
] as const;

export function getApiBaseUrl() {
  return apiBaseUrl;
}

export function setApiBaseUrl(next: string) {
  apiBaseUrl = next;
}
