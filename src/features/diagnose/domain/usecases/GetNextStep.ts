import { assertNever } from "../../../../shared/config/functions";
import type { BrewDiagnoseSession } from "../models/BrewDiagnoseSessionDraft";
import { DiagnoseStep } from "../models/DiagnoseStep";

export function getNextStep(
  current: DiagnoseStep,
  answers: Partial<BrewDiagnoseSession>
): DiagnoseStep {
  switch (current) {
    case DiagnoseStep.CoffeeType:
      return DiagnoseStep.Dose;
    case DiagnoseStep.Dose:
      // aici poți pune logica de skip în funcție de hasScale
      // if (answers.hasScale === false) return DiagnoseStep.Taste;
      return DiagnoseStep.ExtractionDuration;
    case DiagnoseStep.ExtractionDuration:
      return DiagnoseStep.Yield;
    case DiagnoseStep.Yield:
      return DiagnoseStep.TasteFeedback;
    case DiagnoseStep.TasteFeedback:
      return DiagnoseStep.Recommendation;
    case DiagnoseStep.Recommendation:
      return DiagnoseStep.Recommendation;
    default:
      return assertNever(current);
  }
}
