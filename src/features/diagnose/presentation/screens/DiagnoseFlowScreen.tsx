import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import React from "react";
import { DiagnoseRepositoryImpl } from "../../data/repositories/DiagnoseRepositoryImpl";

import { DIAGNOSE_STEP_CONFIG } from "@/src/features/diagnose/presentation/components/steps/DIAGNOSE_STEP_CONFIG";
import { DiagnoseFlowView } from "../components/DiagnoseFlowView";
import { useDiagnoseFlow } from "../state/useDiagnoseFlow";

const draftRepo = new DiagnoseRepositoryImpl(); // DI super simplu pentru MVP

// const getBackgroundForStep = (step: DiagnoseStep) => {
//     switch (step) {
//         case DiagnoseStep.Dose:
//             return (
//                 <View className="flex-1 bg-[#F1E9DD]">
                    
//                 </View>
//             );
//         default:
//             return undefined;
//     }
// };

export function DiagnoseFlowScreen() {
    const {
        step,
        answers,
        updateAnswers,
        nextStep,
        prevStep,
        reset,
    } = useDiagnoseFlow({ draftRepository: draftRepo });

    // const background = getBackgroundForStep(step);
    const diagnoseStep = DIAGNOSE_STEP_CONFIG[step]

    return (
        <BaseScreen safeAreaBgColor={diagnoseStep.safeAreaColor} title={diagnoseStep.title}>
            <DiagnoseFlowView
                step={step}
                answers={answers}
                onUpdateAnswers={updateAnswers}
                onNext={nextStep}
                onBack={prevStep}
                onReset={reset}
            />
        </BaseScreen>
    );
}
