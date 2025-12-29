import { BrewMethod } from "@/src/shared/domain/models/BrewMethod";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrewDiagnoseSessionDraft } from "../../domain/models/BrewDiagnoseSessionDraft";
import {
  createInitialDiagnoseState,
  DiagnoseFlowState,
  DiagnoseResumeTarget,
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
        case "CLEAR_DRAFT":
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
      const nextStateWithMeta = applyMetadata(nextState, event);
      stateRef.current = nextStateWithMeta;
      setState(nextStateWithMeta);
      await persistByEvent(event, nextStateWithMeta);
      return nextStateWithMeta;
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

  const setResumeTarget = useCallback(
    (target: DiagnoseResumeTarget) => dispatchEvent({ type: "SET_RESUME_TARGET", target }),
    [dispatchEvent],
  );

  const clearAndReset = useCallback(
    async () => {
      await dispatchEvent({ type: "CLEAR_DRAFT" });
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
    setResumeTarget,
    clearAndReset,
    dispatchEvent,
  };
}

function ensureSessionDraft(draft: DiagnoseFlowState): DiagnoseFlowState {
  const resumeTarget: DiagnoseResumeTarget = draft.session?.markedAsSuccessful ? "success" : "flow";
  return {
    ...draft,
    session: {
      ...(draft.session ?? {}),
      brewMethod: draft.session?.brewMethod ?? BrewMethod.ESPRESSO,
    },
    createdAtMillis: draft.createdAtMillis ?? Date.now(),
    updatedAtMillis: draft.updatedAtMillis ?? Date.now(),
    resumeTarget: draft.resumeTarget ?? resumeTarget,
  };
}

function applyMetadata(state: DiagnoseFlowState, event: DiagnoseEvent): DiagnoseFlowState {
  if (event.type === "HYDRATE") return state;

  const now = Date.now();
  const createdAtMillis =
    event.type === "RESET" || !state.createdAtMillis ? now : state.createdAtMillis;
  const updatedAtMillis =
    event.type === "CLEAR_DRAFT" ? state.updatedAtMillis : now;
  const resumeTarget: DiagnoseResumeTarget =
    state.resumeTarget ?? (state.session?.markedAsSuccessful ? "success" : "flow");

  return {
    ...state,
    createdAtMillis,
    updatedAtMillis,
    resumeTarget,
  };
}
