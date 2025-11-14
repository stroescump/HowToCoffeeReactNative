import { CoffeeType } from '../valueObjects/CoffeeType';
import { TasteFeedback } from "../valueObjects/TasteFeedback";


export interface DiagnoseAnswers {
    coffeeType?: CoffeeType;
    doseGrams?: number;
    hasScale?: boolean;
    extractionDuration?: number;
    tasteFeedback?: TasteFeedback;
}

export type DiagnoseAnswersDraft = Partial<DiagnoseAnswers>
