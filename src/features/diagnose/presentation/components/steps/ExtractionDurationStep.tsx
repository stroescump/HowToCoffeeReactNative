import { StringRes } from "@/src/i18n/strings";
import Button from "@/src/shared/ui/components/buttons/Button";
import { Spinner } from "@/src/shared/ui/components/features/diagnose/dosageSpinner/Spinner";
import Popup from "@/src/shared/ui/components/Popup";
import { usePopup } from "@/src/shared/ui/contextproviders/PopupContext";
import { getHideExtractionDurationHint, setHideExtractionDurationHint } from "@/src/features/diagnose/data/datasources/DiagnosePrefsStorage";
import { getTastePrefs } from "@/src/shared/services/tastePrefsStore";
import { USER_EXPERIENCE } from "@/src/shared/domain/tastePrefs";
import { Check, Info, X } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, View } from "react-native";

const R = StringRes.steps.extractionDuration
const DEFAULT_EXTRACTION_DURATION = 23

type ExtractionDurationProps = {
  extractionDuration?: number
  onSubmit: (extractionDuration: number) => void;
};

export const ExtractionDuration = ({
  extractionDuration,
  onSubmit,
}: ExtractionDurationProps) => {
  const [extractionDurationInput, setExtractionDuration] = useState(extractionDuration ?? DEFAULT_EXTRACTION_DURATION)
  const [showNoTimerPopup, setShowNoTimerPopup] = useState(false)
  const [hideNoTimerPopup, setHideNoTimerPopup] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [showBeginnerHint, setShowBeginnerHint] = useState(false)
  const { showPopup } = usePopup()
  const { t } = useTranslation()

  //Generate an array of values from 3 to 60 for SecondsSpinner
  const EXTRACTION_TIME_VALUES = [...Array(60 - 3 + 1).keys()].map(i => i + 3);
  const canSubmit = !Number.isNaN(extractionDurationInput)

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

  const handleNoCoffeeExtracted = () => {
    // TODO: define behavior for the "No coffee extracted" action.
  };

  function handleSubmit() {
    if (!canSubmit) {
      showPopup("Error!", "Okay")
    } else {
      onSubmit(extractionDurationInput)
    }
  }

  return (
    <View className="flex-1 bg-[#FC9401]">
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
      {/* ZONA SPINNER + BACKGROUND */}
      <View className="flex-1 relative">
        {/* Background-ul, întins pe toată zona spinnerului */}
        <View className="absolute inset-0">
          <View className="flex-1 bg-[#F1E9DD] gap-2">
            <View className="flex-1 bg-[#FF5210] rounded-b-[40px]" />
            <View className="flex-1 bg-[#FC9401] rounded-t-[40px]" />
          </View>
        </View>

        {/* Conținutul spinnerului */}
        <View className="flex-1">
          <Spinner
            values={EXTRACTION_TIME_VALUES}
            unitOfMeasurement="sec."
            initialValue={extractionDurationInput}
            onChange={(value) => setExtractionDuration(value)}
          />
        </View>
      </View>

      {/* ZONA BUTOANELOR – NU mai afectează matematică spinnerului */}
      <View className="absolute flex-row gap-2 mx-4 left-0 right-0 justify-center bottom-5">
        {/* Poți stiliza cum vrei */}
        <Button className="flex-[0.4]" text={t(R.buttonIdontKnow)} onPress={handleNoCoffeeExtracted} />
        <Button className="flex-[0.6]" text={t(StringRes.buttonContinue)} onPress={() => handleSubmit()} />
      </View>
    </View>
  );
};
