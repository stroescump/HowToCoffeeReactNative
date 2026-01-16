import {
  CoffeeProduct,
  CoffeeProductMarketplace,
  CoffeeShop,
  CoffeeOrigin,
  Processing,
  RoastLevel,
} from "../../domain/models/CoffeeProduct";
import {
  MarketplaceProductDetailDto,
  MarketplaceProductOriginDto,
  MarketplaceProductShopDto,
  MarketplaceProductSummaryDto,
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

export function mapMarketplaceProductSummary(
  dto?: MarketplaceProductSummaryDto | null,
  fallbackMarketplaceProductId?: string | null
): CoffeeProduct | null {
  if (!dto?.id || !dto?.name) return null;
  return {
    id: dto.id,
    name: dto.name,
    imageUrls: dto.imageUrls ?? null,
    roasterId: dto.roasterId ?? null,
    roasterName: dto.roasterName ?? null,
    shop: mapCoffeeShop(dto.shop),
    origin: mapCoffeeOrigin(dto.origin),
    roastLevel: mapRoastLevel(dto.roastLevel),
    processing: mapProcessing(dto.processing),
    variety: dto.variety ?? null,
    altitudeMeters: dto.altitudeMeters ?? null,
    roastDate: dto.roastDate ?? null,
    tastingNotes: null,
    tasteAxes: null,
    fullLabelText: null,
    marketplaceProductId: dto.marketplaceId ?? fallbackMarketplaceProductId ?? null,
    curationScore: dto.curationScore ?? null,
  };
}

export function mapMarketplaceProductDetail(
  dto?: MarketplaceProductDetailDto | null
): CoffeeProductMarketplace | null {
  if (!dto?.id || !dto?.marketplaceId) return null;
  const coffeeProduct: CoffeeProduct = {
    id: dto.id,
    name: dto.name,
    imageUrls: dto.imageUrls ?? null,
    roasterId: dto.roasterId ?? null,
    roasterName: dto.roasterName ?? null,
    shop: mapCoffeeShop(dto.shop),
    origin: mapCoffeeOrigin(dto.origin),
    roastLevel: mapRoastLevel(dto.roastLevel),
    processing: mapProcessing(dto.processing),
    variety: dto.variety ?? null,
    altitudeMeters: dto.altitudeMeters ?? null,
    roastDate: dto.roastDate ?? null,
    tastingNotes: dto.tastingNotes ?? null,
    tasteAxes: dto.tasteAxes ?? null,
    fullLabelText: dto.fullLabelText ?? null,
    marketplaceProductId: dto.marketplaceId ?? null,
    curationScore: null,
  };
  return {
    id: dto.marketplaceId,
    coffeeProduct,
    priceMinor: dto.priceMinor ?? null,
    currency: dto.currency ?? null,
    isAvailable: dto.isAvailable ?? false,
  };
}

export function mapMarketplaceListingFromProduct(
  productDto?: MarketplaceProductSummaryDto | null
): CoffeeProductMarketplace | null {
  if (!productDto?.id || !productDto?.marketplaceId) return null;
  const coffeeProduct = mapMarketplaceProductSummary(
    productDto,
    productDto.marketplaceId
  );
  if (!coffeeProduct) return null;
  return {
    id: productDto.marketplaceId,
    coffeeProduct,
    priceMinor: productDto.priceMinor ?? null,
    currency: productDto.currency ?? null,
    isAvailable: productDto.isAvailable ?? false,
  };
}

function mapRoastLevel(value?: string | null): RoastLevel | null {
  if (!value) return null;
  const normalized = value.toUpperCase();
  return ROAST_LEVELS[normalized] ?? "UNKNOWN";
}

function mapProcessing(value?: string | null): Processing | null {
  if (!value) return null;
  const normalized = value.toUpperCase();
  return PROCESSING[normalized] ?? null;
}

function mapCoffeeShop(dto?: MarketplaceProductShopDto | null): CoffeeShop | null {
  if (!dto?.id && !dto?.name) return null;
  return {
    id: dto?.id ?? null,
    name: dto?.name ?? null,
  };
}

function mapCoffeeOrigin(
  dto?: MarketplaceProductOriginDto | null
): CoffeeOrigin | null {
  if (!dto?.country && !dto?.region) return null;
  return {
    country: dto?.country ?? null,
    region: dto?.region ?? null,
  };
}
