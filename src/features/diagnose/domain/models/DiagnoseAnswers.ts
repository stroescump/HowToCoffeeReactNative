import { CoffeeType } from './CoffeeType';
import { TasteFeedback } from "./TasteFeedback";


export interface DiagnoseAnswers {
    yield: number;
    origin: string;
    process: string;
    brewStyle: string;
    machineHasTempControl: boolean;
    grinderType: string;
    tasteDescription: string;
    experienceLevel: string;
    coffeeType: CoffeeType;
    doseGrams: number;
    hasScale: boolean;
    extractionDuration: number;
    tasteFeedback: TasteFeedback;
}

export type DiagnoseAnswersDraft = Partial<DiagnoseAnswers>

export function isDiagnoseAnswersComplete(
    draft: DiagnoseAnswersDraft
): draft is DiagnoseAnswers {
    return (
        draft.coffeeType !== undefined &&
        draft.doseGrams !== undefined &&
        draft.hasScale !== undefined &&
        draft.extractionDuration !== undefined &&
        draft.tasteFeedback !== undefined
    );
}