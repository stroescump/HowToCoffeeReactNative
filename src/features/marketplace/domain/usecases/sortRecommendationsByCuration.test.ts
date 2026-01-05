import { strict as assert } from "assert";
import { CoffeeRecommendationItem } from "../models/CoffeeRecommendation";
import { CoffeeProduct } from "../models/CoffeeProduct";
import { sortRecommendationsByCuration } from "./sortRecommendationsByCuration";

function buildItem(
  id: string,
  score: number | null,
  name = "Coffee"
): CoffeeRecommendationItem {
  const product: CoffeeProduct = {
    id,
    name,
    roastLevel: "UNKNOWN",
    curationScore: score,
  };
  return { product, reasonTags: [], isWildCard: false };
}

describe("sortRecommendationsByCuration", () => {
  it("orders by descending score and keeps nulls last", () => {
    const items = [
      buildItem("a", 5),
      buildItem("b", null),
      buildItem("c", 2),
    ];
    const sorted = sortRecommendationsByCuration(items);
    assert.deepEqual(
      sorted.map((item) => item.product.id),
      ["a", "c", "b"]
    );
  });

  it("keeps original order when scores are missing", () => {
    const items = [buildItem("a", null), buildItem("b", null)];
    const sorted = sortRecommendationsByCuration(items);
    assert.deepEqual(
      sorted.map((item) => item.product.id),
      ["a", "b"]
    );
  });
});
