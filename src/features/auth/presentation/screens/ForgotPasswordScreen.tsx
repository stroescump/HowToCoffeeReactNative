import { AuthLink } from "@/src/features/auth/presentation/components/AuthLink";
import { AuthTextField } from "@/src/features/auth/presentation/components/AuthTextField";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

export function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) return;
    router.replace("/auth/login");
  };

  return (
    <BaseScreen safeAreaBgColor="#F1E9DD">
      <View className="flex-1 bg-[#F1E9DD] px-6 pb-10 pt-4">
        <View className="mb-8">
          <Text className="text-4xl font-[InterBold] tracking-[-2px] text-black">
            Reset password
          </Text>
          <Text className="text-base text-black/70 mt-2">
            Enter your email to receive a reset link.
          </Text>
        </View>

        <View className="gap-4">
          <AuthTextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
        </View>

        <View className="mt-8 gap-3">
          <Button
            text="Send reset link"
            onPress={handleReset}
            disabled={!email}
          />
        </View>

        <View className="mt-6">
          <AuthLink
            text="Back to log in"
            onPress={() => router.push("/auth/login")}
            align="center"
          />
        </View>
      </View>
    </BaseScreen>
  );
}
