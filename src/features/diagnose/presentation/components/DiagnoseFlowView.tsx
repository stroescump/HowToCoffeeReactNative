// src/features/diagnose/presentation/components/DiagnoseFlowView.tsx
import React from "react";
import { Text } from "react-native";
import {
    DiagnoseAnswersDraft
} from "../../domain/entities/DiagnoseAnswers";
import { CoffeeType } from "../../domain/valueObjects/CoffeeType";
import { DiagnoseStep } from "../../domain/valueObjects/DiagnoseStep";
import { CoffeeTypeStep } from "./steps/CoffeeTypeStep";
import { DoseStep } from "./steps/DoseStep";
import { ExtractionDuration } from "./steps/ExtractionDurationStep";
import { RecommendationStep } from "./steps/RecommendationStep";
import { TasteFeedbackStep } from "./steps/TasteFeedback/TasteFeedbackStep";
import { TasteKind } from "./steps/TasteFeedback/substeps/TasteFeedbackSubpage";

type DiagnoseFlowViewProps = {
    step: DiagnoseStep
    answers: DiagnoseAnswersDraft
    onUpdateAnswers: (patch: DiagnoseAnswersDraft) => void
    onNext: () => void
};

export function DiagnoseFlowView(props: DiagnoseFlowViewProps) {
    const { step, answers, onUpdateAnswers, onNext } = props

    const handleCoffeeTypeSubmit = (coffeeType: CoffeeType) => {
        onUpdateAnswers({ coffeeType })
        onNext()
    };

    const handleDoseSubmit = (doseGrams: number) => {
        onUpdateAnswers({ doseGrams })
        onNext()
    };

    const handleExtractionDurationSubmit = (extractionDuration: number) => {
        onUpdateAnswers({ extractionDuration })
        onNext()
    }

    const handleTasteFeedbackSubmit = (tasteFeedback: TasteKind) => {
        onUpdateAnswers({ tasteFeedback })
        onNext()
    }

    switch (step) {
        case DiagnoseStep.CoffeeType:
            return (
                <CoffeeTypeStep
                    value={answers.coffeeType}
                    onSubmit={handleCoffeeTypeSubmit}
                />
            );

        case DiagnoseStep.Dose:
            return (
                <DoseStep
                    doseGrams={answers.doseGrams}
                    onSubmit={handleDoseSubmit}
                />
            );

        case DiagnoseStep.ExtractionDuration:
            return (
                <ExtractionDuration
                    extractionDuration={answers.extractionDuration}
                    onSubmit={handleExtractionDurationSubmit}
                />
            );

        case DiagnoseStep.TasteFeedback:
            return (
                <TasteFeedbackStep
                    onSubmit={handleTasteFeedbackSubmit}
                />
            );

        case DiagnoseStep.Recommendation:
            // TODO: Handle case where diagnose is incomplete
            // if (!isDiagnoseAnswersComplete(answers)) {
            //     return (
            //         <Text>
            //             Something went wrong – answers incomplete. Please restart diagnose.
            //         </Text>
            //     );
            // }

            return (
                <RecommendationStep answers={answers} />
            );

        default:
            return <Text>Unknown step</Text>;
    }
}