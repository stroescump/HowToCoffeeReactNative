import { toNumber } from "@/src/shared/config/functions";
import PrimaryButton from "@/src/shared/ui/components/buttons/Button";
import { Spinner } from "@/src/shared/ui/components/features/diagnose/dosageSpinner/Spinner";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type ExtractionDurationProps = {
  extractionDuration?: number;
  hasScale?: boolean;
  onSubmit: (extractionDuration: number) => void;
};

export const ExtractionDuration = ({
  extractionDuration,
  hasScale,
  onSubmit,
}: ExtractionDurationProps) => {
  const [extractionDurationInput, setExtractionDuration] = useState(
    extractionDuration != null ? String(extractionDuration) : "",
  );
  const [localHasScale, setLocalHasScale] = useState(hasScale);
  const { t } = useTranslation();

  useEffect(() => {
    setExtractionDuration(extractionDuration != null ? String(extractionDuration) : "");
  }, [extractionDuration]);

  useEffect(() => {
    setLocalHasScale(hasScale);
  }, [hasScale]);

  const parsedExtractionDuration = useMemo(() => toNumber(extractionDurationInput), [extractionDurationInput]);

  const canSubmit = !Number.isNaN(parsedExtractionDuration) && parsedExtractionDuration != null;

  //Generate an array of values from 3 to 60 for SecondsSpinner
  const EXTRACTION_TIME_VALUES = [...Array(60 - 3 + 1).keys()].map(i => i + 3);

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit(parsedExtractionDuration, localHasScale);
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
            initialValue={parsedExtractionDuration || extractionDuration || 14}
            onChange={(value) => setExtractionDuration(String(value))}
          />
        </View>
      </View>

      {/* ZONA BUTOANELOR – NU mai afectează matematică spinnerului */}
      <View className="absolute flex-row gap-2 justify-center bottom-5 left-0 right-0">
        {/* Poți stiliza cum vrei */}
        <PrimaryButton text={t("steps.extractionDuration.buttonIdontKnow")} onPress={() => { }} />
        <PrimaryButton text={t("buttons.continue")} onPress={() => {
          if (canSubmit) {
            onSubmit(parsedExtractionDuration)
          } else {

          }
        }} />
      </View>
    </View>
  );
};
