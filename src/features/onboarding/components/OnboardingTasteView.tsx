import { BitternessPreference, UserExperience } from "@/src/shared/domain/tastePrefs";
import React from "react";
import { View } from "react-native";
import { DrinkStyleChoice } from "../tasteFlowOptions";
import { TASTE_STEP, TasteStepKey } from "../tasteFlowState";
import { ADVANCED_VISUALS } from "../tasteVisuals";
import { AdvancedTabId, SliderOption } from "../types";
import { AdvancedTasteStep } from "./AdvancedTasteStep";
import { BitternessStep } from "./BitternessStep";
import { DrinkStyleStep } from "./DrinkStyleStep";
import { UserExperienceStep } from "./UserExperienceStep";

type OnboardingTasteViewProps = {
  step: TasteStepKey;
  userExperience: UserExperience | null;
  bitterness: BitternessPreference | null;
  drinkStyle: DrinkStyleChoice | null;
  advancedTab: AdvancedTabId;
  advancedTitle: string;
  activeAdvancedOptions: SliderOption[];
  activeAdvancedValue: string;
  busy: boolean;
  nextDisabled: boolean;
  onUserExperienceChange: (value: UserExperience) => void;
  onBitternessChange: (value: BitternessPreference) => void;
  onDrinkStyleChange: (value: DrinkStyleChoice) => void;
  onAdvancedTabChange: (value: AdvancedTabId) => void;
  onAdvancedValueChange: (value: string) => void;
  onNext: () => void;
};

export function OnboardingTasteView({
  step,
  userExperience,
  bitterness,
  drinkStyle,
  advancedTab,
  advancedTitle,
  activeAdvancedOptions,
  activeAdvancedValue,
  busy,
  nextDisabled,
  onUserExperienceChange,
  onBitternessChange,
  onDrinkStyleChange,
  onAdvancedTabChange,
  onAdvancedValueChange,
  onNext,
}: OnboardingTasteViewProps) {
  const stepContent = (() => {
    if (step === TASTE_STEP.EXPERIENCE) {
      return (
        <UserExperienceStep
          userExperience={userExperience}
          onChange={onUserExperienceChange}
          onNext={onNext}
          disabled={nextDisabled}
        />
      );
    }
    if (step === TASTE_STEP.BITTERNESS) {
      return (
        <BitternessStep
          value={bitterness}
          onChange={onBitternessChange}
          onNext={onNext}
          disabled={nextDisabled}
        />
      );
    }
    if (step === TASTE_STEP.DRINK_STYLE) {
      return (
        <DrinkStyleStep
          value={drinkStyle}
          onChange={onDrinkStyleChange}
          onNext={onNext}
          disabled={nextDisabled}
        />
      );
    }
    return (
      <AdvancedTasteStep
        title={advancedTitle}
        tab={advancedTab}
        options={activeAdvancedOptions}
        value={activeAdvancedValue}
        visuals={ADVANCED_VISUALS[advancedTab]}
        onTabChange={onAdvancedTabChange}
        onValueChange={onAdvancedValueChange}
        onFinish={onNext}
        disabled={busy}
      />
    );
  })();

  return <View className="flex-1 bg-[#F5EAD7]">{stepContent}</View>;
}
