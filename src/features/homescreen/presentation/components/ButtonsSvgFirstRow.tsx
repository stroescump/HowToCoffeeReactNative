import { HomeScreenConfig } from "@/app/HomeScreenConfig";
import React from "react";
import { Circle, G, Path, Text as SvgText } from "react-native-svg";
import { BuiltLabel, renderLabel } from "./ButtonsSvgLabels";

type ButtonsSvgFirstRowProps = {
  findYourTasteLabel: BuiltLabel;
  scanBagLabel: BuiltLabel;
  marketplaceLabel: BuiltLabel;
  diagnoseBrewLabel: BuiltLabel;
  pendingDiagnoseCount: number;
  onFindYourTastePress: () => void;
  onScanBagPress: () => void;
  onMarketplacePress: () => void;
  onDiagnosePress: () => void;
};

export function ButtonsSvgFirstRow({
  findYourTasteLabel,
  scanBagLabel,
  marketplaceLabel,
  diagnoseBrewLabel,
  pendingDiagnoseCount,
  onFindYourTastePress,
  onScanBagPress,
  onMarketplacePress,
  onDiagnosePress,
}: ButtonsSvgFirstRowProps) {
  return (
    <G id="first-row-buttons">
      <G id="first-row-left-column-buttons">
        <G
          id="btn-scan-bag"
          onPress={onScanBagPress}
          accessible
          accessibilityRole="button"
          accessibilityLabel={scanBagLabel.lines.join(" ")}
        >
          <Path
            d="M35 11.5H122.5A87.5 87.5 0 0 1 122.5 186.5H35V11.5Z"
            fill={HomeScreenConfig.scanBagColor}
          />
          {renderLabel(scanBagLabel, { x: 122.5, y: 99 }, "scanBag")}
        </G>

        <G
          id="btn-find-your-taste"
          onPress={onFindYourTastePress}
          accessible
          accessibilityRole="button"
          accessibilityLabel={findYourTasteLabel.lines.join(" ")}
        >
          <Path
            d="M218 287C218 235.638 259.638 194 311 194H393V276C393 327.362 351.362 369 300 369H218V287Z"
            fill="#FC9401"
            transform="translate(428 0) scale(-1 1)"
          />
          {renderLabel(findYourTasteLabel, { x: 122.5, y: 285 }, "findYourTaste")}
        </G>
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
