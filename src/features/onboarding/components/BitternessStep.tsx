import { BitternessPreference } from "@/src/shared/domain/tastePrefs";
import React from "react";
import { BITTERNESS_OPTIONS } from "../tasteFlowOptions";
import { BITTERNESS_VISUALS } from "../tasteVisuals";
import { resolveIndex } from "../utils/resolveIndex";
import { ChunkySlider } from "./ChunkySlider";
import { TasteStepScaffold } from "./TasteStepScaffold";
import { TasteVisualStage } from "./TasteVisualStage";

type BitternessStepProps = {
  value: BitternessPreference | null;
  onChange: (value: BitternessPreference) => void;
  onNext: () => void;
  disabled: boolean;
};

export function BitternessStep({
  value,
  onChange,
  onNext,
  disabled,
}: BitternessStepProps) {
  return (
    <TasteStepScaffold
      title="Bitterness preference"
      visual={
        <TasteVisualStage
          visuals={BITTERNESS_VISUALS}
          index={resolveIndex(BITTERNESS_OPTIONS, value, 1)}
        />
      }
      slider={
        <ChunkySlider
          options={BITTERNESS_OPTIONS}
          value={value}
          onChange={onChange}
        />
      }
      ctaText="Next"
      onCta={onNext}
      ctaDisabled={disabled}
    />
  );
}
