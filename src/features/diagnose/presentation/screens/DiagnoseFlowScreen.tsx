import { StringRes } from "@/src/i18n/strings";
import { queryClient } from "@/src/shared/lib/queryClient";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { PopupProvider } from "@/src/shared/ui/contextproviders/PopupContext";
import { SafeAreaColorProvider } from "@/src/shared/ui/contextproviders/SafeAreaColorContext";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { draftRepo } from "../../data/repositories/DiagnoseRepositoryImpl";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import { DiagnoseFlowView } from "../components/DiagnoseFlowView";
import { useDiagnoseFlow } from "../hooks/useDiagnoseFlow";

export function DiagnoseFlowScreen() {
    const router = useRouter();
    const { t } = useTranslation();

    const {
        step,
        session,
        updateSession,
        nextStep,
        prevStep,
        goToStep,
        clearAndReset,
    } = useDiagnoseFlow({ draftRepository: draftRepo });

    const diagnoseStep = DiagnoseStepConfigurator[step];

    function handleBack() {
        if (step === DiagnoseStep.CoffeeType) {
            // suntem în primul step din flow → ieșim din flow
            void clearAndReset().finally(() => {
                router.back();
            });
            return;
        }

        // altfel → mergem un pas înapoi în flow
        prevStep();
    }

    const handleMarkSuccessful = async () => {
        try {
            if (session.id != null) {
                // Ensure the mutation finishes before leaving the screen;
                // navigation can unmount components and cancel in-flight requests.
                await queryClient.markSessionSuccessful(session.id);
            } else {
                console.warn("[DiagnoseFlow] Tried to mark successful but session.id is null");
            }
        } catch (e) {
            console.error("[DiagnoseFlow] Failed to mark session successful", e);
        }

        router.replace({
            pathname: "/diagnose/success",
        });
    };

    return (
        <PopupProvider>
            <SafeAreaColorProvider initialColor={diagnoseStep.safeAreaColor}>
                <BaseScreen
                    title={t(diagnoseStep.titleRes)}
                    onBack={handleBack}
                >
                    <DiagnoseFlowView
                        step={step}
                        session={session}
                        onUpdateSession={updateSession}
                        onNext={nextStep}
                        onGoToStep={goToStep}
                        onMarkSuccessful={handleMarkSuccessful}
                    />
                </BaseScreen>
            </SafeAreaColorProvider>
        </PopupProvider>
    );
}

const DiagnoseStepConfigurator: Record<
    DiagnoseStep,
    { titleRes: string; safeAreaColor: string }
> = {
    [DiagnoseStep.CoffeeType]: {
        titleRes: StringRes.steps.coffeeType.title,
        safeAreaColor: "#F1E9DD",
    },
    [DiagnoseStep.Dose]: {
        titleRes: StringRes.steps.dose.title,
        safeAreaColor: "#FC9401",
    },
    [DiagnoseStep.ExtractionDuration]: {
        titleRes: StringRes.steps.extractionDuration.title,
        safeAreaColor: "#FF5210",
    },
    [DiagnoseStep.Yield]: {
        titleRes: StringRes.steps.yield.title,
        safeAreaColor: "#FF5210",
    },
    /** TasteFeedback controls its own safeAreaColor via SafeAreaColorProvider because
     * we have 4 steps and each of them has a different color
     */
    [DiagnoseStep.TasteFeedback]: {
        titleRes: StringRes.steps.tasteFeedback.title,
        safeAreaColor: "#3B55FF"
    },
    [DiagnoseStep.Recommendation]: {
        titleRes: StringRes.steps.recommendation.title,
        safeAreaColor: "#FF5210",
    },
};
