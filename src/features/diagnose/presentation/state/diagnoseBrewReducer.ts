import { assertNever } from "../../../../shared/config/functions";
import { DiagnoseAnswersDraft } from "../../domain/models/DiagnoseAnswers";
import { DiagnoseFlowState, INITIAL_DIAGNOSE_STATE } from "../../domain/models/DiagnoseFlowState";
import { getNextStep } from "../../domain/usecases/GetNextStep";
import { getPreviousStep } from "../../domain/usecases/GetPreviousStep";

type DiagnoseEvent =
  | { type: "UPDATE_ANSWERS"; patch: DiagnoseAnswersDraft }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" }
  ;

export function diagnoseReducer(
  state: DiagnoseFlowState,
  event: DiagnoseEvent
): DiagnoseFlowState {
  switch (event.type) {
    case "UPDATE_ANSWERS":
      return {
        ...state,
        answers: { ...state.answers, ...event.patch },
      };
    case "NEXT_STEP":
      return {
        ...state,
        step: getNextStep(state.step, state.answers),
      };
    case "PREV_STEP":
      return {
        ...state,
        step: getPreviousStep(state.step, state.answers),
      };
    case "RESET":
      return INITIAL_DIAGNOSE_STATE;
    default:
      assertNever(event)
  }
}