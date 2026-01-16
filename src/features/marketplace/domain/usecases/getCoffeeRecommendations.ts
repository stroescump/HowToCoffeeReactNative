import { CoffeeRecommendationPage } from "../models/CoffeeRecommendation";
import { CoffeeMarketplaceRepository } from "../repositories/CoffeeMarketplaceRepository";

export async function getCoffeeRecommendations(
  repository: CoffeeMarketplaceRepository,
  limit: number,
  offset: number,
  roastLevel?: string | null
): Promise<CoffeeRecommendationPage> {
  return repository.getRecommended(limit, offset, roastLevel);
}
