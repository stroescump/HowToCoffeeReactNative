import { CoffeeShop } from "../models/CoffeeShop";

export function filterCoffeeShopsByTags(
  shops: CoffeeShop[],
  tags: string[]
): CoffeeShop[] {
  if (tags.length === 0) return shops;
  return shops.filter((shop) => tags.every((tag) => shop.tags.includes(tag)));
}
