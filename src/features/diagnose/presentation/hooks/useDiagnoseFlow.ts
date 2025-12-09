import { BrewMethod } from "@/src/shared/domain/models/BrewMethod";
import { useEffect, useReducer, useState } from "react";
import { BrewDiagnoseSessionDraft } from "../../domain/models/BrewDiagnoseSessionDraft";
import {
  createInitialDiagnoseState,
  DiagnoseFlowState,
} from "../../domain/models/DiagnoseFlowState";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
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

  function updateSession(patch: BrewDiagnoseSessionDraft) {
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
  return {
    ...draft,
    session: {
      ...(draft.session ?? {}),
      brewMethod: draft.session?.brewMethod ?? BrewMethod.ESPRESSO,
    },
  };
}
