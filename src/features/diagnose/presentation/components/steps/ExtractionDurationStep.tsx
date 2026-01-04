import { StringRes } from "@/src/i18n/strings";
import Button from "@/src/shared/ui/components/buttons/Button";
import { Spinner } from "@/src/shared/ui/components/features/diagnose/dosageSpinner/Spinner";
import { usePopup } from "@/src/shared/ui/contextproviders/PopupContext";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { useExtractionTimer } from "../../hooks/useExtractionTimer";
import { ExtractionDurationHints } from "./ExtractionDurationHints";

const R = StringRes.steps.extractionDuration;
const DEFAULT_EXTRACTION_DURATION = 0;
const MAX_EXTRACTION_SECONDS = 60;
const AUTO_STOP_SECONDS = 30;
const AUTO_SCROLL_DURATION_MS = 1000;
const START_BUTTON_BG = "rgba(47, 191, 74, 0.75)";
const STOP_BUTTON_BG = "rgba(229, 57, 53, 0.75)";
const EXTRACTION_TIME_VALUES = Array.from(
  { length: MAX_EXTRACTION_SECONDS + 1 },
  (_, index) => index
);

type ExtractionDurationProps = {
  extractionDuration?: number;
  allowRetake?: boolean;
  onSubmit: (extractionDuration: number) => void;
};

export const ExtractionDuration = ({
  extractionDuration,
  allowRetake = false,
  onSubmit,
}: ExtractionDurationProps) => {
  const { showPopup } = usePopup();
  const { t } = useTranslation();
  const initialSeconds = extractionDuration ?? DEFAULT_EXTRACTION_DURATION;

  const handleAutoStop = React.useCallback(() => {
    showPopup(t(R.popupAutoStopMessage), t(StringRes.buttonOkIUnderstand));
  }, [showPopup, t]);

  const { seconds, setSeconds, isRunning, hasStopped, start, stop, prepareForRecording } =
    useExtractionTimer({
      autoStopSeconds: AUTO_STOP_SECONDS,
      initialSeconds,
      onAutoStop: handleAutoStop,
    });
  const [spinnerVersion, setSpinnerVersion] = React.useState(0);

  const canSubmit = Number.isFinite(seconds);
  const showTimerButton = !hasStopped;
  const showActionButtons = hasStopped && !isRunning;
  const timerLabel = isRunning ? t(R.buttonStop) : t(R.buttonStart);
  const timerVariant = isRunning ? "danger" : "success";
  const timerBackgroundColor = isRunning ? STOP_BUTTON_BG : START_BUTTON_BG;
  const showRetakeButton = allowRetake && showActionButtons;

  const handleNoCoffeeExtracted = () => {
    // TODO: define behavior for the "No coffee extracted" action.
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      showPopup("Error!", "Okay");
      return;
    }
    onSubmit(seconds);
  };

  const handleTimerPress = () => {
    if (isRunning) {
      stop();
      return;
    }
    start();
  };

  const handleRetakePress = () => {
    prepareForRecording();
    setSpinnerVersion((prev) => prev + 1);
  };

  return (
    <View className="flex-1 bg-[#FC9401]">
      <ExtractionDurationHints />

      <View className="flex-[0.85] relative">
        <View className="absolute inset-0">
          <View className="flex-1 bg-[#F1E9DD] gap-2">
            <View className="flex-1 bg-[#FF5210] rounded-b-[40px]" />
            <View className="flex-1 bg-[#FC9401] rounded-t-[40px]" />
          </View>
        </View>

        <View className="flex-1">
          <Spinner
            key={spinnerVersion}
            values={EXTRACTION_TIME_VALUES}
            unitOfMeasurement="sec."
            initialValue={seconds}
            value={isRunning ? seconds : undefined}
            onChange={isRunning ? undefined : (value) => setSeconds(value)}
            isInteractionEnabled={!isRunning}
            isAutoScrolling={isRunning}
            autoScrollDurationMs={AUTO_SCROLL_DURATION_MS}
          />
        </View>
      </View>

      {showTimerButton && (
        <View className="absolute h-[25%] mx-5 flex-row gap-2 left-0 right-0 justify-center bottom-5">
          <Button
            fontSize={36}
            font="medium"
            cornerRadius={40}
            className="flex-1 min-h-[72]"
            variant={timerVariant}
            backgroundColor={timerBackgroundColor}
            text={timerLabel}
            onPress={handleTimerPress}
          />
        </View>
      )}
      {showActionButtons && (
        <View className="absolute mx-4 left-0 right-0 bottom-5">
          {showRetakeButton && (
            <Button
              className="mb-3"
              text={t(R.buttonRetake)}
              onPress={handleRetakePress}
            />
          )}
          <View className="flex-row gap-2 justify-center">
            <Button
              className="flex-[0.4]"
              text={t(R.buttonIdontKnow)}
              onPress={handleNoCoffeeExtracted}
            />
            <Button
              className="flex-[0.6]"
              text={t(StringRes.buttonContinue)}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </View>
  );
};
