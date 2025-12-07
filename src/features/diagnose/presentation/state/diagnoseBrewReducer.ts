import { assertNever } from "../../../../shared/config/functions";
import { createInitialDiagnoseState, DiagnoseFlowState } from "../../domain/models/DiagnoseFlowState";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import { BrewDiagnoseSession } from "../../domain/models/BrewDiagnoseSession";
import { getNextStep } from "../../domain/usecases/GetNextStep";
import { getPreviousStep } from "../../domain/usecases/GetPreviousStep";

type DiagnoseEvent =
  | { type: "UPDATE_SESSION"; patch: Partial<BrewDiagnoseSession> }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_STEP"; step: DiagnoseStep }
  | { type: "HYDRATE"; state: DiagnoseFlowState }
  | { type: "RESET" }
  ;

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
    case "HYDRATE":
      return event.state;
    case "RESET":
      return createInitialDiagnoseState();
    default:
      assertNever(event)
  }
}
