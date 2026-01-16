export type MarketplaceProductShopDto = {
  id?: string | null;
  name?: string | null;
};

export type MarketplaceProductOriginDto = {
  country?: string | null;
  region?: string | null;
};

export type MarketplaceProductSummaryDto = {
  id: string;
  marketplaceId?: string | null;
  name: string;
  imageUrls?: string[] | null;
  roasterId?: string | null;
  roasterName?: string | null;
  shop?: MarketplaceProductShopDto | null;
  origin?: MarketplaceProductOriginDto | null;
  roastLevel?: string | null;
  processing?: string | null;
  variety?: string | null;
  altitudeMeters?: number | null;
  roastDate?: string | null;
  priceMinor?: number | null;
  currency?: string | null;
  isAvailable?: boolean | null;
  curationScore?: number | null;
};

export type MarketplaceRecommendationItemDto = {
  product: MarketplaceProductSummaryDto;
  isWildCard?: boolean | null;
  badge?: string | null;
};

export type MarketplaceRecommendationResponseDto = {
  items: MarketplaceRecommendationItemDto[];
  nextOffset?: number | null;
  usedArchetype?: UsedArchetypeDto | null;
};

export type UsedArchetypeDto = {
  humanDescription: string;
  sweetness: number;
  body: number;
  brightness: number;
};

export type CoffeeRecommendationResponseDto = MarketplaceRecommendationResponseDto;

export type MarketplaceProductDetailDto = {
  id: string;
  marketplaceId: string;
  name: string;
  imageUrls: string[];
  roasterId: string | null;
  roasterName: string | null;
  shop: MarketplaceProductShopDto | null;
  origin: MarketplaceProductOriginDto | null;
  roastLevel: string;
  processing: string | null;
  variety: string | null;
  altitudeMeters: number | null;
  roastDate: string | null;
  tastingNotes: string[];
  tasteAxes: string[];
  fullLabelText: string | null;
  priceMinor: number;
  currency: string;
  isAvailable: boolean;
};
