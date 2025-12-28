import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PillOption } from "../types";

type PillTabsProps<T extends string> = {
  options: PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function PillTabs<T extends string>({ options, value, onChange }: PillTabsProps<T>) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            className={`rounded-full border-2 px-4 py-2 ${
              selected ? "bg-black border-black" : "bg-white border-black/20"
            }`}
            onPress={() => onChange(option.value)}
          >
            <Text
              className={`text-sm font-[InterBold] ${selected ? "text-white" : "text-black"}`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
