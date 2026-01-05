import { useMemo, useState } from "react";
import { CoffeeShop } from "../../domain/models/CoffeeShop";
import { filterCoffeeShopsByTags } from "../../domain/usecases/filterCoffeeShopsByTags";

type FilterOption = {
  id: string;
  label: string;
};

const FILTER_OPTIONS: FilterOption[] = [
  { id: "decaf", label: "Decaf" },
  { id: "alt-milk", label: "Alternative Milk" },
  { id: "work", label: "Working friendly" },
];

const FILTER_TAGS: Record<string, string> = {
  decaf: "decaf",
  "alt-milk": "alt_milk",
  work: "working_friendly",
};

export function useCoffeeShopFilters(shops: CoffeeShop[]) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const activeTags = useMemo(
    () => activeFilters.map((id) => FILTER_TAGS[id]).filter(Boolean),
    [activeFilters]
  );

  const visibleShops = useMemo(
    () => filterCoffeeShopsByTags(shops, activeTags),
    [shops, activeTags]
  );

  return {
    options: FILTER_OPTIONS,
    activeFilters,
    toggleFilter,
    clearFilters,
    visibleShops,
    hasActiveFilters: activeFilters.length > 0,
  };
}
