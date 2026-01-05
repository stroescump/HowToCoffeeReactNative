import { CoffeeRecommendationPage } from "../models/CoffeeRecommendation";
import { CoffeeMarketplaceRepository } from "../repositories/CoffeeMarketplaceRepository";

export async function getCoffeeRecommendations(
  repository: CoffeeMarketplaceRepository
): Promise<CoffeeRecommendationPage> {
  return repository.getRecommended();
}
