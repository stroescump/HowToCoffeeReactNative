import { AuthLink } from "@/src/features/auth/presentation/components/AuthLink";
import { AuthProvidersSection, AuthProvider } from "@/src/features/auth/presentation/components/AuthProvidersSection";
import { AuthTextField } from "@/src/features/auth/presentation/components/AuthTextField";
import { setAuthToken } from "@/src/shared/domain/usecases/authTokenUseCase";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const providers: AuthProvider[] = [];

  const handleLogin = async () => {
    if (!email || !password) return;
    await setAuthToken(`mock:${email}`);
    router.replace("/profile");
  };

  return (
    <BaseScreen safeAreaBgColor="#F1E9DD">
      <View className="flex-1 bg-[#F1E9DD] px-6 pb-10 pt-4">
        <View className="mb-8">
          <Text className="text-4xl font-[InterBold] tracking-[-2px] text-black">
            Log in
          </Text>
          <Text className="text-base text-black/70 mt-2">
            Welcome back. Use your email and password.
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
          <AuthTextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="password"
            secureTextEntry
          />
          <AuthLink
            text="Forgot password"
            onPress={() => router.push("/auth/forgot-password")}
          />
        </View>

        <View className="mt-8 gap-3">
          <Button
            text="Log in"
            onPress={handleLogin}
            disabled={!email || !password}
          />
          <Button
            variant="ghost"
            text="Create account"
            onPress={() => router.push("/auth/register")}
          />
        </View>

        <AuthProvidersSection providers={providers} />
      </View>
    </BaseScreen>
  );
}
