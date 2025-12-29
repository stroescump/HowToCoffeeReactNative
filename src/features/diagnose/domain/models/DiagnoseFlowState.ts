import { BrewMethod } from "@/src/shared/domain/models/BrewMethod";
import { BrewDiagnoseSessionDraft } from "./BrewDiagnoseSessionDraft";
import { DiagnoseStep } from "./DiagnoseStep";

export type DiagnoseResumeTarget = "flow" | "success";

export interface DiagnoseFlowState {
    step: DiagnoseStep;
    session: BrewDiagnoseSessionDraft;
    createdAtMillis: number;
    updatedAtMillis: number;
    resumeTarget: DiagnoseResumeTarget;
}

export function createInitialDiagnoseState(): DiagnoseFlowState {
    const now = Date.now();
    return {
        step: DiagnoseStep.CoffeeRoast,
        session: {
            brewMethod: BrewMethod.ESPRESSO,
        },
        createdAtMillis: now,
        updatedAtMillis: now,
        resumeTarget: "flow",
    };
}
