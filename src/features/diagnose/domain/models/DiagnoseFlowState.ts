import { DiagnoseStep } from './DiagnoseStep';
import { BrewDiagnoseSession } from './BrewDiagnoseSession';

export type BrewDiagnoseSessionDraft = Partial<BrewDiagnoseSession> & { id: string };

export interface DiagnoseFlowState {
    step: DiagnoseStep;
    session: BrewDiagnoseSessionDraft;
}

export function createInitialDiagnoseState(): DiagnoseFlowState {
    return {
        step: DiagnoseStep.CoffeeType,
        session: {
            id: generateDiagnoseSessionId(),
        },
    };
}

function generateDiagnoseSessionId() {
    return `diagnose-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const INITIAL_DIAGNOSE_STATE: DiagnoseFlowState = createInitialDiagnoseState();
