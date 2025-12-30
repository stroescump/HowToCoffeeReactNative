import React from "react";
import { G, Path } from "react-native-svg";
import { BuiltLabel, renderLabel } from "./ButtonsSvgLabels";

type ButtonsSvgSecondRowProps = {
  recipeAgendaLabel: BuiltLabel;
  coffeePlacesNearbyLabel: BuiltLabel;
  onRecipeAgendaPress: () => void;
  onCoffeePlacesPress: () => void;
};

export function ButtonsSvgSecondRow({
  recipeAgendaLabel,
  coffeePlacesNearbyLabel,
  onRecipeAgendaPress,
  onCoffeePlacesPress,
}: ButtonsSvgSecondRowProps) {
  return (
    <G id="second-row-buttons">
      <G id="second-row-column-left">
        <G
          id="btn-recipe-agenda"
          onPress={onRecipeAgendaPress}
          accessible
          accessibilityRole="button"
          accessibilityLabel={recipeAgendaLabel.lines.join(" ")}
        >
          <Path
            d="M35 464.5C35 416.175 74.1751 377 122.5 377H210V464.5C210 512.825 170.825 552 122.5 552V552C74.1751 552 35 512.825 35 464.5V464.5Z"
            fill="#010101"
          />
          {renderLabel(recipeAgendaLabel, { x: 122.5, y: 465 }, "recipe")}
        </G>

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
        <G
          id="btn-coffee-places-nearby"
          onPress={onCoffeePlacesPress}
          accessible
          accessibilityRole="button"
          accessibilityLabel={coffeePlacesNearbyLabel.lines.join(" ")}
        >
          <Path
            d="M218 377H305.5C353.825 377 393 416.175 393 464.5C393 512.825 353.825 552 305.5 552C257.175 552 218 512.825 218 464.5V377Z"
            fill="#FF5210"
          />
          {renderLabel(coffeePlacesNearbyLabel, { x: 305.5, y: 465 }, "coffeeNearby")}
        </G>

        <G id="do-not-import_2">
          <Path
            d="M218 653C218 601.638 259.638 560 311 560H393V642C393 693.362 351.362 735 300 735H218V653Z"
            fill="#FC9401"
          />
        </G>
      </G>
    </G>
  );
}
