import { http } from './httpClient';
import {BrewDiagnosis} from "@/src/features/diagnose/domain/entities/BrewDiagnosis";
import {DiagnoseAnswers} from "@/src/features/diagnose/domain/entities/DiagnoseAnswers";

// Types imported from your existing DTO folder:


export const queryClient = {
    diagnoseShot(input: DiagnoseAnswers): Promise<BrewDiagnosis> {
        return http<BrewDiagnosis>('/diagnose/espresso', {
            method: 'POST',
            body: input,
        });
    },

    // Example placeholder for future coffee features:
    getCoffeeShops(): Promise<any[]> {
        return http('/coffee-shops', { method: 'GET' });
    },

    getUserTasteProfile(): Promise<any> {
        return http('/profile/taste', { method: 'GET' });
    },
};