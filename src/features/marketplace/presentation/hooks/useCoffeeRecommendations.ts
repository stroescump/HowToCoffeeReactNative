import { useCallback, useEffect, useState } from "react";
import { CoffeeMarketplaceRepositoryImpl } from "../../data/repositories/CoffeeMarketplaceRepositoryImpl";
import { CoffeeRecommendationItem } from "../../domain/models/CoffeeRecommendation";
import { getCoffeeRecommendations } from "../../domain/usecases/getCoffeeRecommendations";
import { sortRecommendationsByCuration } from "../../domain/usecases/sortRecommendationsByCuration";

const repository = new CoffeeMarketplaceRepositoryImpl();
const DEFAULT_ERROR = "Couldn't load coffee recommendations.";

export function useCoffeeRecommendations() {
  const [items, setItems] = useState<CoffeeRecommendationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const page = await getCoffeeRecommendations(repository);
      const sorted = sortRecommendationsByCuration(page.items);
      setItems(sorted);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { items, loading, error, refresh };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return DEFAULT_ERROR;
}
