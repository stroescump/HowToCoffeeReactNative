import { http } from "@/src/shared/lib/httpClient";
import { MarketplaceRecommendationResponseDto } from "../dto/CoffeeRecommendationDto";

type FetchRecommendationsParams = {
  limit: number;
  offset: number;
  roastLevel?: string | null;
};

export async function fetchCoffeeRecommendations(
  params: FetchRecommendationsParams
): Promise<MarketplaceRecommendationResponseDto> {
  const { limit, offset, roastLevel } = params;
  const roastParam = roastLevel ? `&roastLevel=${roastLevel}` : "";
  return http<MarketplaceRecommendationResponseDto>(
    `/marketplace/recommended?limit=${limit}&offset=${offset}${roastParam}`,
    {
      method: "GET",
    }
  );
}
