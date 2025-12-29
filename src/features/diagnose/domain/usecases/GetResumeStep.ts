import type { BrewDiagnoseSessionDraft } from "../models/BrewDiagnoseSessionDraft";
import { DiagnoseStep } from "../models/DiagnoseStep";

export function getResumeStep(session: BrewDiagnoseSessionDraft): DiagnoseStep {
  if (!session.coffeeRoast) {
    return DiagnoseStep.CoffeeRoast;
  }

  if (session.doseGrams == null) {
    return DiagnoseStep.Dose;
  }

  if (session.brewTimeSeconds == null) {
    return DiagnoseStep.ExtractionDuration;
  }

  if (session.yieldGrams == null) {
    return DiagnoseStep.Yield;
  }

  if (!session.tasteFeedback) {
    return DiagnoseStep.TasteFeedback;
  }

  return DiagnoseStep.Recommendation;
}
