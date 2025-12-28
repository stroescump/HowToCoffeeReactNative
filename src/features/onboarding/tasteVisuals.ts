import { ADVANCED_TAB, AdvancedTabId, VisualSpec } from "./types";

export const USER_EXPERIENCE_VISUALS: VisualSpec[] = [
  {
    shape: "circle",
    color: "#FFC857",
    accentColor: "#FF6B6B",
    label: "Baby bean",
  },
  {
    shape: "square",
    color: "#2EC4B6",
    accentColor: "#0EAD69",
    label: "Hulk bean",
  },
];

export const BITTERNESS_VISUALS: VisualSpec[] = [
  { shape: "circle", color: "#FFE29A", accentColor: "#FFB703", label: "Low" },
  { shape: "diamond", color: "#FF9F1C", accentColor: "#FF7A00", label: "Medium" },
  { shape: "triangle", color: "#FF595E", accentColor: "#C81D25", label: "High" },
];

export const DRINK_STYLE_VISUALS: VisualSpec[] = [
  { shape: "pill", color: "#8EECF5", accentColor: "#00BBF9", label: "Espresso" },
  { shape: "circle", color: "#FAD2E1", accentColor: "#F77FBE", label: "Milk-based" },
  { shape: "triangle", color: "#A0C4FF", accentColor: "#4361EE", label: "Filter" },
  { shape: "square", color: "#CAFFBF", accentColor: "#38B000", label: "All" },
];

export const ADVANCED_VISUALS: Record<AdvancedTabId, VisualSpec[]> = {
  [ADVANCED_TAB.BODY]: [
    { shape: "circle", color: "#CDB4DB", accentColor: "#9B5DE5", label: "Low body" },
    { shape: "square", color: "#FFC8DD", accentColor: "#F15BB5", label: "Medium body" },
    { shape: "diamond", color: "#BDE0FE", accentColor: "#00BBF9", label: "High body" },
  ],
  [ADVANCED_TAB.SWEETNESS]: [
    { shape: "circle", color: "#FFF3B0", accentColor: "#F77F00", label: "Low sweet" },
    { shape: "square", color: "#FFD6A5", accentColor: "#FF9F1C", label: "Medium sweet" },
    { shape: "diamond", color: "#FDFFB6", accentColor: "#BDB2FF", label: "High sweet" },
  ],
  [ADVANCED_TAB.ACIDITY]: [
    { shape: "circle", color: "#BDE0FE", accentColor: "#48BFE3", label: "Low acid" },
    { shape: "square", color: "#A2D2FF", accentColor: "#5E60CE", label: "Medium acid" },
    { shape: "triangle", color: "#90DBF4", accentColor: "#4EA8DE", label: "High acid" },
  ],
  [ADVANCED_TAB.FINISH]: [
    { shape: "pill", color: "#E9FF70", accentColor: "#70E000", label: "Clean" },
    { shape: "square", color: "#F1C0E8", accentColor: "#C77DFF", label: "Neutral" },
    { shape: "triangle", color: "#FFADAD", accentColor: "#FF5C8A", label: "Fermented" },
  ],
};
