import { http } from "@/src/shared/lib/httpClient";
import { MarketplaceProductDetailDto } from "../dto/CoffeeRecommendationDto";

export async function fetchMarketplaceProductDetail(
  marketplaceId: string
): Promise<MarketplaceProductDetailDto> {
  return http<MarketplaceProductDetailDto>(
    `/marketplace/products/${marketplaceId}`,
    {
      method: "GET",
    }
  );
}
