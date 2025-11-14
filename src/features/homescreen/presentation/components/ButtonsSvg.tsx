import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import Svg, { G, Path, Text as SvgText, TSpan } from "react-native-svg";

const FIGMA_HEIGHT = 746;
const FIGMA_WIDTH = 428;

type ButtonLabelConfig = {
  label?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  letterSpacing?: number;
  uppercase?: boolean;
  lineHeight?: number;
};

type BuiltLabel = {
  lines: string[];
  fontSize: number;
  fontFamily: string;
  fill: string;
  letterSpacing: number;
  lineHeight: number;
};

function buildLabel(
  config: ButtonLabelConfig | undefined,
  fallback: string
): BuiltLabel {
  const baseText = config?.label ?? fallback;
  const text = config?.uppercase ? baseText.toUpperCase() : baseText;

  const lines = text.split("\n");

  const fontSize = config?.fontSize ?? 20;
  const lineHeight = config?.lineHeight ?? fontSize;

  return {
    lines,
    fontSize,
    fontFamily: config?.fontFamily ? config?.fontFamily : "",
    fill: config?.fill ?? "#000000",
    letterSpacing: config?.letterSpacing ?? 0,
    lineHeight,
  };
}

type ButtonsSvgProps = {
  availableHeight: number,
  labels?: {
    findYourTaste?: ButtonLabelConfig;
    marketplace?: ButtonLabelConfig;
    diagnoseBrew?: ButtonLabelConfig;
    recipeAgenda?: ButtonLabelConfig;
    coffeePlacesNearby?: ButtonLabelConfig;
  };
};

type LabelPosition = {
  x: number;
  y: number;
};

function renderLabel(
  built: BuiltLabel,
  pos: LabelPosition,
  keyPrefix: string
) {
  const linesCount = built.lines.length;
  const totalHeight = (linesCount - 1) * built.lineHeight;

  // small baseline correction – împinge textul puțin în jos
  const baselineCorrection = built.fontSize * 0.25; // joacă-te între 0.25–0.35

  // pos.y = centrul vizual al label-ului
  const startY = pos.y - totalHeight / 2 + baselineCorrection;

  return (
    <SvgText
      x={pos.x}
      y={startY}
      fontSize={built.fontSize}
      fontFamily={built.fontFamily}
      fill={built.fill}
      textAnchor="middle"
      letterSpacing={built.letterSpacing}
    >
      {built.lines.map((line, idx) => (
        <TSpan
          key={`${keyPrefix}-${idx}`}
          x={pos.x}
          y={startY + idx * built.lineHeight}
        >
          {line}
        </TSpan>
      ))}
    </SvgText>
  );
}

export function ButtonsSvg({ availableHeight, labels }: ButtonsSvgProps) {
  const router = useRouter();
  const [containerWidth, setContainerWidth] = useState(0);
  if (availableHeight <= 0) return null;

  const aspectRatio = FIGMA_HEIGHT / FIGMA_WIDTH;
  const canUseSlice =
    containerWidth > 0 && availableHeight >= containerWidth * aspectRatio;

  const preserve = canUseSlice ? "xMidYMax slice" : "xMidYMax meet";

  const findYourTasteLabel = buildLabel(
    labels?.findYourTaste,
    "find your\ntaste"
  );
  const marketplaceLabel = buildLabel(
    labels?.marketplace,
    "buy\ncoffee"
  );
  const diagnoseBrewLabel = buildLabel(
    labels?.diagnoseBrew,
    "diagnose\nbrew"
  );
  const recipeAgendaLabel = buildLabel(
    labels?.recipeAgenda,
    "recipe\nagenda"
  );
  const coffeePlacesNearbyLabel = buildLabel(
    labels?.coffeePlacesNearby,
    "coffee\nplaces\nnearby"
  );

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
            <G id="first-row-buttons">
              {/* BTN: Find your taste */}
              <G
                id="btn-find-your-taste"
                onPress={() => router.push("/findyourtaste")}
                accessible
                accessibilityRole="button"
                accessibilityLabel={findYourTasteLabel.lines.join(" ")}
              >
                <Path
                  d="M35 87.5C35 39.1751 74.1751 0 122.5 0C170.825 0 210 39.1751 210 87.5V369H128C76.6375 369 35 327.362 35 276V87.5Z"
                  fill="#FC9401"
                />
                {renderLabel(
                  findYourTasteLabel,
                  { x: 122.5, y: 200 },
                  "findYourTaste"
                )}
              </G>

              <G id="first-row-right-column-buttons">
                {/* BTN: Coffee marketplace */}
                <G
                  id="btn-coffee-market"
                  onPress={() => router.push("/marketplace")}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={marketplaceLabel.lines.join(" ")}
                >
                  <Path
                    d="M218 99C218 50.6751 257.175 11.5 305.5 11.5V11.5C353.825 11.5 393 50.6751 393 99V99C393 147.325 353.825 186.5 305.5 186.5V186.5C257.175 186.5 218 147.325 218 99V99Z"
                    fill="#FF5210"
                  />
                  {renderLabel(
                    marketplaceLabel,
                    { x: 305.5, y: 99 }, // 99 e centrul pe Y al pilulei
                    "marketplace"
                  )}
                </G>

                {/* BTN: Diagnose brew */}
                <G
                  id="btn-diagnose-brew"
                  onPress={() => router.push("/diagnose")}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={diagnoseBrewLabel.lines.join(" ")}
                >
                  <Path
                    d="M218 287C218 235.638 259.638 194 311 194H393V276C393 327.362 351.362 369 300 369H218V287Z"
                    fill="#010101"
                  />
                  {renderLabel(
                    diagnoseBrewLabel,
                    { x: 305.5, y: 285 },
                    "diagnose"
                  )}
                </G>
              </G>
            </G>

            <G id="second-row-buttons">
              <G id="second-row-column-left">
                {/* BTN: Recipe agenda */}
                <G
                  id="btn-recipe-agenda"
                  onPress={() => router.push("/recipeagenda")}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={recipeAgendaLabel.lines.join(" ")}
                >
                  <Path
                    d="M35 464.5C35 416.175 74.1751 377 122.5 377H210V464.5C210 512.825 170.825 552 122.5 552V552C74.1751 552 35 512.825 35 464.5V464.5Z"
                    fill="#010101"
                  />
                  {renderLabel(
                    recipeAgendaLabel,
                    { x: 122.5, y: 465 },
                    "recipe"
                  )}
                </G>

                {/* do-not-import → lăsat decor, fără onPress */}
                <G id="do-not-import">
                  <G id="Drop">
                    <Path
                      d="M35 560H117C168.362 560 210 601.638 210 653V735H128C76.6375 735 35 693.362 35 642V560Z"
                      fill="#010101"
                    />
                  </G>
                </G>
              </G>

              <G id="second-row-column-right">
                {/* BTN: Coffee places nearby */}
                <G
                  id="btn-coffee-places-nearby"
                  onPress={() => router.push("/coffeeplacesnearby")}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={coffeePlacesNearbyLabel.lines.join(" ")}
                >
                  <Path
                    d="M218 377H305.5C353.825 377 393 416.175 393 464.5C393 512.825 353.825 552 305.5 552C257.175 552 218 512.825 218 464.5V377Z"
                    fill="#FF5210"
                  />
                  {renderLabel(
                    coffeePlacesNearbyLabel,
                    { x: 305.5, y: 465 },
                    "coffeeNearby"
                  )}
                </G>

                {/* do-not-import_2 → decor only */}
                <G id="do-not-import_2">
                  <Path
                    d="M218 653C218 601.638 259.638 560 311 560H393V642C393 693.362 351.362 735 300 735H218V653Z"
                    fill="#FC9401"
                  />
                </G>
              </G>
            </G>
          </G>
        </Svg>
      )}
    </View>
  );
}