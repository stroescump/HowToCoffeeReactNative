import { strict as assert } from "assert";
import { CoffeeShop } from "../models/CoffeeShop";
import { filterCoffeeShopsByTags } from "./filterCoffeeShopsByTags";

function buildShop(id: string, tags: string[]): CoffeeShop {
  return {
    id,
    name: "Cafe",
    address: "",
    distanceMeters: 0,
    tags,
    isFeatured: false,
    curationScore: 0,
  };
}

describe("filterCoffeeShopsByTags", () => {
  it("returns all shops when no tags provided", () => {
    const shops = [buildShop("a", ["decaf"]), buildShop("b", [])];
    const filtered = filterCoffeeShopsByTags(shops, []);
    assert.deepEqual(
      filtered.map((shop) => shop.id),
      ["a", "b"]
    );
  });

  it("keeps only shops that include all tags", () => {
    const shops = [
      buildShop("a", ["decaf", "working_friendly"]),
      buildShop("b", ["decaf"]),
      buildShop("c", ["working_friendly", "alt_milk"]),
    ];
    const filtered = filterCoffeeShopsByTags(shops, [
      "decaf",
      "working_friendly",
    ]);
    assert.deepEqual(filtered.map((shop) => shop.id), ["a"]);
  });
});
