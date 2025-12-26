import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

type ProfileOptionRowProps = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
  showChevron?: boolean;
};

export function ProfileOptionRow({
  label,
  onPress,
  destructive = false,
  showChevron = true,
}: ProfileOptionRowProps) {
  return (
    <Pressable onPress={onPress} className="py-4">
      <View className="flex-row items-center justify-between">
        <Text
          className={`text-lg font-[InterSemiBold] ${
            destructive ? "text-red-600" : "text-black"
          }`}
        >
          {label}
        </Text>
        {showChevron && <ChevronRight size={20} color="#111111" />}
      </View>
    </Pressable>
  );
}
