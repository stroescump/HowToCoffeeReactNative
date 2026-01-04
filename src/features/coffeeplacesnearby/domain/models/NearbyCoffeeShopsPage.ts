import { CoffeeShop } from "./CoffeeShop";

export type NearbyCoffeeShopsPage = {
  items: CoffeeShop[];
  nextOffset?: number | null;
};
