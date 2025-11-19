import { StringRes } from "@/src/i18n/strings";
import Button from "@/src/shared/ui/components/buttons/Button";
import { usePopup } from "@/src/shared/ui/contextproviders/PopupContext";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { CoffeeType } from "../../../domain/valueObjects/CoffeeType";

type CoffeeTypeStepProps = {
  value?: CoffeeType;
  onSubmit: (coffeeType: CoffeeType) => void;
};

export const CoffeeTypeStep = ({ value, onSubmit }: CoffeeTypeStepProps) => {
  const { t } = useTranslation();
  const { showPopup } = usePopup();
  const R = StringRes.steps.coffeeType

  const isLightSelected = value === CoffeeType.LightRoast;
  const isMediumSelected = value === CoffeeType.MediumRoast;
  const isDarkSelected = value === CoffeeType.DarkRoast;

  return (
    <View className="flex-1 mx-6">
      <View className="flex-1 flex-col bg-lime-300">
        <Pressable
          className={`flex-1 bg-yellow-600 rounded-t-full justify-center items-center ${isLightSelected ? "border-[6px] border-pink-500" : ""
            }`}
          onPress={() => onSubmit(CoffeeType.LightRoast)}
        >
        </Pressable>
        <Pressable
          className={`flex-1 bg-yellow-800 rounded-t-full justify-center items-center ${isMediumSelected ? "border-[6px] border-pink-500" : ""
            }`}
          onPress={() => onSubmit(CoffeeType.MediumRoast)}
        >
        </Pressable>
        <Pressable
          className={`flex-1 bg-yellow-950 rounded-t-full justify-center items-center ${isDarkSelected ? "border-[6px] border-pink-500" : ""
            }`}
          onPress={() => onSubmit((CoffeeType.DarkRoast))}
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