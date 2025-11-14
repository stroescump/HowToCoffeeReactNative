import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import React from "react";
import { Text } from "react-native";
import { DiagnoseRepositoryImpl } from "../../data/repositories/DiagnoseRepositoryImpl";
import { DiagnoseStep } from "../../domain/valueObjects/DiagnoseStep";
import { CoffeeTypeStep } from "../components/steps/CoffeeTypeStep";
import { DoseStep } from "../components/steps/DoseStep";
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

    return (
        <BaseScreen>
            {step === DiagnoseStep.CoffeeType && (
                <CoffeeTypeStep
                    value={answers.coffeeType}
                    onSubmit={(coffeeType) => {
                        updateAnswers({ coffeeType });
                        nextStep();
                    }}
                />
            )}

            {step === DiagnoseStep.Dose && (
                <DoseStep
                    doseGrams={answers.doseGrams}
                    hasScale={answers.hasScale}
                    onSubmit={(doseGrams, hasScale) => {
                        updateAnswers({ doseGrams, hasScale });
                        nextStep();
                    }}
                    onBack={prevStep}
                />
            )}
            {/* Time, Taste, Recommendation la fel */}
            <Text>You've reached Brew Diagnoseee</Text>
        </BaseScreen>
    );
}