import React from "react";
import { Pressable, Text, View } from "react-native";

export type AuthProvider = {
  id: string;
  label: string;
  onPress: () => void;
};

type AuthProvidersSectionProps = {
  providers: AuthProvider[];
};

export function AuthProvidersSection({ providers }: AuthProvidersSectionProps) {
  if (providers.length === 0) return null;

  return (
    <View className="mt-8">
      <Text className="text-base text-black/60 text-center">
        Or continue with
      </Text>
      <View className="mt-3 gap-3">
        {providers.map((provider) => (
          <Pressable
            key={provider.id}
            onPress={provider.onPress}
            className="border border-black/20 rounded-full py-3"
          >
            <Text className="text-base font-[InterSemiBold] text-center text-black">
              {provider.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
