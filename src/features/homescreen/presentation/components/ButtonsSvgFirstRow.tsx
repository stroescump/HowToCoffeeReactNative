import { HomeScreenConfig } from "@/app/HomeScreenConfig";
import React from "react";
import { Circle, G, Path, Text as SvgText } from "react-native-svg";
import { BuiltLabel, renderLabel } from "./ButtonsSvgLabels";

type ButtonsSvgFirstRowProps = {
  findYourTasteLabel: BuiltLabel;
  marketplaceLabel: BuiltLabel;
  diagnoseBrewLabel: BuiltLabel;
  pendingDiagnoseCount: number;
  onFindYourTastePress: () => void;
  onMarketplacePress: () => void;
  onDiagnosePress: () => void;
};

export function ButtonsSvgFirstRow({
  findYourTasteLabel,
  marketplaceLabel,
  diagnoseBrewLabel,
  pendingDiagnoseCount,
  onFindYourTastePress,
  onMarketplacePress,
  onDiagnosePress,
}: ButtonsSvgFirstRowProps) {
  return (
    <G id="first-row-buttons">
      <G
        id="btn-find-your-taste"
        onPress={onFindYourTastePress}
        accessible
        accessibilityRole="button"
        accessibilityLabel={findYourTasteLabel.lines.join(" ")}
      >
        <Path
          d="M35 87.5C35 39.1751 74.1751 0 122.5 0C170.825 0 210 39.1751 210 87.5V369H128C76.6375 369 35 327.362 35 276V87.5Z"
          fill="#FC9401"
        />
        {renderLabel(findYourTasteLabel, { x: 122.5, y: 200 }, "findYourTaste")}
      </G>

      <G id="first-row-right-column-buttons">
        <G
          id="btn-coffee-market"
          onPress={onMarketplacePress}
          accessible
          accessibilityRole="button"
          accessibilityLabel={marketplaceLabel.lines.join(" ")}
        >
          <Path
            d="M218 99C218 50.6751 257.175 11.5 305.5 11.5V11.5C353.825 11.5 393 50.6751 393 99V99C393 147.325 353.825 186.5 305.5 186.5V186.5C257.175 186.5 218 147.325 218 99V99Z"
            fill={HomeScreenConfig.buyCoffeeColor}
          />
          {renderLabel(marketplaceLabel, { x: 305.5, y: 99 }, "marketplace")}
        </G>

        <G
          id="btn-diagnose-brew"
          onPress={onDiagnosePress}
          accessible
          accessibilityRole="button"
          accessibilityLabel={[
            diagnoseBrewLabel.lines.join(" "),
            pendingDiagnoseCount > 0 ? `${pendingDiagnoseCount} pending session` : "",
          ]
            .filter(Boolean)
            .join(". ")}
        >
          <Path
            d="M218 287C218 235.638 259.638 194 311 194H393V276C393 327.362 351.362 369 300 369H218V287Z"
            fill="#010101"
          />
          {renderLabel(diagnoseBrewLabel, { x: 305.5, y: 285 }, "diagnose")}
          {pendingDiagnoseCount > 0 && (
            <G id="diagnose-badge">
              <Circle cx={378} cy={214} r={14} fill="#FF5210" />
              <SvgText
                x={378}
                y={219}
                fontSize={12}
                fontFamily={diagnoseBrewLabel.fontFamily}
                fill="#FFFFFF"
                textAnchor="middle"
              >
                {pendingDiagnoseCount > 9 ? "9+" : String(pendingDiagnoseCount)}
              </SvgText>
            </G>
          )}
        </G>
      </G>
    </G>
  );
}
