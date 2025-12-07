import { StringRes } from "@/src/i18n/strings";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { PopupProvider } from "@/src/shared/ui/contextproviders/PopupContext";
import { SafeAreaColorProvider } from "@/src/shared/ui/contextproviders/SafeAreaColorContext";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { DiagnoseRepositoryImpl } from "../../data/repositories/DiagnoseRepositoryImpl";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import { saveRecipeFromSession } from "../../domain/usecases/SaveRecipeFromDiagnoseFlow";
import { DiagnoseFlowView } from "../components/DiagnoseFlowView";
import { useDiagnoseFlow } from "../hooks/useDiagnoseFlow";

const draftRepo = new DiagnoseRepositoryImpl(); // DI super simplu pentru MVP

export function DiagnoseFlowScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [isSaving, setIsSaving] = useState(false);

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
        if (isSaving) return;
        setIsSaving(true);
        try {
            await saveRecipeFromSession(sessionForSaving);
            await reset();
            router.replace("/diagnose/success");
        } catch (err: any) {
            Alert.alert(
                t(StringRes.titleDefaultError),
                err?.message ?? t(StringRes.buttonDefaultError),
            );
        } finally {
            setIsSaving(false);
        }
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
