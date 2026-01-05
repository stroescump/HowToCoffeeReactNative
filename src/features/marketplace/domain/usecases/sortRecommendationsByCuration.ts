import { CoffeeRecommendationItem } from "../models/CoffeeRecommendation";

export function sortRecommendationsByCuration(
  items: CoffeeRecommendationItem[]
): CoffeeRecommendationItem[] {
  const indexed = items.map((item, index) => ({
    item,
    index,
    score: item.product.curationScore ?? Number.NEGATIVE_INFINITY,
  }));

  indexed.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.index - b.index;
  });

  return indexed.map(({ item }) => item);
}
