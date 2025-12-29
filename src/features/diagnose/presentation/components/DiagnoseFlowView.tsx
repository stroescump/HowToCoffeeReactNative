// src/features/diagnose/presentation/components/DiagnoseFlowView.tsx
import React from "react";
import { Text } from "react-native";
import { BrewDiagnoseSessionDraft } from "../../domain/models/BrewDiagnoseSessionDraft";
import { CoffeeRoast } from "../../domain/models/CoffeeRoast";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import { CoffeeRoastStep } from "./steps/CoffeeRoastStep";
import { DoseStep } from "./steps/DoseStep";
import { ExtractionDuration } from "./steps/ExtractionDurationStep";
import { RecommendationStep } from "./steps/RecommendationStep";
import { TasteFeedbackStep } from "./steps/TasteFeedback/TasteFeedbackStep";
import { TasteKind } from "./steps/TasteFeedback/substeps/TasteFeedbackSubpage";
import { YieldStep } from "./steps/YieldStep";

type DiagnoseFlowViewProps = {
    step: DiagnoseStep
    session: BrewDiagnoseSessionDraft
    onUpdateSession: (patch: BrewDiagnoseSessionDraft) => void
    onNext: () => void
    onGoToStep: (step: DiagnoseStep) => void
    onMarkSuccessful: () => Promise<void> | void
};

export function DiagnoseFlowView(props: DiagnoseFlowViewProps) {
    const { step, session, onUpdateSession, onNext, onGoToStep, onMarkSuccessful } = props

    const handleCoffeeRoastSubmit = (coffeeRoast: CoffeeRoast) => {
        onUpdateSession({ coffeeRoast })
        onNext()
    };

    const handleDoseSubmit = (doseGrams: number) => {
        onUpdateSession({ doseGrams })
        onNext()
    };

    const handleExtractionDurationSubmit = (extractionDuration: number) => {
        onUpdateSession({ brewTimeSeconds: extractionDuration })
        onNext()
    }

    const handleYieldGramsSubmit = (yieldGrams: number) => {
        onUpdateSession({ yieldGrams: yieldGrams })
        onNext()
    }

    const handleTasteFeedbackSubmit = (tasteFeedback: TasteKind) => {
        onUpdateSession({ tasteFeedback })
        onNext()
    }

    const handleOnSessionIdResolved = (sessionId: string) => {
        if (session.id === sessionId) return;
        onUpdateSession({ id: sessionId });
    };

    const handleApplyAdvice = () => {
        if (
            session.doseGrams !== undefined &&
            session.yieldGrams !== undefined &&
            session.brewTimeSeconds !== undefined
        ) {
            onUpdateSession({
                history: [
                    ...(session.history ?? []),
                    {
                        timestamp: Date.now(),
                        doseGrams: session.doseGrams,
                        yieldGrams: session.yieldGrams,
                        brewTimeSeconds: session.brewTimeSeconds,
                        temperatureCelsius: session.temperatureCelsius,
                    },
                ],
            });
        }
        onGoToStep(DiagnoseStep.Dose);
    };

    switch (step) {
        case DiagnoseStep.CoffeeRoast:
            return (
                <CoffeeRoastStep
                    value={session.coffeeRoast}
                    onSubmit={handleCoffeeRoastSubmit}
                />
            );

        case DiagnoseStep.Dose:
            return (
                <DoseStep
                    doseGrams={session.doseGrams}
                    onSubmit={handleDoseSubmit}
                />
            );

        case DiagnoseStep.ExtractionDuration:
            return (
                <ExtractionDuration
                    extractionDuration={session.brewTimeSeconds}
                    onSubmit={handleExtractionDurationSubmit}
                />
            );

        case DiagnoseStep.Yield:
            return (
                <YieldStep yieldGrams={session.yieldGrams}
                    onSubmit={handleYieldGramsSubmit}
                />
            );

        case DiagnoseStep.TasteFeedback: return (
            <TasteFeedbackStep
                onSubmit={handleTasteFeedbackSubmit}
                onMarkSuccessful={onMarkSuccessful}
                showEndBrewSession={(session.history?.length ?? 0) > 0} />
        );

        case DiagnoseStep.Recommendation:
            return (
                <RecommendationStep
                    session={session}
                    onUpdateSession={onUpdateSession}
                    onApplyAdvice={handleApplyAdvice}
                    onSessionIdResolved={handleOnSessionIdResolved}
                />
            );

        default:
            return <Text>Unknown step</Text>;
    }
}
