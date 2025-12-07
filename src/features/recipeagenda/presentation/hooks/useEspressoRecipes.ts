import { useCallback, useEffect, useState } from "react";
import { fetchBrewRecipes } from "../../data/brewRecipeApi";
import { BrewRecipe } from "../../domain/models/recipeAgenda";

type UseBrewRecipesResult = {
  data: BrewRecipe[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * ViewModel-style hook for the Recipe Agenda.
 *
 * - lives on the "presentation" side conceptually
 * - talks to the data layer via `fetchBrewRecipes`
 * - exposes UI-friendly state (loading, error, data, refetch)
 */
export function useBrewRecipes(): UseBrewRecipesResult {
  const [data, setData] = useState<BrewRecipe[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const recipes = await fetchBrewRecipes();
      setData(recipes);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Failed to load recipes"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    data,
    isLoading,
    error,
    refetch: load,
  };
}