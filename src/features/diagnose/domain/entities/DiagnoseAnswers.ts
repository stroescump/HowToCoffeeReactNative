import { CoffeeType } from '../valueObjects/CoffeeType';
import { TasteFeedback } from "../valueObjects/TasteFeedback";


export interface DiagnoseAnswers {
    coffeeType?: CoffeeType;
    doseGrams?: number | null;
    hasScale?: boolean;
    extractionDuration?: number | null;
    tasteFeedback?: TasteFeedback;
}
