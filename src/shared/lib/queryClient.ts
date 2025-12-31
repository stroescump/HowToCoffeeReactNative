import { BrewDiagnoseSession } from "@/src/features/diagnose/domain/models/BrewDiagnoseSession";
import { BrewDiagnoseSessionSummary } from "@/src/features/diagnose/domain/models/BrewDiagnoseSessionDraft";
import { BrewDiagnosis } from "@/src/features/diagnose/domain/models/BrewDiagnosis";
import type { BrewSessionDetail } from "@/src/features/diagnose/domain/models/BrewSessionDetail";
import type {
    TastePreference,
    TastePreferenceUpdate,
    TasteProfileResponse,
} from "@/src/shared/domain/models/taste/tasteProfile";
import { getUserId } from "@/src/shared/domain/usecases/userIdUseCase";
import { http } from './httpClient';

// Types imported from your existing DTO folder:


export const queryClient = {
    async diagnoseShot(session: BrewDiagnoseSession): Promise<{ sessionId: string, brewDiagnosis: BrewDiagnosis }> {
        // Prefer an existing session id to avoid creating duplicate backend sessions.
        let sessionId = session.id;

        if (!sessionId) {
            const sessionSummary = await http<BrewDiagnoseSessionSummary>("/brew-sessions", {
                method: "POST",
                body: {
                    coffeeProductId: session.coffeeProductId,
                    coffeeDisplayName: session.coffeeDisplayName,
                    shopName: session.shopName,
                },
            });

            sessionId = sessionSummary.id ?? sessionSummary.sessionId;
            if (!sessionId) {
                throw new Error("Backend did not return a session id when creating the brew session");
            }
        }

        const brewDiagnosis = await http<BrewDiagnosis>(`/brew-sessions/${sessionId}/diagnose-shot`, {
            method: "POST",
            body: { ...session, id: sessionId },
        });

        return {
            sessionId,
            brewDiagnosis,
        };
    },

    markSessionSuccessful(sessionId: string): Promise<void> {
        return http(`/brew-sessions/${sessionId}/success`, {
            method: "POST"
        })
    },

    fetchBrewSessions(): Promise<BrewDiagnoseSessionSummary[]> {
        return http("/brew-sessions", { method: "GET" });
    },

    fetchBrewSessionById(sessionId: string): Promise<BrewSessionDetail> {
        return http(`/brew-sessions/${sessionId}`, { method: "GET" });
    },

    // Example placeholder for future coffee features:
    getCoffeeShops(): Promise<any[]> {
        return http('/coffee-shops', { method: 'GET' });
    },

    async getBrewProfileOverview(): Promise<TasteProfileResponse> {
        const userId = await getUserId();
        return http(`/brew-profile-overview?X-User-Id=${encodeURIComponent(userId)}`, { method: "GET" });
    },

    async getTastePreference(): Promise<TastePreference> {
        const userId = await getUserId();
        return http(`/taste-preference?X-User-Id=${encodeURIComponent(userId)}`, { method: "GET" });
    },

    async updateTastePreference(prefs: TastePreferenceUpdate): Promise<void> {
        const userId = await getUserId();
        await http(`/taste-preference?X-User-Id=${encodeURIComponent(userId)}`, {
            method: "POST",
            body: prefs,
        });
    },
};
