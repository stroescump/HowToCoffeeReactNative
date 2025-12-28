export type SliderOption<T extends string = string> = {
  value: T;
  label: string;
};

export type PillOption<T extends string = string> = {
  value: T;
  label: string;
};

export const ADVANCED_TAB = {
  BODY: "BODY",
  SWEETNESS: "SWEETNESS",
  ACIDITY: "ACIDITY",
  FINISH: "FINISH",
} as const;

export type AdvancedTabId = typeof ADVANCED_TAB[keyof typeof ADVANCED_TAB];

export type VisualShape = "circle" | "square" | "triangle" | "diamond" | "pill";

export type VisualSpec = {
  shape: VisualShape;
  color: string;
  accentColor?: string;
  label: string;
};
