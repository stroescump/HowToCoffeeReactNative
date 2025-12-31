import { ChunkySlider } from "@/src/features/onboarding/components/ChunkySlider";
import {
  ACIDITY_OPTIONS,
  BITTERNESS_OPTIONS,
  BODY_OPTIONS,
  FINISH_OPTIONS,
  SWEETNESS_OPTIONS,
} from "@/src/features/onboarding/tasteFlowOptions";
import { USER_EXPERIENCE, UserExperience } from "@/src/shared/domain/tastePrefs";
import { TastePreference } from "@/src/shared/domain/models/taste/tasteProfile";
import React from "react";
import { Text, View } from "react-native";

type TastePreferenceSectionProps = {
  experience: UserExperience;
  prefs: TastePreference;
  onPrefChange: (
    key: keyof TastePreference,
    value: TastePreference[keyof TastePreference],
  ) => void;
  disabled?: boolean;
};

type TasteSliderCardProps<T extends string> = {
  title: string;
  value?: T | null;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
};

function TasteSliderCard<T extends string>({
  title,
  value,
  options,
  onChange,
}: TasteSliderCardProps<T>) {
  return (
    <View className="rounded-2xl border border-black/10 bg-white p-4">
      <Text className="text-base font-[InterBold] text-black mb-4">
        {title}
      </Text>
      <ChunkySlider options={options} value={value} onChange={onChange} />
    </View>
  );
}

export function TastePreferenceSection({
  experience,
  prefs,
  onPrefChange,
  disabled = false,
}: TastePreferenceSectionProps) {
  const isAdvanced = experience === USER_EXPERIENCE.ADVANCED;

  return (
    <View className="gap-4">
      <Text className="text-lg font-[InterBold] text-black">Taste profile</Text>
      <TasteSliderCard
        title="Bitterness"
        value={prefs.bitterness}
        options={BITTERNESS_OPTIONS}
        onChange={(value) => !disabled && onPrefChange("bitterness", value)}
      />

      {isAdvanced && (
        <>
          <TasteSliderCard
            title="Sweetness"
            value={prefs.sweetness}
            options={SWEETNESS_OPTIONS}
            onChange={(value) => !disabled && onPrefChange("sweetness", value)}
          />
          <TasteSliderCard
            title="Body"
            value={prefs.body}
            options={BODY_OPTIONS}
            onChange={(value) => !disabled && onPrefChange("body", value)}
          />
          <TasteSliderCard
            title="Acidity"
            value={prefs.acidity}
            options={ACIDITY_OPTIONS}
            onChange={(value) => !disabled && onPrefChange("acidity", value)}
          />
          <TasteSliderCard
            title="Clean / Funky"
            value={prefs.cleanFunky}
            options={FINISH_OPTIONS}
            onChange={(value) => !disabled && onPrefChange("cleanFunky", value)}
          />
        </>
      )}
    </View>
  );
}
