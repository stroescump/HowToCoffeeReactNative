import { CoffeeRecommendationPage } from "../../domain/models/CoffeeRecommendation";
import { CoffeeMarketplaceRepository } from "../../domain/repositories/CoffeeMarketplaceRepository";
import { fetchCoffeeRecommendations } from "../api/coffeeRecommendationsApi";
import { mapCoffeeRecommendationsPage } from "../mappers/coffeeRecommendationMapper";

export class CoffeeMarketplaceRepositoryImpl
  implements CoffeeMarketplaceRepository
{
  async getRecommended(): Promise<CoffeeRecommendationPage> {
    const dto = await fetchCoffeeRecommendations();
    return mapCoffeeRecommendationsPage(dto);
  }
}
