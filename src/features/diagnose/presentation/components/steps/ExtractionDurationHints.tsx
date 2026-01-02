import { StringRes } from "@/src/i18n/strings";
import { getHideExtractionDurationHint, setHideExtractionDurationHint } from "@/src/features/diagnose/data/datasources/DiagnosePrefsStorage";
import { USER_EXPERIENCE } from "@/src/shared/domain/tastePrefs";
import Popup from "@/src/shared/ui/components/Popup";
import { getTastePrefs } from "@/src/shared/services/tastePrefsStore";
import { Check, Info, X } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, View } from "react-native";

const R = StringRes.steps.extractionDuration;

export const ExtractionDurationHints = () => {
  const [showNoTimerPopup, setShowNoTimerPopup] = useState(false);
  const [hideNoTimerPopup, setHideNoTimerPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [showBeginnerHint, setShowBeginnerHint] = useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const shouldHide = await getHideExtractionDurationHint();
      if (cancelled) return;
      setHideNoTimerPopup(shouldHide);
      if (!shouldHide) {
        setDontShowAgain(false);
        setShowNoTimerPopup(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const prefs = await getTastePrefs();
      if (cancelled) return;
      if (prefs?.userExperience === USER_EXPERIENCE.BEGINNER) {
        setShowBeginnerHint(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const dismissNoTimerPopup = async () => {
    setShowNoTimerPopup(false);
    if (dontShowAgain !== hideNoTimerPopup) {
      await setHideExtractionDurationHint(dontShowAgain);
      setHideNoTimerPopup(dontShowAgain);
    }
  };

  if (!showNoTimerPopup && !showBeginnerHint) return null;

  return (
    <>
      {showNoTimerPopup && (
        <Modal
          transparent
          animationType="fade"
          visible={showNoTimerPopup}
          onRequestClose={() => {
            void dismissNoTimerPopup();
          }}
        >
          <View className="flex-1 justify-center items-center bg-[#010101]/50">
            <Popup
              popupTitle={t(R.popupNoTimerMessage)}
              popupButtonDescription={t(R.popupNoTimerButtonText)}
              onDismiss={() => {
                void dismissNoTimerPopup();
              }}
            >
              <Pressable
                className="flex-row items-center mb-4 self-start w-full"
                accessibilityRole="checkbox"
                accessibilityState={{ checked: dontShowAgain }}
                onPress={() => setDontShowAgain((prev) => !prev)}
              >
                <View
                  className={`w-6 h-6 rounded-md border-2 items-center justify-center ${dontShowAgain ? "bg-[#010101] border-[#010101]" : "border-[#010101]"}`}
                >
                  {dontShowAgain && <Check size={16} color="#FFFFFF" />}
                </View>
                <Text className="ms-3 text-base text-black/80">
                  {t(R.doNotShowAgain)}
                </Text>
              </Pressable>
            </Popup>
          </View>
        </Modal>
      )}
      {showBeginnerHint && (
        <View className="absolute top-3 left-4 right-4 z-10">
          <View
            className="bg-white rounded-2xl px-4 py-3 pr-10 relative"
            style={{ elevation: 6 }}
          >
            <Pressable
              className="absolute top-3 right-4"
              accessibilityLabel="Dismiss hint"
              hitSlop={8}
              onPress={() => setShowBeginnerHint(false)}
            >
              <X size={24} color="#010101" />
            </Pressable>
            <View className="flex-row items-center">
              <View className="items-center justify-center me-3">
                <Info size={24} color="#010101" />
              </View>
              <Text className="flex-1 text-base text-black">
                {t(R.beginnerHint)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
