import { CoffeeRecommendationPage } from "../models/CoffeeRecommendation";

export interface CoffeeMarketplaceRepository {
  getRecommended(): Promise<CoffeeRecommendationPage>;
}
