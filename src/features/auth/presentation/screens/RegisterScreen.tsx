import { AuthLink } from "@/src/features/auth/presentation/components/AuthLink";
import { AuthProvidersSection, AuthProvider } from "@/src/features/auth/presentation/components/AuthProvidersSection";
import { AuthTextField } from "@/src/features/auth/presentation/components/AuthTextField";
import { setAuthToken } from "@/src/shared/domain/usecases/authTokenUseCase";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

export function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const providers: AuthProvider[] = [];

  const handleRegister = async () => {
    if (!fullName || !email || !password) return;
    await setAuthToken(`mock:${email}`);
    router.replace("/profile");
  };

  return (
    <BaseScreen safeAreaBgColor="#F1E9DD">
      <View className="flex-1 bg-[#F1E9DD] px-6 pb-10 pt-4">
        <View className="mb-8">
          <Text className="text-4xl font-[InterBold] tracking-[-2px] text-black">
            Create account
          </Text>
          <Text className="text-base text-black/70 mt-2">
            Join to personalize your coffee journey.
          </Text>
        </View>

        <View className="gap-4">
          <AuthTextField
            label="Full name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Alex Taylor"
            autoCapitalize="words"
          />
          <AuthTextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <AuthTextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
          />
        </View>

        <View className="mt-8 gap-3">
          <Button
            text="Create account"
            onPress={handleRegister}
            disabled={!fullName || !email || !password}
          />
          <Button
            variant="ghost"
            text="Back to log in"
            onPress={() => router.push("/auth/login")}
          />
        </View>

        <AuthProvidersSection providers={providers} />

        <View className="mt-6">
          <AuthLink
            text="Already have an account? Log in"
            onPress={() => router.push("/auth/login")}
            align="center"
          />
        </View>
      </View>
    </BaseScreen>
  );
}
