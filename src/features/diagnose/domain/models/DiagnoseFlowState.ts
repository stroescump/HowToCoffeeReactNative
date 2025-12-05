import { DiagnoseAnswersDraft } from './DiagnoseAnswers';
import { DiagnoseStep } from './DiagnoseStep';


export interface DiagnoseFlowState {
    step: DiagnoseStep;
    answers: DiagnoseAnswersDraft;
}

export const INITIAL_DIAGNOSE_STATE: DiagnoseFlowState = {
    step: DiagnoseStep.CoffeeType,
    answers: {}
}
