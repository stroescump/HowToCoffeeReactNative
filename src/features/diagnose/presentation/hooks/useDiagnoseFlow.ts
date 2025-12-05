import { useEffect, useReducer, useState } from "react";
import type { DiagnoseAnswersDraft } from "../../domain/models/DiagnoseAnswers";
import { INITIAL_DIAGNOSE_STATE } from "../../domain/models/DiagnoseFlowState";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import { diagnoseReducer } from '../state/diagnoseBrewReducer';

interface UseDiagnoseFlowDeps {
    draftRepository: DiagnoseRepository;
}

export function useDiagnoseFlow({ draftRepository }: UseDiagnoseFlowDeps) {
    const [state, dispatch] = useReducer(diagnoseReducer, INITIAL_DIAGNOSE_STATE);
    const { step, answers } = state;

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        (async () => {
            const draft = await draftRepository.loadDraft();
            if (draft) {
                dispatch({ type: "RESET" }); // optional
                // sau direct setState(draft) dacă ții un setState extern
            }
            setHydrated(true);
        })();
    }, [draftRepository]);

    useEffect(() => {
        if (!hydrated) return;
        draftRepository.saveDraft(state).catch(() => { });
    }, [state, hydrated, draftRepository]);

    function updateAnswers(patch: Partial<DiagnoseAnswersDraft>) {
        dispatch({ type: "UPDATE_ANSWERS", patch });
    }

    function nextStep() {
        dispatch({ type: "NEXT_STEP" });
    }

    function prevStep() {
        dispatch({ type: "PREV_STEP" });
    }

    async function reset() {
        dispatch({ type: "RESET" });
        await draftRepository.clearDraft();
    }

    return {
        step,
        answers,
        state,
        updateAnswers,
        nextStep,
        prevStep,
        reset,
    };
}