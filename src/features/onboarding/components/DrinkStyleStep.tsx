import React from "react";
import { DRINK_STYLE_OPTIONS, DrinkStyleChoice } from "../tasteFlowOptions";
import { DRINK_STYLE_VISUALS } from "../tasteVisuals";
import { resolveIndex } from "../utils/resolveIndex";
import { ChunkySlider } from "./ChunkySlider";
import { TasteStepScaffold } from "./TasteStepScaffold";
import { TasteVisualStage } from "./TasteVisualStage";

type DrinkStyleStepProps = {
  value: DrinkStyleChoice | null;
  onChange: (value: DrinkStyleChoice) => void;
  onNext: () => void;
  disabled: boolean;
};

export function DrinkStyleStep({
  value,
  onChange,
  onNext,
  disabled,
}: DrinkStyleStepProps) {
  return (
    <TasteStepScaffold
      title="How do you serve your coffee?"
      visual={
        <TasteVisualStage
          visuals={DRINK_STYLE_VISUALS}
          index={resolveIndex(DRINK_STYLE_OPTIONS, value, 0)}
        />
      }
      slider={
        <ChunkySlider
          options={DRINK_STYLE_OPTIONS}
          value={value}
          onChange={onChange}
        />
      }
      ctaText="Finish"
      onCta={onNext}
      ctaDisabled={disabled}
    />
  );
}
