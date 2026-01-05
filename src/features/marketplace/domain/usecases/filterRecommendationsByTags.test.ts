import { strict as assert } from "assert";
import { CoffeeRecommendationItem } from "../models/CoffeeRecommendation";
import { CoffeeProduct } from "../models/CoffeeProduct";
import { filterRecommendationsByTags } from "./filterRecommendationsByTags";

function buildItem(id: string, reasonTags: string[]): CoffeeRecommendationItem {
  const product: CoffeeProduct = {
    id,
    name: "Coffee",
    roastLevel: "UNKNOWN",
  };
  return { product, reasonTags, isWildCard: false };
}

describe("filterRecommendationsByTags", () => {
  it("returns all items when no tags provided", () => {
    const items = [buildItem("a", ["decaf"]), buildItem("b", [])];
    const filtered = filterRecommendationsByTags(items, []);
    assert.deepEqual(
      filtered.map((item) => item.product.id),
      ["a", "b"]
    );
  });

  it("keeps only items that include all requested tags", () => {
    const items = [
      buildItem("a", ["decaf", "working_friendly"]),
      buildItem("b", ["decaf"]),
      buildItem("c", ["working_friendly", "alt_milk"]),
    ];
    const filtered = filterRecommendationsByTags(items, [
      "decaf",
      "working_friendly",
    ]);
    assert.deepEqual(filtered.map((item) => item.product.id), ["a"]);
  });
});
