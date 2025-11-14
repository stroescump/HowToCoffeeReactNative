import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
};

export function HeaderHowToCoffee({ title, showBack = true }: HeaderProps) {
  const router = useRouter();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      {showBack && (
        <Pressable
          onPress={() => router.back()}
          style={{ paddingRight: 16, paddingVertical: 8 }}
          hitSlop={12}
        >
          <ArrowLeft />
        </Pressable>
      )}
    </View>
  );
}