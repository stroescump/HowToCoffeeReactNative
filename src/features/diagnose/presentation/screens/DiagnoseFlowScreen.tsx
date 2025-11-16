import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import React from "react";
import { DiagnoseRepositoryImpl } from "../../data/repositories/DiagnoseRepositoryImpl";

import { DiagnoseStepConfigurator } from "@/src/features/diagnose/presentation/components/steps/utils/DiagnoseStepConfigurator";
import { PopupProvider } from "@/src/shared/ui/contextproviders/PopupContext";
import { DiagnoseFlowView } from "../components/DiagnoseFlowView";
import { useDiagnoseFlow } from "../state/useDiagnoseFlow";

const draftRepo = new DiagnoseRepositoryImpl(); // DI super simplu pentru MVP

export function DiagnoseFlowScreen() {
    const {
        step,
        answers,
        updateAnswers,
        nextStep,
        prevStep,
        reset,
    } = useDiagnoseFlow({ draftRepository: draftRepo });

    const diagnoseStep = DiagnoseStepConfigurator[step]

    return (
        <PopupProvider>
            <BaseScreen safeAreaBgColor={diagnoseStep.safeAreaColor} titleRes={diagnoseStep.titleRes}>
                <DiagnoseFlowView
                    step={step}
                    answers={answers}
                    onUpdateAnswers={updateAnswers}
                    onNext={nextStep}
                    onBack={prevStep}
                    onReset={reset}
                />
            </BaseScreen>
        </PopupProvider>
    );
}
