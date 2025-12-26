import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export function ProfileSettingsScreen() {
  const router = useRouter();

  return (
    <BaseScreen
      safeAreaBgColor="#F1E9DD"
      showHeader
      title="Settings"
      onBack={() => router.back()}
    >
      <View className="flex-1 bg-[#F1E9DD] px-6 pb-10">
        <View className="bg-white rounded-2xl p-6">
          <Text className="text-lg font-[InterSemiBold] text-black">
            Settings coming soon.
          </Text>
          <Text className="text-base text-black/70 mt-2">
            This area will host account, privacy, and app preferences.
          </Text>
        </View>
      </View>
    </BaseScreen>
  );
}
