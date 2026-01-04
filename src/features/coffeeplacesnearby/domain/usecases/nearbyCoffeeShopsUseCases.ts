import { NearbyCoffeeShopsPage } from "../models/NearbyCoffeeShopsPage";
import { NearbyCoffeeShopsQuery } from "../models/NearbyCoffeeShopsQuery";
import { CoffeePlacesRepository } from "../repositories/CoffeePlacesRepository";

export async function getNearbyCoffeeShops(
  repository: CoffeePlacesRepository,
  query: NearbyCoffeeShopsQuery
): Promise<NearbyCoffeeShopsPage> {
  return repository.getNearby(query);
}
