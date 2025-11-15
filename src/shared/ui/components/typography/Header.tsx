import { useRouter } from "expo-router";
import { ArrowLeft } from 'lucide-react-native';
import React from "react";
import { Pressable, Text, View } from "react-native";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
};

export function HeaderHowToCoffee({ title, showBack = true }: HeaderProps) {
  const router = useRouter();

  return (
    <View className="mt-4 px-6">
      <View className="relative justify-start items-center">

        {/* Title centered */}
        <Text className="text-5xl font-semibold tracking-[-2px] text-center pb-2">
          {title}
        </Text>

        {/* Back button aligned with middle of first line */}
        {showBack && (
          <Pressable
            className="absolute left-0"
            onPress={() => router.back()}
            hitSlop={12}
          >
            <ArrowLeft size={28} />
          </Pressable>
        )}
      </View>
    </View>
  );
}