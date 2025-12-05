// src/features/recipeagenda/data/espressoRecipeApi.ts
import { http } from "@/src/shared/lib/httpClient";
import { EspressoRecipe } from "../domain/models/recipeAgenda";

export async function fetchEspressoRecipes(): Promise<EspressoRecipe[]> {
  return http<EspressoRecipe[]>("/espresso/recipes", {
    method: "GET"
  });
}