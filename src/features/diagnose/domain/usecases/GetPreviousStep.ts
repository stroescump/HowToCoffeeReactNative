import type { DiagnoseAnswers } from "../entities/DiagnoseAnswers";
import { DiagnoseStep, type DiagnoseStep as DiagnoseStepType } from "../valueObjects/DiagnoseStep";

function assertNever(x: never): never {
  throw new Error(`Unexpected step: ${x}`);
}

export function getPreviousStep(
  current: DiagnoseStepType,
  answers: DiagnoseAnswers
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