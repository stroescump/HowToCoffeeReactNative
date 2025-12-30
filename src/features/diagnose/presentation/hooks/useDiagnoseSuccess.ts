import { StringRes } from "@/src/i18n/strings";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { DiagnoseRepository } from "../../domain/repositories/DiagnoseRepository";
import { saveRecipeFromSession } from "../../domain/usecases/SaveRecipeFromDiagnoseFlow";
import { useDiagnoseFlow } from "./useDiagnoseFlow";

type LeaveDestination = "home" | "agenda";

interface UseDiagnoseSuccessDeps {
  draftRepository: DiagnoseRepository;
}

export function useDiagnoseSuccess({
  draftRepository,
}: UseDiagnoseSuccessDeps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { session, state, clearAndReset } = useDiagnoseFlow({ draftRepository });

  const [coffeeName, setCoffeeName] = useState(session.coffeeDisplayName ?? "");
  const [grindSetting, setGrindSetting] = useState(session.grindSetting ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<LeaveDestination | null>(null);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [errorModal, setErrorModal] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });

  const showError = useCallback((message: string) => {
    setErrorModal({ visible: true, message });
  }, []);

  const dismissError = useCallback(() => {
    setErrorModal({ visible: false, message: "" });
  }, []);

  const requestLeave = useCallback(
    (destination: LeaveDestination) => {
      if (!hasSaved) {
        setPendingNavigation(destination);
        setShowLeaveWarning(true);
        return;
      }
      router.replace(destination === "home" ? "/" : "/recipeagenda");
    },
    [hasSaved, router],
  );

  const confirmLeave = useCallback(async () => {
    setShowLeaveWarning(false);
    const destination = pendingNavigation ?? "home";
    setPendingNavigation(null);
    await finalizeSession("discarded");
    await clearAndReset();
    router.replace(destination === "home" ? "/" : "/recipeagenda");
  }, [clearAndReset, finalizeSession, pendingNavigation, router]);

  const dismissLeaveWarning = useCallback(() => {
    setShowLeaveWarning(false);
    setPendingNavigation(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (isSaving) return;
    if (!coffeeName.trim()) {
      showError("Please enter a coffee name before saving.");
      return;
    }

    setIsSaving(true);
    try {
      await saveRecipeFromSession({
        ...session,
        coffeeDisplayName: coffeeName.trim(),
        grindSetting,
      });
      await finalizeSession("saved");
      setHasSaved(true);
      await clearAndReset();
      router.replace("/recipeagenda");
    } catch (err: any) {
      showError(err?.message ?? t(StringRes.buttonDefaultError));
    } finally {
      setIsSaving(false);
    }
  }, [clearAndReset, coffeeName, finalizeSession, grindSetting, isSaving, router, session, showError, t]);

  const finalizeSession = useCallback(
    async (reason: "saved" | "discarded") => {
      const persisted = await draftRepository.loadDraft();
      const baseState = persisted ?? state;
      const normalizedName = coffeeName.trim();
      const sessionId = baseState.session.id ?? state.session.id;
      const archivedState = {
        ...baseState,
        session: {
          ...baseState.session,
          id: sessionId,
          coffeeDisplayName: normalizedName || baseState.session.coffeeDisplayName,
          grindSetting: grindSetting || baseState.session.grindSetting,
        },
      };

      await draftRepository.appendArchive({
        state: archivedState,
        reason,
        finalizedAtMillis: Date.now(),
      });

      if (sessionId) {
        await draftRepository.addFinalizedSessionId(sessionId);
      }
    },
    [coffeeName, draftRepository, grindSetting, state],
  );

  const uiState = {
    session,
    coffeeName,
    grindSetting,
    isSaving,
    showLeaveWarning,
    errorModal,
  };

  const actions = {
    setCoffeeName,
    setGrindSetting,
    handleSave,
    requestLeave,
    confirmLeave,
    dismissLeaveWarning,
    dismissError,
  };

  return { uiState, actions };
}
