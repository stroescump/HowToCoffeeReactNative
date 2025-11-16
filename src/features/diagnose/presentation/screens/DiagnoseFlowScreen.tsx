import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { PopupProvider } from "@/src/shared/ui/contextproviders/PopupContext";
import React from "react";
import { DiagnoseRepositoryImpl } from "../../data/repositories/DiagnoseRepositoryImpl";
import { DiagnoseStep } from "../../domain/valueObjects/DiagnoseStep";
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

const DiagnoseStepConfigurator: Record<DiagnoseStep, { titleRes: string; safeAreaColor?: string; }> = {
    [DiagnoseStep.CoffeeType]: {
        titleRes: "steps.coffeeType.title",
        safeAreaColor: "#F1E9DD",
    },
    [DiagnoseStep.Dose]: {
        titleRes: "steps.dose.title",
        safeAreaColor: "#FC9401",
    },
    [DiagnoseStep.ExtractionDuration]: {
        titleRes: "steps.extractionDuration.title",
        safeAreaColor: "#FF5210"
    },
    [DiagnoseStep.TasteFeedback]: {
        titleRes: "steps.tasteFeedback.title",
    },
    [DiagnoseStep.Recommendation]: {
        titleRes: "steps.recommendation.title",
    },
};
