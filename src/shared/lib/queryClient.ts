import { BrewDiagnoseSession } from "@/src/features/diagnose/domain/models/BrewDiagnoseSession";
import { BrewDiagnoseSessionSummary } from "@/src/features/diagnose/domain/models/BrewDiagnoseSessionDraft";
import { BrewDiagnosis } from "@/src/features/diagnose/domain/models/BrewDiagnosis";
import { http } from './httpClient';

// Types imported from your existing DTO folder:


export const queryClient = {
    async diagnoseShot(session: BrewDiagnoseSession): Promise<{ sessionId: string, brewDiagnosis: BrewDiagnosis }> {
        let sessionId = session.id; // assuming this is the backend session id
        console.log("Initial sessionId:" + sessionId)
        if (!sessionId) {
            const sessionSummary = await http<BrewDiagnoseSessionSummary>("/brew-sessions", {
                method: "POST",
                body: {
                    coffeeProductId: session.coffeeProductId,
                    coffeeDisplayName: session.coffeeDisplayName,
                    shopName: session.shopName,
                },
            });
            sessionId = sessionSummary.id;
            // caller MUST persist this id back into its BrewDiagnoseSession state
        }
        console.log("Updated sessionId:" + sessionId)
        const brewDiagnosis = await http<BrewDiagnosis>(`/brew-sessions/${sessionId}/diagnose-shot`, {
            method: "POST",
            body: session
        })
        return {
            sessionId,
            brewDiagnosis
        }
    },

    markSessionSuccessful(sessionId: string): Promise<void> {
        return http(`/brew-sessions/${sessionId}/success`, {
            method: "POST"
        })
    },

    // Example placeholder for future coffee features:
    getCoffeeShops(): Promise<any[]> {
        return http('/coffee-shops', { method: 'GET' });
    },

    getUserTasteProfile(): Promise<any> {
        return http('/profile/taste', { method: 'GET' });
    },
};
