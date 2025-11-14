import { DiagnoseStep } from '../valueObjects/DiagnoseStep';
import { DiagnoseAnswersDraft } from './DiagnoseAnswers';


export interface DiagnoseFlowState {
    step: DiagnoseStep;
    answers: DiagnoseAnswersDraft;
}

export const INITIAL_DIAGNOSE_STATE: DiagnoseFlowState = {
    step: DiagnoseStep.CoffeeType,
    answers: {}
}
