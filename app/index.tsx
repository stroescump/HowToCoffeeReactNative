// app/index.tsx
import { ButtonsSvg } from "@/src/features/homescreen/presentation/components/ButtonsSvg";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [availableHeight, setAvailableHeight] = useState(0);
  const { t } = useTranslation();

  return (
    <BaseScreen showHeader={false}>
      <Text className="text-5xl text-center mt-2 mb-2 tracking-[-3px] font-[InterBold]">{t("appTitle")}</Text>
      <View className="flex-1 mb-2" onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setAvailableHeight(height);
      }}>
        {availableHeight > 0 && (
          <ButtonsSvg
            availableHeight={availableHeight}
            labels={{
              findYourTaste: {
                label: t("buttons.findYourTaste"),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#010101",
              },
              marketplace: {
                label: t("buttons.marketplace"),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#010101",
              },
              diagnoseBrew: {
                label: t("buttons.diagnoseBrew"),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#FFFFFF",
              },
              recipeAgenda: {
                label: t("buttons.recipeAgenda"),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#FFFFFF",
              },
              coffeePlacesNearby: {
                label: t("buttons.coffeePlacesNearby"),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#010101",
              },
            }}
          />
        )}
      </View>
    </BaseScreen >
  );
}