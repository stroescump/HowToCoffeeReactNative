import { strict as assert } from "assert";
import { CoffeeRecommendationItem } from "../models/CoffeeRecommendation";
import { CoffeeProduct, CoffeeProductMarketplace } from "../models/CoffeeProduct";
import { sortRecommendationsByCuration } from "./sortRecommendationsByCuration";

function buildItem(
  id: string,
  score: number | null,
  name = "Coffee"
): CoffeeRecommendationItem {
  const coffeeProduct: CoffeeProduct = {
    id,
    name,
    imageUrls: null,
    roasterId: null,
    roasterName: null,
    shop: null,
    origin: null,
    roastLevel: "UNKNOWN",
    processing: null,
    variety: null,
    altitudeMeters: null,
    roastDate: null,
    tastingNotes: null,
    tasteAxes: null,
    fullLabelText: null,
    marketplaceProductId: id,
    curationScore: score,
  };
  const product: CoffeeProductMarketplace = {
    id,
    coffeeProduct,
    priceMinor: null,
    currency: null,
    isAvailable: true,
  };
  return { product, isWildCard: false };
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
