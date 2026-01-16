import { CoffeeRecommendationPage } from "../models/CoffeeRecommendation";

export interface CoffeeMarketplaceRepository {
  getRecommended(
    limit: number,
    offset: number,
    roastLevel?: string | null
  ): Promise<CoffeeRecommendationPage>;
}
