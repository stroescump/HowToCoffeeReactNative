import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";

type HeaderProps = {
  title: string;
  showBack?: boolean;
};

export function HeaderHowToCoffee({ title, showBack = true }: HeaderProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // single, simple formula:
  // - scale with screen width
  // - clamp in a sane range so it never explodes
  const fontSize = Math.min(40, Math.max(32, width / 12));

  return (
    <View className="px-6 mb-4">
      <View className="flex-row items-center">
        {/* Back button */}
        {showBack && (
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
          >
            <ArrowLeft size={38} />
          </Pressable>
        )}

        {/* Title */}
        <Text
          className="tracking-[-2px] font-[InterBold] ms-2"
          style={{
            fontSize,
            includeFontPadding: false
          }}
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}