import { StringRes } from "@/src/i18n/strings";
import Button from "@/src/shared/ui/components/buttons/Button";
import { usePopup } from "@/src/shared/ui/contextproviders/PopupContext";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { CoffeeRoast } from "../../../domain/models/CoffeeRoast";


type CoffeeRoastStepProps = {
  value?: CoffeeRoast;
  onSubmit: (coffeeRoast: CoffeeRoast) => void;
};

export const CoffeeRoastStep = ({ value, onSubmit }: CoffeeRoastStepProps) => {
  const { t } = useTranslation();
  const { showPopup } = usePopup();
  const R = StringRes.steps.coffeeRoast

  const isLightSelected = value === CoffeeRoast.Light;
  const isMediumSelected = value === CoffeeRoast.Medium;
  const isDarkSelected = value === CoffeeRoast.Dark;

  return (
    <View className="flex-1 mx-6">
      <View className="flex-1 flex-col bg-lime-300">
        <Pressable
          className={`flex-1 bg-yellow-600 rounded-t-full justify-center items-center ${isLightSelected ? "border-[6px] border-pink-500" : ""
            }`}
          onPress={() => onSubmit(CoffeeRoast.Light)}
        >
        </Pressable>
        <Pressable
          className={`flex-1 bg-yellow-800 rounded-t-full justify-center items-center ${isMediumSelected ? "border-[6px] border-pink-500" : ""
            }`}
          onPress={() => onSubmit(CoffeeRoast.Medium)}
        >
        </Pressable>
        <Pressable
          className={`flex-1 bg-yellow-950 rounded-t-full justify-center items-center ${isDarkSelected ? "border-[6px] border-pink-500" : ""
            }`}
          onPress={() => onSubmit(CoffeeRoast.Dark)}
        >
        </Pressable>
      </View>
      <View className="mt-6 mb-6">
        <Button text={t(R.buttonText)} onPress={() => {
          showPopup(t(R.popupDescription), t(R.popupButtonText))
        }} />
      </View>
    </View>
  )
};
