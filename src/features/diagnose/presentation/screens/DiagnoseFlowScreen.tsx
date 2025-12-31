import { StringRes } from "@/src/i18n/strings";
import { queryClient } from "@/src/shared/lib/queryClient";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { PopupProvider } from "@/src/shared/ui/contextproviders/PopupContext";
import { SafeAreaColorProvider } from "@/src/shared/ui/contextproviders/SafeAreaColorContext";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, View } from "react-native";
import { draftRepo } from "../../data/repositories/DiagnoseRepositoryImpl";
import { DiagnoseStep } from "../../domain/models/DiagnoseStep";
import { DiagnoseFlowView } from "../components/DiagnoseFlowView";
import { useDiagnoseFlow } from "../hooks/useDiagnoseFlow";

export function DiagnoseFlowScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [showLeaveWarning, setShowLeaveWarning] = React.useState(false);

    const {
        step,
        session,
        state,
        updateSession,
        nextStep,
        prevStep,
        goToStep,
        clearAndReset,
        setResumeTarget,
    } = useDiagnoseFlow({ draftRepository: draftRepo });

    const diagnoseStep = DiagnoseStepConfigurator[step];

    function handleBack() {
        if (step === DiagnoseStep.CoffeeRoast) {
            setShowLeaveWarning(true);
            return;
        }

        // altfel → mergem un pas înapoi în flow
        prevStep();
    }

    const hasProgressToArchive =
        Boolean(session.id) ||
        Boolean(session.lastDiagnosis) ||
        (session.history?.length ?? 0) > 0;

    const discardAndExit = async () => {
        if (hasProgressToArchive) {
            await draftRepo.appendArchive({
                state,
                reason: "discarded",
                finalizedAtMillis: Date.now(),
            });
            if (session.id) {
                await draftRepo.addFinalizedSessionId(session.id);
            }
        }

        await clearAndReset();
        router.back();
    };

    const handleMarkSuccessful = async () => {
        await updateSession({ markedAsSuccessful: true });
        await setResumeTarget("success");
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
                    showHeader={true}
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
            {showLeaveWarning && (
                <Modal
                    transparent
                    animationType="fade"
                    visible={showLeaveWarning}
                    onRequestClose={() => setShowLeaveWarning(false)}
                >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View
                            className="bg-white rounded-3xl p-6 w-11/12"
                            style={{
                                shadowColor: "#000",
                                shadowOpacity: 0.15,
                                shadowOffset: { width: 0, height: 8 },
                                shadowRadius: 20,
                                elevation: 8,
                            }}
                        >
                            <Text className="text-3xl font-[InterBold] mb-3 text-black">
                                {t(StringRes.popupDetails.areYouSure)}
                            </Text>
                            <Text className="text-xl leading-6 text-black/80 mb-4">
                                You can leave now without saving. No shot has been brewed yet.
                            </Text>
                            <View className="gap-3">
                                <Button
                                    text="Leave diagnose"
                                    onPress={() => {
                                        setShowLeaveWarning(false);
                                        void discardAndExit();
                                    }}
                                />
                                <Button
                                    variant="ghost"
                                    text="Stay"
                                    onPress={() => setShowLeaveWarning(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </PopupProvider>
    );
}

const DiagnoseStepConfigurator: Record<
    DiagnoseStep,
    { titleRes: string; safeAreaColor: string }
> = {
    [DiagnoseStep.CoffeeRoast]: {
        titleRes: StringRes.steps.coffeeRoast.title,
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
