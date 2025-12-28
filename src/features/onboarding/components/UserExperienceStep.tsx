import { UserExperience, USER_EXPERIENCE } from "@/src/shared/domain/tastePrefs";
import React from "react";
import { View } from "react-native";
import { USER_EXPERIENCE_OPTIONS } from "../tasteFlowOptions";
import { USER_EXPERIENCE_VISUALS } from "../tasteVisuals";
import { SegmentedToggle } from "./SegmentedToggle";
import { TasteStepScaffold } from "./TasteStepScaffold";
import { TasteVisualStage } from "./TasteVisualStage";

type UserExperienceStepProps = {
  userExperience: UserExperience | null;
  onChange: (value: UserExperience) => void;
  onNext: () => void;
  disabled: boolean;
};

export function UserExperienceStep({
  userExperience,
  onChange,
  onNext,
  disabled,
}: UserExperienceStepProps) {
  return (
    <TasteStepScaffold
      title="Choose your path"
      visual={
        <TasteVisualStage
          visuals={USER_EXPERIENCE_VISUALS}
          index={userExperience === USER_EXPERIENCE.ADVANCED ? 1 : 0}
        />
      }
      slider={
        <View className="items-center pb-6">
          <SegmentedToggle
            options={USER_EXPERIENCE_OPTIONS}
            value={userExperience}
            onChange={onChange}
          />
        </View>
      }
      ctaText="Continue"
      onCta={onNext}
      ctaDisabled={disabled}
    />
  );
}
