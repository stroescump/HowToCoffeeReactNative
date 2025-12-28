import React from "react";
import { AdvancedTabId, SliderOption, VisualSpec } from "../types";
import { ADVANCED_TABS } from "../tasteFlowOptions";
import { resolveIndex } from "../utils/resolveIndex";
import { ChunkySlider } from "./ChunkySlider";
import { PillTabs } from "./PillTabs";
import { TasteStepScaffold } from "./TasteStepScaffold";
import { TasteVisualStage } from "./TasteVisualStage";

type AdvancedTasteStepProps = {
  title: string;
  tab: AdvancedTabId;
  options: SliderOption[];
  value: string;
  visuals: VisualSpec[];
  onTabChange: (tab: AdvancedTabId) => void;
  onValueChange: (value: string) => void;
  onFinish: () => void;
  disabled: boolean;
};

export function AdvancedTasteStep({
  title,
  tab,
  options,
  value,
  visuals,
  onTabChange,
  onValueChange,
  onFinish,
  disabled,
}: AdvancedTasteStepProps) {
  return (
    <TasteStepScaffold
      title={title}
      headerSlot={
        <PillTabs
          options={ADVANCED_TABS}
          value={tab}
          onChange={onTabChange}
        />
      }
      visual={<TasteVisualStage visuals={visuals} index={resolveIndex(options, value, 1)} />}
      slider={<ChunkySlider options={options} value={value} onChange={onValueChange} />}
      ctaText="Finish"
      onCta={onFinish}
      ctaDisabled={disabled}
    />
  );
}
