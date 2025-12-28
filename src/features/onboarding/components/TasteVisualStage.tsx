import React from "react";
import { View } from "react-native";
import { VisualSpec } from "../types";
import { AnimatedSwap } from "./AnimatedSwap";
import { PlaceholderVisual } from "./PlaceholderVisual";

type TasteVisualStageProps = {
  visuals: VisualSpec[];
  index: number;
};

export function TasteVisualStage({ visuals, index }: TasteVisualStageProps) {
  const items = visuals.map((spec, i) => (
    <View key={`${spec.label}-${i}`} className="flex-1">
      <PlaceholderVisual {...spec} />
    </View>
  ));

  return <AnimatedSwap index={index} items={items} />;
}
