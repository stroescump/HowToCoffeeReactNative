import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { PopupProvider } from "@/src/shared/ui/contextproviders/PopupContext";
import { useRouter } from "expo-router";
import React from "react";
import { DiagnoseRepositoryImpl } from "../../data/repositories/DiagnoseRepositoryImpl";
import { DiagnoseStep } from "../../domain/valueObjects/DiagnoseStep";
import { DiagnoseFlowView } from "../components/DiagnoseFlowView";
import { useDiagnoseFlow } from "../state/useDiagnoseFlow";

const draftRepo = new DiagnoseRepositoryImpl(); // DI super simplu pentru MVP

export function DiagnoseFlowScreen() {
    const router = useRouter();

    const {
        step,
        answers,
        updateAnswers,
        nextStep,
        prevStep,
    } = useDiagnoseFlow({ draftRepository: draftRepo });

    const diagnoseStep = DiagnoseStepConfigurator[step];

    function handleBack() {
        if (step === DiagnoseStep.CoffeeType) {
            // suntem în primul step din flow → ieșim din flow
            router.back();
            return;
        }

        // altfel → mergem un pas înapoi în flow
        prevStep();
    }

    return (
        <PopupProvider>
            <BaseScreen
                safeAreaBgColor={diagnoseStep.safeAreaColor}
                titleRes={diagnoseStep.titleRes}
                onBack={handleBack}
            >
                <DiagnoseFlowView
                    step={step}
                    answers={answers}
                    onUpdateAnswers={updateAnswers}
                    onNext={nextStep}
                />
            </BaseScreen>
        </PopupProvider>
    );
}

const DiagnoseStepConfigurator: Record<
    DiagnoseStep,
    { titleRes: string; safeAreaColor?: string }
> = {
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
        safeAreaColor: "#FF5210",
    },
    [DiagnoseStep.TasteFeedback]: {
        titleRes: "steps.tasteFeedback.title",
    },
    [DiagnoseStep.Recommendation]: {
        titleRes: "steps.recommendation.title",
    },
};