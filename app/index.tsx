// app/index.tsx
import { ButtonsSvg } from "@/src/features/homescreen/presentation/components/ButtonsSvg";
import { StringRes } from "@/src/i18n/strings";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [availableHeight, setAvailableHeight] = useState(0);
  const { t } = useTranslation();
  const R = StringRes.homescreen;

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
                label: t(R.findYourTaste),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#010101",
              },
              marketplace: {
                label: t(R.marketplace),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#010101",
              },
              diagnoseBrew: {
                label: t(R.diagnoseBrew),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#FFFFFF",
              },
              recipeAgenda: {
                label: t(R.recipeAgenda),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#FFFFFF",
              },
              coffeePlacesNearby: {
                label: t(R.coffeePlacesNearby),
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