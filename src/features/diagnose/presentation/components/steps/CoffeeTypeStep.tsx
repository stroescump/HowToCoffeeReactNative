import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { CoffeeType } from "../../../domain/valueObjects/CoffeeType";

type CoffeeTypeStepProps = {
  value?: CoffeeType;
  onSubmit: (coffeeType: CoffeeType) => void;
};

export const CoffeeTypeStep = ({ value, onSubmit }: CoffeeTypeStepProps) => {
  const { t } = useTranslation(["diagnose", "common"]);
  return (
    <View className="flex-1 pb-4">
      <Text className=" font-semibold text-5xl tracking-[-3px] text-center pb-4" style={{includeFontPadding: true}}>{`What kind of coffee\nare you using?`}</Text>

      <View className="flex-1 mx-4">
        <View className="flex-1 flex-col w-full bg-lime-300 py-6 items-center">
          <View className="flex-1 aspect-video bg-yellow-600 rounded-t-full" />
          <View className="flex-1 aspect-video bg-yellow-800 rounded-t-full" />
          <View className="flex-1 aspect-video bg-yellow-950 rounded-t-full" />
        </View>
      </View>
    </View>
  )
};