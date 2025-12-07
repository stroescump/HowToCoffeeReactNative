import { BrewDiagnoseSession, BrewDiagnoseSessionSummary } from "@/src/features/diagnose/domain/models/BrewDiagnoseSession";
import { BrewDiagnosis } from "@/src/features/diagnose/domain/models/BrewDiagnosis";
import { http } from './httpClient';

// Types imported from your existing DTO folder:


export const queryClient = {
    async diagnoseShot(input: BrewDiagnoseSession): Promise<BrewDiagnosis> {
        const sessionSummary = await http<BrewDiagnoseSessionSummary>('/brew-sessions', {
            method: 'POST',
            body: input,
        });
        const sessionId = sessionSummary.id
        const brewDiagnosis = await http<BrewDiagnosis>(`/brew-sessions/${sessionId}/diagnose-shot`, {
            method: "POST",
            body: input
        })
        return brewDiagnosis
    },

    // Example placeholder for future coffee features:
    getCoffeeShops(): Promise<any[]> {
        return http('/coffee-shops', { method: 'GET' });
    },

    getUserTasteProfile(): Promise<any> {
        return http('/profile/taste', { method: 'GET' });
    },
};
