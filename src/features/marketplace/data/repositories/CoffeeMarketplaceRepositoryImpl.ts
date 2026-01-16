import { CoffeeRecommendationPage } from "../../domain/models/CoffeeRecommendation";
import { CoffeeMarketplaceRepository } from "../../domain/repositories/CoffeeMarketplaceRepository";
import { fetchCoffeeRecommendations } from "../api/coffeeRecommendationsApi";
import { mapCoffeeRecommendationsPage } from "../mappers/coffeeRecommendationMapper";

export class CoffeeMarketplaceRepositoryImpl
  implements CoffeeMarketplaceRepository
{
  async getRecommended(
    limit: number,
    offset: number,
    roastLevel?: string | null
  ): Promise<CoffeeRecommendationPage> {
    const dto = await fetchCoffeeRecommendations({ limit, offset, roastLevel });
    return mapCoffeeRecommendationsPage(dto);
  }
}
