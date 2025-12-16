import { BrewMethod } from "@/src/shared/domain/models/BrewMethod";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrewDiagnoseSessionDraft } from "../../domain/models/BrewDiagnoseSessionDraft";
import {
  createInitialDiagnoseState,
  DiagnoseFlowState,
} from "../../domain/models/DiagnoseFlowState";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import { DiagnoseEvent, diagnoseReducer } from "../state/diagnoseBrewReducer";

interface UseDiagnoseFlowDeps {
  draftRepository: DiagnoseRepository;
}

export function useDiagnoseFlow({ draftRepository }: UseDiagnoseFlowDeps) {
  const [state, setState] = useState<DiagnoseFlowState>(createInitialDiagnoseState());
  const stateRef = useRef(state);
  const hydratedRef = useRef(false);
  const { step, session } = state;

  const persistByEvent = useCallback(
    async (event: DiagnoseEvent, nextState: DiagnoseFlowState) => {
      switch (event.type) {
        case "HYDRATE":
          return;
        case "RESET":
          return draftRepository.clearDraft();
        default:
          return draftRepository.saveDraft(nextState);
      }
    },
    [draftRepository],
  );

  const dispatchEvent = useCallback(
    async (event: DiagnoseEvent) => {
      const nextState = diagnoseReducer(stateRef.current, event);
      stateRef.current = nextState;
      setState(nextState);
      await persistByEvent(event, nextState);
      return nextState;
    },
    [persistByEvent],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const draft = await draftRepository.loadDraft();
      if (cancelled) return;
      if (draft) {
        await dispatchEvent({ type: "HYDRATE", state: ensureSessionDraft(draft) });
      } else {
        await dispatchEvent({ type: "RESET" });
      }
      hydratedRef.current = true;
    })();
    return () => {
      cancelled = true;
    };
  }, [draftRepository, dispatchEvent]);

  const updateSession = useCallback(
    (patch: BrewDiagnoseSessionDraft) => dispatchEvent({ type: "UPDATE_SESSION", patch }),
    [dispatchEvent],
  );

  const nextStep = useCallback(
    () => dispatchEvent({ type: "NEXT_STEP" }),
    [dispatchEvent],
  );

  const prevStep = useCallback(
    () => dispatchEvent({ type: "PREV_STEP" }),
    [dispatchEvent],
  );

  const goToStep = useCallback(
    (step: DiagnoseStep) => dispatchEvent({ type: "SET_STEP", step }),
    [dispatchEvent],
  );

  const clearAndReset = useCallback(
    async () => {
      await dispatchEvent({ type: "RESET" });
    },
    [dispatchEvent],
  );

  return {
    step,
    session,
    state,
    hydrated: hydratedRef.current,
    updateSession,
    nextStep,
    prevStep,
    goToStep,
    clearAndReset,
    dispatchEvent,
  };
}

function ensureSessionDraft(draft: DiagnoseFlowState): DiagnoseFlowState {
  return {
    ...draft,
    session: {
      ...(draft.session ?? {}),
      brewMethod: draft.session?.brewMethod ?? BrewMethod.ESPRESSO,
    },
  };
}
