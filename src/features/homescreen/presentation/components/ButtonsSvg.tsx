import { HomeScreenConfig } from "@/app/HomeScreenConfig";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Svg, { G } from "react-native-svg";
import { ButtonsSvgFirstRow } from "./ButtonsSvgFirstRow";
import { ButtonsSvgSecondRow } from "./ButtonsSvgSecondRow";
import { ButtonLabelConfig, buildLabelFromText } from "./ButtonsSvgLabels";

const FIGMA_HEIGHT = 746;
const FIGMA_WIDTH = 428;

type ButtonsSvgProps = {
  availableHeight: number;
  labels: {
    findYourTaste: ButtonLabelConfig;
    scanBag: ButtonLabelConfig;
    marketplace: ButtonLabelConfig;
    diagnoseBrew: ButtonLabelConfig;
    recipeAgenda: ButtonLabelConfig;
    coffeePlacesNearby: ButtonLabelConfig;
  };
  pendingDiagnoseCount?: number;
  onDiagnosePress?: () => void;
  onScanBagPress?: () => void;
};

export function ButtonsSvg({
  availableHeight,
  labels,
  pendingDiagnoseCount = 0,
  onDiagnosePress,
  onScanBagPress,
}: ButtonsSvgProps) {
  const router = useRouter();
  const [containerWidth, setContainerWidth] = useState(0);
  const { t } = useTranslation();

  if (availableHeight <= 0) return null;

  const aspectRatio = FIGMA_HEIGHT / FIGMA_WIDTH;
  const canUseSlice =
    containerWidth > 0 && availableHeight >= containerWidth * aspectRatio;

  const preserve = canUseSlice ? "xMidYMax slice" : "xMidYMax meet";

  const buildTranslatedLabel = (config: ButtonLabelConfig | undefined) => {
    const key = config?.label ?? "";
    const baseText = key ? t(key) : "";
    const text = config?.uppercase ? baseText.toUpperCase() : baseText;
    return buildLabelFromText(text, config);
  };

  const findYourTasteLabel = buildTranslatedLabel(labels?.findYourTaste);
  const scanBagLabel = buildTranslatedLabel(labels?.scanBag);
  const marketplaceLabel = buildTranslatedLabel(labels?.marketplace);
  const diagnoseBrewLabel = buildTranslatedLabel(labels?.diagnoseBrew);
  const recipeAgendaLabel = buildTranslatedLabel(labels?.recipeAgenda);
  const coffeePlacesNearbyLabel = buildTranslatedLabel(labels?.coffeePlacesNearby);

  return (
    <View
      style={{ width: "100%", height: availableHeight }}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w !== containerWidth) {
          setContainerWidth(w);
        }
      }}
    >
      {containerWidth > 0 && (
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${FIGMA_WIDTH} ${FIGMA_HEIGHT}`}
          preserveAspectRatio={preserve}
        >
          <G id="buttons-area">
            <ButtonsSvgFirstRow
              findYourTasteLabel={findYourTasteLabel}
              scanBagLabel={scanBagLabel}
              marketplaceLabel={marketplaceLabel}
              diagnoseBrewLabel={diagnoseBrewLabel}
              pendingDiagnoseCount={pendingDiagnoseCount}
              onFindYourTastePress={() => router.push("/findyourtaste")}
              onScanBagPress={() =>
                onScanBagPress ? onScanBagPress() : router.push("/scanbag")
              }
              onMarketplacePress={() => {
                if (HomeScreenConfig.isClickable) {
                  router.push("/marketplace");
                }
              }}
              onDiagnosePress={() =>
                onDiagnosePress ? onDiagnosePress() : router.push("/diagnose")
              }
            />
            <ButtonsSvgSecondRow
              recipeAgendaLabel={recipeAgendaLabel}
              coffeePlacesNearbyLabel={coffeePlacesNearbyLabel}
              onRecipeAgendaPress={() => router.push("/recipeagenda")}
              onCoffeePlacesPress={() => router.push("/coffeeplacesnearby")}
            />
          </G>
        </Svg>
      )}
    </View>
  );
}
