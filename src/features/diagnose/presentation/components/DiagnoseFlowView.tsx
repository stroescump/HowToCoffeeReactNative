// src/features/diagnose/presentation/components/DiagnoseFlowView.tsx
import React from "react";
import { Text } from "react-native";
import {
    DiagnoseAnswersDraft,
    isDiagnoseAnswersComplete
} from "../../domain/entities/DiagnoseAnswers";
import { CoffeeType } from "../../domain/valueObjects/CoffeeType";
import { DiagnoseStep } from "../../domain/valueObjects/DiagnoseStep";
import { CoffeeTypeStep } from "./steps/CoffeeTypeStep";
import { DoseStep } from "./steps/DoseStep";
import { ExtractionDuration } from "./steps/ExtractionDurationStep";

type DiagnoseFlowViewProps = {
    step: DiagnoseStep
    answers: DiagnoseAnswersDraft
    onUpdateAnswers: (patch: DiagnoseAnswersDraft) => void
    onNext: () => void
    onBack: () => void
    onReset: () => void
};

export function DiagnoseFlowView(props: DiagnoseFlowViewProps) {
    const { step, answers, onUpdateAnswers, onNext, onBack, onReset } = props

    const handleCoffeeTypeSubmit = (coffeeType: CoffeeType) => {
        onUpdateAnswers({ coffeeType })
        onNext()
    };

    const handleDoseSubmit = (doseGrams: number) => {
        onUpdateAnswers({ doseGrams })
        onNext()
    };

    const handleRestart = () => {
        onReset()
    };

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
                    hasScale={answers.hasScale}
                    onSubmit={handleDoseSubmit}
                    onBack={onBack}
                />
            );

        case DiagnoseStep.ExtractionDuration:
            return (
                <ExtractionDuration
                    extractionDuration={answers.extractionDuration}
                    hasScale={answers.hasScale}
                    onSubmit={handleDoseSubmit}
                    onBack={onBack}
                />
            );

        // case DiagnoseStep.Taste:
        //   return (
        //     <TasteStep
        //       tasteFeedback={answers.tasteFeedback}
        //       onSubmit={handleTasteSubmit}
        //       onBack={onBack}
        //     />
        //   );

        case DiagnoseStep.Recommendation:
            if (!isDiagnoseAnswersComplete(answers)) {
                return (
                    <Text>
                        Something went wrong – answers incomplete. Please restart diagnose.
                    </Text>
                );
            }

            // return (
            //   <RecommendationStep
            //     answers={answers} // aici TS știe că e DiagnoseAnswers
            //     onRestart={handleRestart}
            //   />
            // );

            return (
                <Text>
                    Recommendation step (TODO). All answers complete:{" "}
                    {JSON.stringify(answers, null, 2)}
                </Text>
            );

        default:
            return <Text>Unknown step</Text>;
    }
}