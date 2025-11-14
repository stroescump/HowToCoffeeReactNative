import React from "react";
import { Text, View } from "react-native";
import { CoffeeType } from "../../../domain/valueObjects/CoffeeType";

type CoffeeTypeStepProps = {
  value: CoffeeType;
  onSubmit: (coffeeType: CoffeeType) => void;
};

export const CoffeeTypeStep = ({ value, onSubmit }: CoffeeTypeStepProps) => {
  return (
    <View className="flex-1">
      <Text className="font-semibold text-5xl tracking-[-3px] text-center">{`What kind of coffee\nare you using?`}</Text>
    </View>
  )
};
