import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SliderOption } from "../types";

type ChunkySliderProps<T extends string> = {
  options: SliderOption<T>[];
  value?: T | null;
  onChange: (value: T) => void;
};

export function ChunkySlider<T extends string>({
  options,
  value,
  onChange,
}: ChunkySliderProps<T>) {
  return (
    <View className="flex-row gap-2 rounded-3xl bg-black/10 p-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            className={`flex-1 items-center justify-center rounded-2xl px-2 py-4 ${
              selected ? "bg-black" : "bg-white/90"
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
