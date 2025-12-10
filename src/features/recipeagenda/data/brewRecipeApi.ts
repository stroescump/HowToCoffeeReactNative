// src/features/recipeagenda/data/espressoRecipeApi.ts
import { http } from "@/src/shared/lib/httpClient";
import { BrewRecipe } from "../domain/models/recipeAgenda";

export async function fetchBrewRecipes(): Promise<BrewRecipe[]> {
  return http<BrewRecipe[]>("/recipes", {
    method: "GET"
  });
}

export async function deleteBrewRecipe(recipeId: string): Promise<void> {
  await http(`/recipes/${recipeId}`, { method: "DELETE" });
}
