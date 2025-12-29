import { assertNever } from "../../../../shared/config/functions";
import type { BrewDiagnoseSessionDraft } from "../../domain/models/BrewDiagnoseSessionDraft";
import { createInitialDiagnoseState, DiagnoseFlowState, DiagnoseResumeTarget } from "../../domain/models/DiagnoseFlowState";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import { getNextStep } from "../../domain/usecases/GetNextStep";
import { getPreviousStep } from "../../domain/usecases/GetPreviousStep";

export type DiagnoseEvent =
  | { type: "UPDATE_SESSION"; patch: BrewDiagnoseSessionDraft }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_STEP"; step: DiagnoseStep }
  | { type: "SET_RESUME_TARGET"; target: DiagnoseResumeTarget }
  | { type: "HYDRATE"; state: DiagnoseFlowState }
  | { type: "RESET" }
  | { type: "CLEAR_DRAFT" };

export function diagnoseReducer(
  state: DiagnoseFlowState,
  event: DiagnoseEvent
): DiagnoseFlowState {
  switch (event.type) {
    case "NEXT_STEP":
      return {
        ...state,
        step: getNextStep(state.step, state.session),
      };
    case "PREV_STEP":
      return {
        ...state,
        step: getPreviousStep(state.step, state.session),
      };
    case "SET_STEP":
      return {
        ...state,
        step: event.step,
      };
    case "UPDATE_SESSION":
      return {
        ...state,
        session: { ...state.session, ...event.patch },
      };
    case "SET_RESUME_TARGET":
      return {
        ...state,
        resumeTarget: event.target,
      };
    case "HYDRATE":
      return event.state;
    case "RESET":
      return createInitialDiagnoseState();
    case "CLEAR_DRAFT":
      return createInitialDiagnoseState();
    default:
      assertNever(event)
  }
}
