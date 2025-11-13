import React from "react";
import { View } from "react-native";
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
        <View className="flex-1 bg-blue-700 px-6 pt-14 pb-6">
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
                    hasScale={answers.hasScale ?? true}
                    onSubmit={(doseGrams, hasScale) => {
                        updateAnswers({ doseGrams, hasScale });
                        nextStep();
                    }}
                    onBack={prevStep}
                />
            )}

            {/* Time, Taste, Recommendation la fel */}
        </View>
    );
}