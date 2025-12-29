import { assertNever } from "../../../../shared/config/functions";
import type { BrewDiagnoseSession } from "../models/BrewDiagnoseSessionDraft";
import { DiagnoseStep, type DiagnoseStep as DiagnoseStepType } from "../models/DiagnoseStep";

export function getPreviousStep(
  current: DiagnoseStepType,
  answers: Partial<BrewDiagnoseSession>
): DiagnoseStepType {
  switch (current) {
    case DiagnoseStep.CoffeeRoast:
      return DiagnoseStep.CoffeeRoast;
    case DiagnoseStep.Dose:
      return DiagnoseStep.CoffeeRoast;
    case DiagnoseStep.ExtractionDuration:
      return DiagnoseStep.Dose;
    case DiagnoseStep.Yield:
      return DiagnoseStep.ExtractionDuration;
    case DiagnoseStep.TasteFeedback:
      return DiagnoseStep.Yield;
    case DiagnoseStep.Recommendation:
      return DiagnoseStep.TasteFeedback;
    default:
      return assertNever(current);
  }
}
