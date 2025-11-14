// src/features/homescreen/presentation/components/ButtonsSvg.tsx
import { useRouter } from "expo-router";
import React from "react";
import Svg, { G, Path } from "react-native-svg";

const FIGMA_WIDTH = 428;
const FIGMA_HEIGHT = 746;

export function ButtonsSvg() {
  const router = useRouter();

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${FIGMA_WIDTH} ${FIGMA_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <G id="buttons-area">
        <G id="first-row-buttons">
          {/* BTN: Find your taste */}
          <G
            id="btn-find-your-taste"
            onPress={() => router.push("/findyourtaste")}
          >
            <Path
              d="M35 87.5C35 39.1751 74.1751 0 122.5 0C170.825 0 210 39.1751 210 87.5V369H128C76.6375 369 35 327.362 35 276V87.5Z"
              fill="#FC9401"
            />
          </G>

          <G id="first-row-right-column-buttons">
            {/* BTN: Coffee marketplace */}
            <G
              id="btn-coffee-market"
              onPress={() => router.push("/marketplace")}
            >
              <Path
                d="M218 99C218 50.6751 257.175 11.5 305.5 11.5V11.5C353.825 11.5 393 50.6751 393 99V99C393 147.325 353.825 186.5 305.5 186.5V186.5C257.175 186.5 218 147.325 218 99V99Z"
                fill="#FF5210"
              />
            </G>

            {/* BTN: Diagnose brew */}
            <G
              id="btn-diagnose-brew"
              onPress={() => router.push("/diagnose")}
            >
              <Path
                d="M218 287C218 235.638 259.638 194 311 194H393V276C393 327.362 351.362 369 300 369H218V287Z"
                fill="#010101"
              />
            </G>
          </G>
        </G>

        <G id="second-row-buttons">
          <G id="second-row-column-left">
            {/* BTN: Recipe agenda */}
            <G
              id="btn-recipe-agenda"
              onPress={() => router.push("/recipeagenda")}
            >
              <Path
                d="M35 464.5C35 416.175 74.1751 377 122.5 377H210V464.5C210 512.825 170.825 552 122.5 552V552C74.1751 552 35 512.825 35 464.5V464.5Z"
                fill="#010101"
              />
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
            >
              <Path
                d="M218 377H305.5C353.825 377 393 416.175 393 464.5C393 512.825 353.825 552 305.5 552C257.175 552 218 512.825 218 464.5V377Z"
                fill="#FF5210"
              />
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
  );
}