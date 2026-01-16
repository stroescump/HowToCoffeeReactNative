import {
  CoffeeRecommendationItem,
  CoffeeRecommendationPage,
  UsedArchetype,
} from "../../domain/models/CoffeeRecommendation";
import {
  MarketplaceRecommendationItemDto,
  MarketplaceRecommendationResponseDto,
  UsedArchetypeDto,
} from "../dto/CoffeeRecommendationDto";
import { mapMarketplaceListingFromProduct } from "./coffeeProductMapper";

const ROAST_LEVELS: Record<string, RoastLevel> = {
  LIGHT: "LIGHT",
  MEDIUM: "MEDIUM",
  DARK: "DARK",
  OMNI: "OMNI",
  FILTER: "FILTER",
  ESPRESSO: "ESPRESSO",
  UNKNOWN: "UNKNOWN",
};

const PROCESSING: Record<string, Processing> = {
  NATURAL: "NATURAL",
  WASHED: "WASHED",
  HONEY: "HONEY",
  ANAEROBIC: "ANAEROBIC",
  COFERMENTED: "COFERMENTED",
};

export function mapCoffeeRecommendationsPage(
  dto: MarketplaceRecommendationResponseDto
): CoffeeRecommendationPage {
  const items = dto.items
    .map(mapCoffeeRecommendationItem)
    .filter((item): item is CoffeeRecommendationItem => item != null);

  return {
    items,
    nextOffset: dto.nextOffset ?? null,
    usedArchetype: mapUsedArchetype(dto.usedArchetype),
  };
}

function mapCoffeeRecommendationItem(
  dto: MarketplaceRecommendationItemDto
): CoffeeRecommendationItem | null {
  const product = mapMarketplaceListingFromProduct(dto.product);
  if (!product) return null;
  return {
    product,
    isWildCard: dto.isWildCard ?? false,
    badge: dto.badge ?? undefined,
  };
}

function mapUsedArchetype(dto?: UsedArchetypeDto | null): UsedArchetype | null {
  if (!dto) return null;
  return {
    humanDescription: dto.humanDescription,
    sweetness: dto.sweetness,
    body: dto.body,
    brightness: dto.brightness,
  };
}
