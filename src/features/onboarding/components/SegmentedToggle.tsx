import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SliderOption } from "../types";

type SegmentedToggleProps<T extends string> = {
  options: SliderOption<T>[];
  value?: T | null;
  onChange: (value: T) => void;
};

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
}: SegmentedToggleProps<T>) {
  return (
    <View className="flex-row rounded-full bg-black/10 p-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            className={`px-6 py-3 rounded-full ${
              selected ? "bg-black" : "bg-white/90"
            }`}
            onPress={() => onChange(option.value)}
          >
            <Text
              className={`text-base font-[InterBold] ${selected ? "text-white" : "text-black"}`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
