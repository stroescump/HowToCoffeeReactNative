import { http } from "@/src/shared/lib/httpClient";
import { CoffeeRecommendationResponseDto } from "../dto/CoffeeRecommendationDto";

export async function fetchCoffeeRecommendations(): Promise<CoffeeRecommendationResponseDto> {
  return http<CoffeeRecommendationResponseDto>("/coffee/recommended", {
    method: "GET",
  });
}
