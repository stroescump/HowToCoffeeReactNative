import { CoffeeProductMarketplace } from "./CoffeeProduct";

export type CoffeeRecommendationItem = {
  product: CoffeeProductMarketplace;
  isWildCard: boolean;
  badge?: string;
};

export type UsedArchetype = {
  humanDescription: string;
  sweetness: number;
  body: number;
  brightness: number;
};

export type CoffeeRecommendationPage = {
  items: CoffeeRecommendationItem[];
  nextOffset?: number | null;
  usedArchetype?: UsedArchetype | null;
};
