import { Spinner } from "@/src/shared/ui/components/features/diagnose/dosageSpinner/Spinner";
import React, { useEffect, useMemo, useState } from "react";
import { Button, View } from "react-native";

type ExtractionDurationProps = {
  extractionDuration?: number;
  hasScale?: boolean;
  onSubmit: (extractionDuration: number, hasScale: boolean) => void;
  onIdontKnow: () => void;
};

export const ExtractionDuration = ({
  extractionDuration,
  hasScale,
  onSubmit,
  onIdontKnow,
}: ExtractionDurationProps) => {
  const [extractionDurationInput, setExtractionDuration] = useState(
    extractionDuration != null ? String(extractionDuration) : "",
  );
  const [localHasScale, setLocalHasScale] = useState(hasScale);

  useEffect(() => {
    setExtractionDuration(extractionDuration != null ? String(extractionDuration) : "");
  }, [extractionDuration]);

  useEffect(() => {
    setLocalHasScale(hasScale);
  }, [hasScale]);

  const parsedExtractionDuration = useMemo(() => Number(extractionDurationInput), [extractionDurationInput]);
  const canSubmit = !Number.isNaN(parsedExtractionDuration) && parsedExtractionDuration > 0;

  //Generate an array of values from 3 to 60 for SecondsSpinner
  const EXTRACTION_TIME_VALUES = [...Array(60 - 3 + 1).keys()].map(i => i + 3);

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit(parsedExtractionDuration, localHasScale);
  }

  return (
    <View className="flex-1 relative">
      <View className="absolute inset-0">
        <View className="flex-1 bg-[#F1E9DD] gap-2">
          <View className="flex-1 bg-[#FF5210] rounded-b-[40px]" />
          <View className="flex-1 bg-[#FC9401]  rounded-t-[40px]" />
        </View>
      </View>
      <View className="flex-1">
        <Spinner
          values={EXTRACTION_TIME_VALUES}
          unitOfMeasurement="sec."
          initialValue={parsedExtractionDuration || extractionDuration || 14}
          onChange={(value) => setExtractionDuration(String(value))}
        />
      </View>
      <View className="flex flex-row">
        <Button title="" onPress={onIdontKnow} color="#010101">
      </View>
    </View>
  );
};
