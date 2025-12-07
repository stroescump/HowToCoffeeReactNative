import { assertNever } from "../../../../shared/config/functions";
import type { BrewDiagnoseSession } from "../models/BrewDiagnoseSession";
import { DiagnoseStep, type DiagnoseStep as DiagnoseStepType } from "../models/DiagnoseStep";

export function getPreviousStep(
  current: DiagnoseStepType,
  answers: Partial<BrewDiagnoseSession>
): DiagnoseStepType {
  switch (current) {
    case DiagnoseStep.CoffeeType:
      return DiagnoseStep.CoffeeType;
    case DiagnoseStep.Dose:
      return DiagnoseStep.CoffeeType;
    case DiagnoseStep.ExtractionDuration:
      return DiagnoseStep.Dose;
    case DiagnoseStep.TasteFeedback:
      return DiagnoseStep.ExtractionDuration;
    case DiagnoseStep.Recommendation:
      return DiagnoseStep.TasteFeedback;
    default:
      return assertNever(current);
  }
}
