import { useEffect, useReducer, useState } from "react";
import {
  createInitialDiagnoseState,
  DiagnoseFlowState,
} from "../../domain/models/DiagnoseFlowState";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import type { BrewDiagnoseSession } from "../../domain/models/BrewDiagnoseSession";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import { diagnoseReducer } from "../state/diagnoseBrewReducer";

interface UseDiagnoseFlowDeps {
  draftRepository: DiagnoseRepository;
}

export function useDiagnoseFlow({ draftRepository }: UseDiagnoseFlowDeps) {
  const [state, dispatch] = useReducer(
    diagnoseReducer,
    undefined,
    createInitialDiagnoseState,
  );
  const { step, session } = state;

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      const draft = await draftRepository.loadDraft();
      if (draft) {
        const normalized = ensureSessionDraft(draft);
        dispatch({ type: "HYDRATE", state: normalized });
      } else {
        dispatch({ type: "RESET" });
      }
      setHydrated(true);
    })();
  }, [draftRepository]);

  useEffect(() => {
    if (!hydrated) return;
    draftRepository.saveDraft(state).catch(() => {});
  }, [state, hydrated, draftRepository]);

  function updateSession(patch: Partial<BrewDiagnoseSession>) {
    dispatch({ type: "UPDATE_SESSION", patch });
  }

  function nextStep() {
    dispatch({ type: "NEXT_STEP" });
  }

  function prevStep() {
    dispatch({ type: "PREV_STEP" });
  }

  function goToStep(step: DiagnoseStep) {
    dispatch({ type: "SET_STEP", step });
  }

  async function reset() {
    dispatch({ type: "RESET" });
    await draftRepository.clearDraft();
  }

  return {
    step,
    session,
    state,
    updateSession,
    nextStep,
    prevStep,
    goToStep,
    reset,
  };
}

function ensureSessionDraft(draft: DiagnoseFlowState): DiagnoseFlowState {
  if (draft.session?.id) {
    return draft;
  }

  return {
    ...draft,
    session: {
      id: `diagnose-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      ...(draft.session ?? {}),
    },
  };
}
