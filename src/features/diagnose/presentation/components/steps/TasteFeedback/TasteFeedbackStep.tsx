import Button from "@/src/shared/ui/components/buttons/Button";
import { usePopup } from "@/src/shared/ui/contextproviders/PopupContext";
import { useSafeAreaColor } from "@/src/shared/ui/contextproviders/SafeAreaColorContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import NoCoffeeExtracted from "./NoCoffeeExtracted";
import Acidic from "./substeps/Acidic";
import Bitter from "./substeps/Bitter";
import Sour from "./substeps/Sour";
import type { TasteFeedbackSubpage } from "./substeps/TasteFeedbackSubpage";
import { assertNever, PAGES, R, TasteKind } from "./substeps/TasteFeedbackSubpage";
import TooWatery from "./substeps/TooWatery";

type TasteFeedbackStepProps = {
  onSubmit: (tasteFeedback: TasteKind) => void;
  onMarkSuccessful?: () => void | Promise<void>;
};

export function TasteFeedbackStep({ onSubmit, onMarkSuccessful }: TasteFeedbackStepProps) {
  const { setColor } = useSafeAreaColor();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState<string>(PAGES[0]?.safeAreaColor ?? "#3B55FF");
  const { t } = useTranslation();
  const { showPopup } = usePopup();

  const CAROUSEL_DATA: TasteFeedbackSubpage[] = [...PAGES];

  const applyPageIndex = (idx: number) => {
    const page = PAGES[idx];
    if (!page) return;

    setIndex(idx);

    if (page.safeAreaColor) {
      setBackgroundColor(page.safeAreaColor);
      setColor(page.safeAreaColor);
    }
  };

  const handleSnapToItem = (idx: number) => {
    applyPageIndex(idx);
  };

  const handleOnSubmit = () => {
    const currentTasteFeedback = PAGES[index]?.kind
    if (currentTasteFeedback === undefined) {
      showPopup("Error", "Okay")
      return
    }
    onSubmit(currentTasteFeedback)
  }

  return (
    <View style={{ flex: 1, backgroundColor }}>
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
          <Carousel<TasteFeedbackSubpage>
            style={{ width: "100%", height: carouselHeight, justifyContent: "center" }}
            width={width}
            height={carouselHeight}
            data={CAROUSEL_DATA}
            loop={false}
            pagingEnabled
            snapEnabled
            onSnapToItem={handleSnapToItem}
            onProgressChange={(_, absoluteProgress) => {
              const maxIndex = PAGES.length - 1;
              const threshold = 0.2; // ~20% swipe
              const currentIndex = index;

              // Swipe forward: preview next page color once we move far enough
              if (absoluteProgress > currentIndex + threshold && currentIndex < maxIndex) {
                const nextIndex = currentIndex + 1;
                const nextPage = PAGES[nextIndex];
                if (nextPage?.safeAreaColor && nextPage.safeAreaColor !== backgroundColor) {
                  setBackgroundColor(nextPage.safeAreaColor);
                  setColor(nextPage.safeAreaColor);
                }
              }

              // Swipe backward: preview previous page color once we move far enough
              if (absoluteProgress < currentIndex - threshold && currentIndex > 0) {
                const prevIndex = currentIndex - 1;
                const prevPage = PAGES[prevIndex];
                if (prevPage?.safeAreaColor && prevPage.safeAreaColor !== backgroundColor) {
                  setBackgroundColor(prevPage.safeAreaColor);
                  setColor(prevPage.safeAreaColor);
                }
              }
            }}
            renderItem={({ item }) => {
              switch (item.kind) {
                case "SOUR": {
                  return <Sour sourDetails={item} />;
                }
                case "BITTER": {
                  return <Bitter bitterDetails={item} />;
                }
                case "ACIDIC": {
                  return <Acidic acidicDetails={item} />;
                }
                case "WATERY": {
                  return <TooWatery tooWateryDetails={item} />;
                }
                case "NO_COFFEE": {
                  return <NoCoffeeExtracted noCoffeeDetails={item} />
                }
                default: {
                  return assertNever(item);
                }
              }
            }}
          />
        )}
      </View>

      <View className="flex-col justify-end m-6">
        <View className="flex-row justify-center py-3">
          {PAGES.map((_, i) => (
            <View
              className={`rounded-md mx-1 ${i === index ? "bg-[#010101] w-3 h-3" : "bg-[#CCCCCC] w-2 h-2"
                }`}
              key={i}
            />
          ))}
        </View>
        <Button text={t(R.buttonText)} onPress={handleOnSubmit} />
        {onMarkSuccessful && (
          <Button
            className="mt-3"
            variant="ghost"
            text={t(R.happyWithResultButton)}
            onPress={onMarkSuccessful}
          />
        )}
      </View>
    </View>
  );
}
