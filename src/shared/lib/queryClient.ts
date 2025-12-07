import { BrewDiagnosis } from "@/src/features/diagnose/domain/models/BrewDiagnosis";
import { BrewDiagnoseSession } from "@/src/features/diagnose/domain/models/BrewDiagnoseSession";
import { http } from './httpClient';

// Types imported from your existing DTO folder:


export const queryClient = {
    diagnoseShot(input: BrewDiagnoseSession): Promise<BrewDiagnosis> {
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
