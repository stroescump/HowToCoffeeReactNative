// app/index.tsx
import { ButtonsSvg } from "@/src/features/homescreen/presentation/components/ButtonsSvg";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [availableHeight, setAvailableHeight] = useState(0);
  return (
    <SafeAreaView
      className="flex-1 bg-[#F1E9DD]"
      edges={["top"]} // protejează doar în jurul notch-ului
    >
      <Text className="text-5xl font-bold text-center mt-2 mb-2 tracking-[-3px]">?ToCoffee</Text>
      <View className="flex-1 mb-2" onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setAvailableHeight(height);
      }}>
        {availableHeight > 0 && (
          <ButtonsSvg
            availableHeight={availableHeight}
            labels={{
              findYourTaste: {
                fontSize: 32,
                fill: "#010101",
              },
              marketplace: {
                fontSize: 32,
                fill: "#010101",
              },
              diagnoseBrew: {
                fontSize: 32,
                fill: "#FFFFFF",
              },
              recipeAgenda: {
                fontSize: 32,
                fill: "#FFFFFF",
              },
              coffeePlacesNearby: {
                fontSize: 32,
                fill: "#010101",
              },
            }}
          />
        )}
      </View>
    </SafeAreaView >
  );
}