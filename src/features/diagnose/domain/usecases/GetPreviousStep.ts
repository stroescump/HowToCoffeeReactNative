import { assertNever } from "../../../../shared/config/functions";
import type { DiagnoseAnswersDraft } from "../entities/DiagnoseAnswers";
import { DiagnoseStep, type DiagnoseStep as DiagnoseStepType } from "../valueObjects/DiagnoseStep";

export function getPreviousStep(
  current: DiagnoseStepType,
  answers: DiagnoseAnswersDraft
): DiagnoseStepType {
  switch (current) {
    case DiagnoseStep.CoffeeType:
      return DiagnoseStep.CoffeeType;
    case DiagnoseStep.Dose:
      return DiagnoseStep.CoffeeType;
    case DiagnoseStep.Time:
      return DiagnoseStep.Dose;
    case DiagnoseStep.Taste:
      return DiagnoseStep.Time;
    case DiagnoseStep.Recommendation:
      return DiagnoseStep.Taste;
    default:
      return assertNever(current);
  }
}