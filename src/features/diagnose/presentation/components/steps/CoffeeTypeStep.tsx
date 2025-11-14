import React from "react";
import { View } from "react-native";
import { CoffeeType } from "../../../domain/valueObjects/CoffeeType";

type CoffeeTypeStepProps = {
    value: CoffeeType;
    onSubmit: (coffeeType: CoffeeType) => void;
};

export const CoffeeTypeStep = ({ value, onSubmit }: CoffeeTypeStepProps) => { 
  return(
    <View>
      
    </View>
  )
 };
