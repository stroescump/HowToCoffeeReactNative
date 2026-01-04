import { NearbyCoffeeShopsPage } from "../../domain/models/NearbyCoffeeShopsPage";
import { NearbyCoffeeShopsQuery } from "../../domain/models/NearbyCoffeeShopsQuery";
import { CoffeePlacesRepository } from "../../domain/repositories/CoffeePlacesRepository";
import { fetchNearbyCoffeeShops } from "../api/coffeePlacesApi";
import { mapCoffeeShopsPage } from "../mappers/coffeeShopMapper";

export class CoffeePlacesRepositoryImpl implements CoffeePlacesRepository {
  async getNearby(query: NearbyCoffeeShopsQuery): Promise<NearbyCoffeeShopsPage> {
    const dto = await fetchNearbyCoffeeShops({
      lat: query.location.lat,
      lng: query.location.lng,
      radiusMeters: query.radiusMeters,
      limit: query.limit,
      offset: query.offset,
    });

    return mapCoffeeShopsPage(dto);
  }
}
