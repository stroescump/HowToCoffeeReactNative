import { StringRes } from "@/src/i18n/strings";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useSafeAreaColor } from "@/src/shared/ui/contextproviders/SafeAreaColorContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const R = StringRes.steps.tasteFeedback

const PAGES = [
  {
    image: require("@/assets/images/icon.png"), tasteTitle: R.sour,
    tasteDescription: R.sourDescription, safeAreaColor: "#3B55FF"
  },
  {
    image: require("@/assets/images/icon.png"), tasteTitle: R.bitter,
    tasteDescription: R.bitterDescription, safeAreaColor: "#FF5210"
  },
  {
    image: require("@/assets/images/icon.png"), tasteTitle: R.acidic,
    tasteDescription: R.acidicDescription, safeAreaColor: "#FC9401"
  },
  {
    image: require("@/assets/images/icon.png"), tasteTitle: R.watery,
    tasteDescription: R.wateryDescription, safeAreaColor: "#F1E9DD"
  },
];

export function TasteFeedbackStep({ onSubmit }: { onSubmit: () => void }) {
  const { setColor } = useSafeAreaColor();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        width={width}
        height={width * 0.8}
        data={PAGES}
        onSnapToItem={(idx) => {
          setIndex(idx);
          setColor(PAGES[idx].safeAreaColor);
        }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 24, marginTop: 16 }}>{t(item.tasteTitle)}</Text>
            <Text style={{ fontSize: 16, marginTop: 8 }}>{t(item.tasteDescription)}</Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", justifyContent: "center", paddingVertical: 12 }}>
        {PAGES.map((_, i) => (
          <View
            key={i}
            style={{
              width: i === index ? 12 : 8,
              height: i === index ? 12 : 8,
              borderRadius: 6,
              marginHorizontal: 4,
              backgroundColor: i === index ? "#010101" : "#CCCCCC",
            }}
          />
        ))}
      </View>

      <Button text="Continue" onPress={onSubmit} />
    </View>
  );
}