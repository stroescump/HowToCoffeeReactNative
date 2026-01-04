import { http } from "@/src/shared/lib/httpClient";
import { NearbyCoffeeShopsPageDto } from "../dto/NearbyCoffeeShopsPageDto";

export type NearbyCoffeeShopsRequest = {
  lat: number;
  lng: number;
  radiusMeters: number;
  limit: number;
  offset?: number;
};

export async function fetchNearbyCoffeeShops(
  request: NearbyCoffeeShopsRequest
): Promise<NearbyCoffeeShopsPageDto> {
  const query = buildQuery(request);
  return http<NearbyCoffeeShopsPageDto>(`/coffee-shops/nearby?${query}`, {
    method: "GET",
  });
}

function buildQuery(request: NearbyCoffeeShopsRequest): string {
  const params = [
    `lat=${encodeURIComponent(String(request.lat))}`,
    `lng=${encodeURIComponent(String(request.lng))}`,
    `radiusMeters=${encodeURIComponent(String(request.radiusMeters))}`,
    `limit=${encodeURIComponent(String(request.limit))}`,
  ];

  if (request.offset != null) {
    params.push(`offset=${encodeURIComponent(String(request.offset))}`);
  }

  return params.join("&");
}
