import { CoffeeShop } from "../../domain/models/CoffeeShop";
import { NearbyCoffeeShopsPage } from "../../domain/models/NearbyCoffeeShopsPage";
import { NearbyCoffeeShopDto } from "../dto/NearbyCoffeeShopDto";
import { NearbyCoffeeShopsPageDto } from "../dto/NearbyCoffeeShopsPageDto";

export function mapCoffeeShop(dto: NearbyCoffeeShopDto): CoffeeShop | null {
  const shop = dto.shop ?? dto;
  if (!shop?.id || !shop?.name) return null;
  return {
    id: shop.id,
    name: shop.name,
    address: shop.address ?? undefined,
    distanceMeters: dto.distanceMeters ?? 0,
    tags: shop.tags ?? [],
    isFeatured: shop.isFeatured ?? false,
    curationScore: shop.curationScore ?? 0,
    tasteMatchScore: dto.tasteMatchScore ?? undefined,
  };
}

export function mapCoffeeShopsPage(
  dto: NearbyCoffeeShopsPageDto
): NearbyCoffeeShopsPage {
  const items = dto.items
    .map(mapCoffeeShop)
    .filter((item): item is CoffeeShop => item != null);
  return {
    items,
    nextOffset: dto.nextOffset ?? null,
  };
}
