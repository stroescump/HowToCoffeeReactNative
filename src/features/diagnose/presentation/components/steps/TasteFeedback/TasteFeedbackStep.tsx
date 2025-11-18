import Button from "@/src/shared/ui/components/buttons/Button";
import { useSafeAreaColor } from "@/src/shared/ui/contextproviders/SafeAreaColorContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Acidic from "./substeps/Acidic";
import Bitter from "./substeps/Bitter";
import Sour from "./substeps/Sour";
import { assertNever, PAGES, R, TasteFeedbackSubpage } from "./substeps/TasteFeedbackSubpage";
import TooWatery from "./substeps/TooWatery";

export function TasteFeedbackStep({ onSubmit }: { onSubmit: () => void }) {
  const { setColor } = useSafeAreaColor();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const { t } = useTranslation();
  const CAROUSEL_DATA: TasteFeedbackSubpage[] = [...PAGES];

  return (
    <View className="flex-1 flex-col">
      {/* Carousel area: fills all remaining space above footer */}
      <View
        style={{ flex: 1 }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          if (height !== carouselHeight) {
            setCarouselHeight(height);
          }
        }}
      >
        {carouselHeight > 0 && (
          <Carousel
            width={width}
            height={carouselHeight}
            data={CAROUSEL_DATA}
            onSnapToItem={(idx) => {
              setIndex(idx);
              setColor(CAROUSEL_DATA[idx]?.safeAreaColor);
            }}
            renderItem={({ item }) => {
              switch (item.kind) {
                case "sour": {
                  return <Sour sourDetails={item} />;
                }
                case "bitter": {
                  return <Bitter bitterDetails={item} />;
                }
                case "acidic": {
                  return <Acidic acidicDetails={item} />;
                }
                case "watery": {
                  return <TooWatery tooWateryDetails={item} />;
                }
                default: {
                  // This ensures exhaustiveness: if a new kind is added to TasteFeedbackPage,
                  // TypeScript will error here until you handle it.
                  return assertNever(item as never);
                }
              }
            }}
          />
        )}
      </View>

      {/* Footer: dots + button, only as tall as content */}
      <View className="flex-col justify-end m-6">
        <View className="flex-row justify-center py-3">
          {PAGES.map((_, i) => (
            <View
              className={`rounded-md mx-1 ${i === index
                ? "bg-[#010101] w-3 h-3"
                : "bg-[#CCCCCC] w-2 h-2"}`}
              key={i}
            />
          ))}
        </View>
        <Button text={t(R.buttonText)} onPress={onSubmit} />
      </View>
    </View>
  );
}