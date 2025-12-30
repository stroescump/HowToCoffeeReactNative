import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
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
  const [trackWidth, setTrackWidth] = useState(0);

  if (options.length === 0) return null;

  const maxIndex = Math.max(1, options.length - 1);
  const fallbackIndex = Math.floor(options.length / 2);
  const resolvedIndex = options.findIndex((option) => option.value === value);
  const activeIndex = resolvedIndex >= 0 ? resolvedIndex : fallbackIndex;

  const thumbSize = 26;
  const dotSize = 10;

  const handleTrackPress = (event: any) => {
    if (trackWidth <= 0) return;
    const locationX = event.nativeEvent.locationX as number;
    const ratio = Math.min(1, Math.max(0, locationX / trackWidth));
    const index = Math.round(ratio * maxIndex);
    onChange(options[index].value);
  };

  const positionForIndex = (index: number, size: number) => {
    if (trackWidth <= 0) return 0;
    return (trackWidth - size) * (index / maxIndex);
  };

  return (
    <View className="gap-3">
      <Pressable
        className="h-12 justify-center"
        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
        onPress={handleTrackPress}
      >
        <View className="h-2 rounded-full bg-black/10" />
        {options.map((option, index) => (
          <View
            key={option.value}
            style={{
              left: positionForIndex(index, dotSize),
              position: "absolute",
              top: "50%",
              transform: [{ translateY: -dotSize / 2 }],
            }}
          >
            <View
              className={`h-[10px] w-[10px] rounded-full ${
                index === activeIndex ? "bg-black" : "bg-black/30"
              }`}
            />
          </View>
        ))}
        <View
          style={{
            left: positionForIndex(activeIndex, thumbSize),
            position: "absolute",
            top: "50%",
            transform: [{ translateY: -thumbSize / 2 }],
          }}
        >
          <View className="h-[26px] w-[26px] rounded-full border-2 border-white bg-black" />
        </View>
      </Pressable>
      <View className="flex-row justify-between px-1">
        {options.map((option) => (
          <Pressable
            key={option.value}
            hitSlop={8}
            onPress={() => onChange(option.value)}
          >
            <Text className="text-xs font-[InterBold] text-black/80">
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
