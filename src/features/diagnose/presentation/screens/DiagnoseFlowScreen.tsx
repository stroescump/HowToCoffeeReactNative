import { StringRes } from "@/src/i18n/strings";
import { queryClient } from "@/src/shared/lib/queryClient";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { PopupProvider } from "@/src/shared/ui/contextproviders/PopupContext";
import { SafeAreaColorProvider } from "@/src/shared/ui/contextproviders/SafeAreaColorContext";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
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
        reset,
    } = useDiagnoseFlow({ draftRepository: draftRepo });

    const diagnoseStep = DiagnoseStepConfigurator[step];

    function handleBack() {
        if (step === DiagnoseStep.CoffeeType) {
            // suntem în primul step din flow → ieșim din flow
            draftRepo.clearDraft();
            router.back();
            return;
        }

        // altfel → mergem un pas înapoi în flow
        prevStep();
    }

    const sessionForSaving = useMemo(() => {
        return {
            ...session,
            doseGrams: session.doseGrams,
            brewTimeSeconds: session.brewTimeSeconds,
            yieldGrams: session.yieldGrams,
        };
    }, [session]);

    const handleMarkSuccessful = async () => {
        if (session.id != null) {
            queryClient.markSessionSuccessful(session.id)
        }

        router.replace({
            pathname: "/diagnose/success",
        });
    }

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
