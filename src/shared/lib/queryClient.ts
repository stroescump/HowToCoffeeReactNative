import { BrewDiagnosis } from "@/src/features/diagnose/domain/models/BrewDiagnosis";
import { DiagnoseAnswers } from "@/src/features/diagnose/domain/models/DiagnoseAnswers";
import { http } from './httpClient';

// Types imported from your existing DTO folder:


export const queryClient = {
    diagnoseShot(input: DiagnoseAnswers): Promise<BrewDiagnosis> {
        return http<BrewDiagnosis>('/diagnose/brew', {
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