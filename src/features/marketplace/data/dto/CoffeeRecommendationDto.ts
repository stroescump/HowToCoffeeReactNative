export type CoffeeProductSummaryDto = {
  id: string;
  shopName?: string | null;
  name: string;
  roastLevel?: string | null;
  originCountry?: string | null;
  originRegion?: string | null;
  processing?: string | null;
  variety?: string | null;
  altitudeMeters?: number | null;
  tasteNotes?: string[] | null;
  imageUrl?: string | null;
  curationScore?: number | null;
};

export type CoffeeRecommendationItemDto = {
  product: CoffeeProductSummaryDto;
  reasonTags?: string[] | null;
  isWildCard?: boolean | null;
  badge?: string | null;
};

export type UsedArchetypeDto = {
  humanDescription: string;
  sweetness: number;
  body: number;
  brightness: number;
};

export type CoffeeRecommendationResponseDto = {
  items: CoffeeRecommendationItemDto[];
  nextOffset?: number | null;
  usedArchetype?: UsedArchetypeDto | null;
};
