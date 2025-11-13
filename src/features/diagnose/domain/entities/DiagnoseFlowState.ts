import { DiagnoseStep } from '../valueObjects/DiagnoseStep';
import { DiagnoseAnswers } from './DiagnoseAnswers';


export interface DiagnoseFlowState {
    step: DiagnoseStep;
    answers: DiagnoseAnswers;
}
export const INITIAL_DIAGNOSE_STATE: DiagnoseFlowState = {
    step: DiagnoseStep.CoffeeType,
    answers: {},
};
