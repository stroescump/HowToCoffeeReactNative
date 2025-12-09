import { BrewDiagnoseSessionDraft } from './BrewDiagnoseSessionDraft';
import { DiagnoseStep } from './DiagnoseStep';

export interface DiagnoseFlowState {
    step: DiagnoseStep;
    session: BrewDiagnoseSessionDraft;
}

export function createInitialDiagnoseState(): DiagnoseFlowState {
    return {
        step: DiagnoseStep.CoffeeType,
        session: {},
    };
}
