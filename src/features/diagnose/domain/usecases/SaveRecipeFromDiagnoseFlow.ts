import { http } from "@/src/shared/lib/httpClient";
import { BrewDiagnoseSession } from "../models/BrewDiagnoseSession";
import { CreateEspressoRecipeRequest } from "../models/CreateEspressoRecipeRequest";

function assertSessionCompleteness(session: Partial<BrewDiagnoseSession>) {
  const missing: string[] = [];
  if (session.doseGrams === undefined) missing.push("doseGrams");
  if (session.yieldGrams === undefined) missing.push("yieldGrams");
  if (session.brewTimeSeconds === undefined) missing.push("brewTimeSeconds");

  if (missing.length > 0) {
    throw new Error(`Cannot save recipe, missing: ${missing.join(", ")}`);
  }
}

export async function saveRecipeFromSession(
  session: Partial<BrewDiagnoseSession>,
): Promise<void> {
  assertSessionCompleteness(session);

  const payload: CreateEspressoRecipeRequest = {
    coffeeProductId: session.coffeeProductId,
    coffeeDisplayName: session.coffeeDisplayName,
    shopName: session.shopName,
    doseGrams: session.doseGrams,
    yieldGrams: session.yieldGrams,
    brewTimeSeconds: session.brewTimeSeconds,
    temperatureCelsius: session.temperatureCelsius,
    grinderModel: session.grinderModel,
    grindSetting: session.grindSetting,
  };

  await http("/recipes", { method: "POST", body: payload });
}
