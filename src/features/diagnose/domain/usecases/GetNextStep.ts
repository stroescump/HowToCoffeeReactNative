import { assertNever } from "../../../../shared/config/functions";
import type { DiagnoseAnswers } from "../entities/DiagnoseAnswers";
import { DiagnoseStep, type DiagnoseStep as DiagnoseStepType } from "../valueObjects/DiagnoseStep";

export function getNextStep(
  current: DiagnoseStepType,
  answers: DiagnoseAnswers
): DiagnoseStepType {
  switch (current) {
    case DiagnoseStep.CoffeeType:
      return DiagnoseStep.Dose;
    case DiagnoseStep.Dose:
      // aici poți pune logica de skip în funcție de hasScale
      // if (!answers.hasScale) return DiagnoseStep.Taste;
      return DiagnoseStep.Time;
    case DiagnoseStep.Time:
      return DiagnoseStep.Taste;
    case DiagnoseStep.Taste:
      return DiagnoseStep.Recommendation;
    case DiagnoseStep.Recommendation:
      return DiagnoseStep.Recommendation;
    default:
      return assertNever(current);
  }
}