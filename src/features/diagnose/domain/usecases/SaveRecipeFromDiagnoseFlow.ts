import { http } from "@/src/shared/lib/httpClient";
import { BrewDiagnoseSession } from "../models/BrewDiagnoseSession";
import { CreateEspressoRecipeRequest } from "../models/CreateEspressoRecipeRequest";

export async function saveRecipeFromSession(session: BrewDiagnoseSession): Promise<void> {
    const payload: CreateEspressoRecipeRequest = {
            coffeeProductId: session.coffeeProductId,
            coffeeDisplayName: session.coffeeDisplayName,
            shopName: session.shopName,
            doseGrams: session.doseGrams,
            yieldGrams: session.yieldGrams,
            brewTimeSeconds: session.brewTimeSeconds,
            temperatureCelsius: session.temperatureCelsius,
            grinderModel:session.grinderModel,
            grindSetting: session.grindSetting,
            
    };
    await http("/recipes", { method: "POST", body: payload });
}