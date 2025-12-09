import { http } from "@/src/shared/lib/httpClient";
import { BrewDiagnoseSessionDraft } from "../models/BrewDiagnoseSessionDraft";
import { isSessionCompleteOrThrow } from "../models/BrewDiagnoseSessionMapper";
import { CreateBrewRecipeRequest } from "../models/CreateBrewRecipeRequest";

export async function saveRecipeFromSession(
  session: BrewDiagnoseSessionDraft,
): Promise<void> {
  const sessionComplete = isSessionCompleteOrThrow(session);

  const payload: CreateBrewRecipeRequest = {
    coffeeDisplayName: sessionComplete.coffeeDisplayName,
    brewMethod: sessionComplete.brewMethod,
    doseGrams: sessionComplete.doseGrams,
    yieldGrams: sessionComplete.yieldGrams,
    brewTimeSeconds: sessionComplete.brewTimeSeconds,
    grindSetting: sessionComplete.grindSetting,
  };

  if (sessionComplete.coffeeProductId != null) {
    payload.coffeeProductId = sessionComplete.coffeeProductId;
  }

  if (sessionComplete.shopName != null) {
    payload.shopName = sessionComplete.shopName;
  }

  if (sessionComplete.temperatureCelsius != null) {
    payload.temperatureCelsius = sessionComplete.temperatureCelsius;
  }

  if (sessionComplete.grinderModel != null) {
    payload.grinderModel = sessionComplete.grinderModel;
  }

  await http("/recipes", { method: "POST", body: payload });
}
