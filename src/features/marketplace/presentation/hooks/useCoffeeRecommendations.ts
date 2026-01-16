import { useCallback, useEffect, useState } from "react";
import { CoffeeMarketplaceRepositoryImpl } from "../../data/repositories/CoffeeMarketplaceRepositoryImpl";
import { CoffeeRecommendationItem } from "../../domain/models/CoffeeRecommendation";
import { getCoffeeRecommendations } from "../../domain/usecases/getCoffeeRecommendations";
import { sortRecommendationsByCuration } from "../../domain/usecases/sortRecommendationsByCuration";

const repository = new CoffeeMarketplaceRepositoryImpl();
const DEFAULT_ERROR = "Couldn't load coffee recommendations.";
const DEFAULT_LIMIT = 10;

export function useCoffeeRecommendations(roastLevel?: string | null) {
  const [items, setItems] = useState<CoffeeRecommendationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextOffset, setNextOffset] = useState<number | null>(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const refresh = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const page = await getCoffeeRecommendations(
        repository,
        DEFAULT_LIMIT,
        0,
        roastLevel ?? null
      );
      const sorted = sortRecommendationsByCuration(page.items);
      setItems(sorted);
      setNextOffset(page.nextOffset ?? null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [roastLevel]);

  const loadMore = useCallback(async () => {
    if (loadingMore || loading || nextOffset == null) return;
    setLoadingMore(true);
    try {
      const page = await getCoffeeRecommendations(
        repository,
        DEFAULT_LIMIT,
        nextOffset,
        roastLevel ?? null
      );
      const merged = sortRecommendationsByCuration([
        ...items,
        ...page.items,
      ]);
      setItems(merged);
      setNextOffset(page.nextOffset ?? null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoadingMore(false);
    }
  }, [items, loading, loadingMore, nextOffset, roastLevel]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { items, loading, error, refresh, loadMore, loadingMore, nextOffset };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return DEFAULT_ERROR;
}
