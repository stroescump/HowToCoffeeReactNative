import { StringRes } from "@/src/i18n/strings";
import Button from "@/src/shared/ui/components/buttons/Button";
import { Spinner } from "@/src/shared/ui/components/features/diagnose/dosageSpinner/Spinner";
import { usePopup } from "@/src/shared/ui/contextproviders/PopupContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const R = StringRes.steps.extractionDuration

type ExtractionDurationProps = {
  onSubmit: (extractionDuration: number) => void;
};

export const ExtractionDuration = ({
  onSubmit,
}: ExtractionDurationProps) => {
  const [extractionDurationInput, setExtractionDuration] = useState(19)
  const { showPopup } = usePopup()
  const { t } = useTranslation()

  //Generate an array of values from 3 to 60 for SecondsSpinner
  const EXTRACTION_TIME_VALUES = [...Array(60 - 3 + 1).keys()].map(i => i + 3);
  const canSubmit = !Number.isNaN(extractionDurationInput)

  function handleSubmit() {
    if (!canSubmit) {
      showPopup("", "")
    } else {
      onSubmit(extractionDurationInput)
    }
  }

  return (
    <View className="flex-1 bg-[#FC9401]">
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
        <Button className="flex-[0.4]" text={t(R.buttonIdontKnow)} onPress={() => {
          const popupTitle = t(R.popupNoTimerMessage)
          const popupButtonDescription = t(StringRes.buttonOkIUnderstand)
          showPopup(popupTitle, popupButtonDescription)
        }} />
        <Button className="flex-[0.6]" text={t(StringRes.buttonContinue)} onPress={() => handleSubmit()} />
      </View>
    </View>
  );
};
