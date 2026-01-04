import { NearbyCoffeeShopsPage } from "../models/NearbyCoffeeShopsPage";
import { NearbyCoffeeShopsQuery } from "../models/NearbyCoffeeShopsQuery";

export interface CoffeePlacesRepository {
  getNearby(query: NearbyCoffeeShopsQuery): Promise<NearbyCoffeeShopsPage>;
}
