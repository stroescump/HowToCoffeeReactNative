import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { CoffeeType } from "../../../domain/valueObjects/CoffeeType";

type CoffeeTypeStepProps = {
  value?: CoffeeType;
  onSubmit: (coffeeType: CoffeeType) => void;
};

export const CoffeeTypeStep = ({ value, onSubmit }: CoffeeTypeStepProps) => {
  const { t } = useTranslation();
  return (
    <View className="flex-1 mx-4">
      <View className="flex-1 flex-col px-4 w-full bg-lime-300 py-4 items-center">
        <View className="flex-1 w-full bg-yellow-600 rounded-t-full" />
        <View className="flex-1 w-full bg-yellow-800 rounded-t-full" />
        <View className="flex-1 w-full bg-yellow-950 rounded-t-full" />
      </View>
    </View>
  )
};