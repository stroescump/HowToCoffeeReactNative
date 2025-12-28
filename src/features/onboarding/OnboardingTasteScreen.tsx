import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import React from "react";
import { View } from "react-native";
import { OnboardingTasteView } from "./components/OnboardingTasteView";
import { useTasteOnboardingFlow } from "./hooks/useTasteOnboardingFlow";

export function OnboardingTasteScreen() {
  const flow = useTasteOnboardingFlow();

  return (
    <BaseScreen showHeader={false} disablePadding>
      <View className="flex-1">
        <OnboardingTasteView {...flow} />
      </View>
    </BaseScreen>
  );
}
