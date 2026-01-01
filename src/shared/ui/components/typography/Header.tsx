import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";

type HeaderProps = {
  title: string | undefined
  showBack?: boolean
  onBack?: (() => void) | undefined
  headerColor?: string | undefined
  backArrowColor?: string | undefined
  rightAccessory?: React.ReactNode
};

export function HeaderHowToCoffee({
  title,
  showBack = true,
  onBack,
  headerColor,
  backArrowColor,
  rightAccessory
}: HeaderProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const resolvedBackArrowColor = backArrowColor ?? headerColor;

  // single, simple formula:
  // - scale with screen width
  // - clamp in a sane range so it never explodes
  const fontSize = Math.min(40, Math.max(32, width / 12));

  return (
    <View className="px-6 mb-4">
      <View className="flex-row items-center">
        <View className="flex-row items-center flex-1">
          {/* Back button */}
          {showBack && (
            <Pressable
              onPress={onBack}
              hitSlop={12}
            >
              <ArrowLeft size={38} color={resolvedBackArrowColor} />
            </Pressable>
          )}

          {/* Title */}
          <Text
            className="tracking-[-2px] font-[InterBold] ms-2"
            style={{
              fontSize,
              includeFontPadding: false,
              color: headerColor,
              flexShrink: 1
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
        {rightAccessory && <View className="ms-3">{rightAccessory}</View>}
      </View>
    </View>
  );
}
