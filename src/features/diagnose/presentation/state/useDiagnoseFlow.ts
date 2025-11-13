import { useEffect, useState } from "react";
import type { DiagnoseAnswers } from "../../domain/entities/DiagnoseAnswers";
import type { DiagnoseFlowState } from "../../domain/entities/DiagnoseFlowState";
import { INITIAL_DIAGNOSE_STATE } from "../../domain/entities/DiagnoseFlowState";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import { getNextStep } from "../../domain/usecases/GetNextStep";
import { getPreviousStep } from "../../domain/usecases/GetPreviousStep";

interface UseDiagnoseFlowDeps {
    draftRepository: DiagnoseRepository;
}

export function useDiagnoseFlow({ draftRepository }: UseDiagnoseFlowDeps) {
    const [state, setState] = useState<DiagnoseFlowState>(INITIAL_DIAGNOSE_STATE);
    const { step, answers } = state;

    useEffect(() => {
        (async () => {
            const draft = await draftRepository.loadDraft();
            if (draft) setState(draft);
        })();
    }, [draftRepository]);

    useEffect(() => {
        draftRepository.saveDraft(state).catch(() => { });
    }, [state, draftRepository]);

    function updateAnswers(patch: Partial<DiagnoseAnswers>) {
        setState((prev) => ({
            ...prev,
            answers: { ...prev.answers, ...patch },
        }));
    }

    function nextStep() {
        setState((prev) => ({
            ...prev,
            step: getNextStep(prev.step, prev.answers),
        }));
    }

    function prevStep() {
        setState((prev) => ({
            ...prev,
            step: getPreviousStep(prev.step, prev.answers),
        }));
    }

    async function reset() {
        setState(INITIAL_DIAGNOSE_STATE);
        await draftRepository.clearDraft();
    }

    return {
        step,
        answers,
        updateAnswers,
        nextStep,
        prevStep,
        reset,
    };
}