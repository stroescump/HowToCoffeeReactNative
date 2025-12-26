import { ProfileOptionRow } from "@/src/features/profile/presentation/components/ProfileOptionRow";
import { clearAuthToken } from "@/src/shared/domain/usecases/authTokenUseCase";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await clearAuthToken();
    router.replace("/");
  };

  return (
    <BaseScreen safeAreaBgColor="#F1E9DD">
      <View className="flex-1 bg-[#F1E9DD] px-6 pb-10 pt-4">
        <View className="mb-6">
          <Text className="text-4xl font-[InterBold] tracking-[-2px] text-black">
            My Profile
          </Text>
          <Text className="text-base text-black/70 mt-2">
            Manage your account and preferences.
          </Text>
        </View>

        <View className="bg-white rounded-2xl px-4">
          <ProfileOptionRow
            label="Settings"
            onPress={() => router.push("/profile/settings")}
          />
          <View className="border-t border-black/10" />
          <ProfileOptionRow
            label="Log out"
            onPress={handleLogout}
            destructive
            showChevron={false}
          />
        </View>
      </View>
    </BaseScreen>
  );
}
