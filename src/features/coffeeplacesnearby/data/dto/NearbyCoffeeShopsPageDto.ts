import { NearbyCoffeeShopDto } from "./NearbyCoffeeShopDto";

export type NearbyCoffeeShopsPageDto = {
  items: NearbyCoffeeShopDto[];
  nextOffset?: number | null;
};
