import {
  CoffeeRecommendationItem,
  CoffeeRecommendationPage,
  UsedArchetype,
} from "../../domain/models/CoffeeRecommendation";
import {
  CoffeeProduct,
  Processing,
  RoastLevel,
} from "../../domain/models/CoffeeProduct";
import {
  CoffeeProductSummaryDto,
  CoffeeRecommendationItemDto,
  CoffeeRecommendationResponseDto,
  UsedArchetypeDto,
} from "../dto/CoffeeRecommendationDto";

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
  dto: CoffeeRecommendationResponseDto
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
  dto: CoffeeRecommendationItemDto
): CoffeeRecommendationItem | null {
  const product = mapCoffeeProduct(dto.product);
  if (!product) return null;
  return {
    product,
    reasonTags: dto.reasonTags ?? [],
    isWildCard: dto.isWildCard ?? false,
    badge: dto.badge ?? undefined,
  };
}

function mapCoffeeProduct(dto?: CoffeeProductSummaryDto | null): CoffeeProduct | null {
  if (!dto?.id || !dto?.name) return null;
  return {
    id: dto.id,
    shopName: dto.shopName ?? undefined,
    name: dto.name,
    roastLevel: mapRoastLevel(dto.roastLevel),
    originCountry: dto.originCountry ?? undefined,
    originRegion: dto.originRegion ?? undefined,
    processing: mapProcessing(dto.processing),
    variety: dto.variety ?? undefined,
    altitudeMeters: dto.altitudeMeters ?? undefined,
    tasteNotes: dto.tasteNotes ?? undefined,
    imageUrl: dto.imageUrl ?? undefined,
    curationScore: dto.curationScore ?? null,
  };
}

function mapRoastLevel(value?: string | null): RoastLevel {
  if (!value) return "UNKNOWN";
  const normalized = value.toUpperCase();
  return ROAST_LEVELS[normalized] ?? "UNKNOWN";
}

function mapProcessing(value?: string | null): Processing | undefined {
  if (!value) return undefined;
  const normalized = value.toUpperCase();
  return PROCESSING[normalized];
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
