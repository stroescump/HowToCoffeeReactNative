// src/features/recipeagenda/data/espressoRecipeApi.ts
import { http } from "@/src/shared/lib/httpClient";
import { BrewRecipe } from "../domain/models/recipeAgenda";

export async function fetchBrewRecipes(): Promise<BrewRecipe[]> {
  return http<BrewRecipe[]>("/brew-sessions", {
    method: "GET"
  });
}