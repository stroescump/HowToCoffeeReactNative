import type { DiagnoseAnswers, DiagnoseAnswersDraft } from "../models/DiagnoseAnswers";

export function isCompleteDiagnoseAnswers(
  answers: DiagnoseAnswersDraft
): answers is DiagnoseAnswers {
  return (
    answers.coffeeType != null &&
    answers.doseGrams != null &&
    answers.hasScale != null &&
    answers.extractionDuration != null &&
    answers.tasteFeedback != null
  );
}