import { CoffeeRecommendationItem } from "../models/CoffeeRecommendation";

export function filterRecommendationsByTags(
  items: CoffeeRecommendationItem[],
  tags: string[]
): CoffeeRecommendationItem[] {
  if (tags.length === 0) return items;
  return items.filter((item) =>
    tags.every((tag) => item.reasonTags.includes(tag))
  );
}
