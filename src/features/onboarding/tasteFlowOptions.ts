import {
  AcidityPreference,
  BitternessPreference,
  BodyPreference,
  CleanFunkyPreference,
  CLEAN_FUNKY,
  DrinkStyle,
  DRINK_STYLE,
  TASTE_LEVEL,
  USER_EXPERIENCE,
  UserExperience,
  SweetnessPreference,
} from "@/src/shared/domain/tastePrefs";
import { ADVANCED_TAB, AdvancedTabId, PillOption, SliderOption } from "./types";

export const DRINK_STYLE_CHOICE = {
  ESPRESSO: "ESPRESSO",
  MILK_BASED: "MILK_BASED",
  FILTER: "FILTER",
  ALL: "ALL",
} as const;

export type DrinkStyleChoice = typeof DRINK_STYLE_CHOICE[keyof typeof DRINK_STYLE_CHOICE];

export const USER_EXPERIENCE_OPTIONS = [
  { value: USER_EXPERIENCE.BEGINNER, label: "BEGINNER" },
  { value: USER_EXPERIENCE.ADVANCED, label: "ADVANCED" },
] satisfies SliderOption<UserExperience>[];

export const BITTERNESS_OPTIONS = [
  { value: TASTE_LEVEL.LOW, label: "LOW" },
  { value: TASTE_LEVEL.MEDIUM, label: "MEDIUM" },
  { value: TASTE_LEVEL.HIGH, label: "HIGH" },
] satisfies SliderOption<BitternessPreference>[];

export const DRINK_STYLE_OPTIONS = [
  { value: DRINK_STYLE_CHOICE.ESPRESSO, label: "ESPRESSO" },
  { value: DRINK_STYLE_CHOICE.MILK_BASED, label: "MILK-BASED" },
  { value: DRINK_STYLE_CHOICE.FILTER, label: "FILTER" },
  { value: DRINK_STYLE_CHOICE.ALL, label: "ALL" },
] satisfies SliderOption<DrinkStyleChoice>[];

export const BODY_OPTIONS = [
  { value: TASTE_LEVEL.LOW, label: "LOW" },
  { value: TASTE_LEVEL.MEDIUM, label: "MEDIUM" },
  { value: TASTE_LEVEL.HIGH, label: "HIGH" },
] satisfies SliderOption<BodyPreference>[];

export const SWEETNESS_OPTIONS = [
  { value: TASTE_LEVEL.LOW, label: "LOW" },
  { value: TASTE_LEVEL.MEDIUM, label: "MEDIUM" },
  { value: TASTE_LEVEL.HIGH, label: "HIGH" },
] satisfies SliderOption<SweetnessPreference>[];

export const ACIDITY_OPTIONS = [
  { value: TASTE_LEVEL.LOW, label: "LOW" },
  { value: TASTE_LEVEL.MEDIUM, label: "MEDIUM" },
  { value: TASTE_LEVEL.HIGH, label: "HIGH" },
] satisfies SliderOption<AcidityPreference>[];

export const FINISH_OPTIONS = [
  { value: CLEAN_FUNKY.CLEAN, label: "CLEAN" },
  { value: CLEAN_FUNKY.NEUTRAL, label: "NEUTRAL" },
  { value: CLEAN_FUNKY.FERMENTED, label: "FERMENTED" },
] satisfies SliderOption<CleanFunkyPreference>[];

export const ADVANCED_TABS = [
  { value: ADVANCED_TAB.BODY, label: "Body" },
  { value: ADVANCED_TAB.SWEETNESS, label: "Sweetness" },
  { value: ADVANCED_TAB.ACIDITY, label: "Acidity" },
  { value: ADVANCED_TAB.FINISH, label: "Finish" },
] satisfies PillOption<AdvancedTabId>[];

export const ADVANCED_DEFAULTS = {
  body: TASTE_LEVEL.MEDIUM as BodyPreference,
  sweetness: TASTE_LEVEL.MEDIUM as SweetnessPreference,
  acidity: TASTE_LEVEL.MEDIUM as AcidityPreference,
  cleanFunky: CLEAN_FUNKY.NEUTRAL as CleanFunkyPreference,
};

export type AdvancedKey = keyof typeof ADVANCED_DEFAULTS;

export const ADVANCED_TAB_KEYS: Record<AdvancedTabId, AdvancedKey> = {
  [ADVANCED_TAB.BODY]: "body",
  [ADVANCED_TAB.SWEETNESS]: "sweetness",
  [ADVANCED_TAB.ACIDITY]: "acidity",
  [ADVANCED_TAB.FINISH]: "cleanFunky",
};

export const ADVANCED_TAB_OPTIONS: Record<AdvancedTabId, SliderOption[]> = {
  [ADVANCED_TAB.BODY]: BODY_OPTIONS,
  [ADVANCED_TAB.SWEETNESS]: SWEETNESS_OPTIONS,
  [ADVANCED_TAB.ACIDITY]: ACIDITY_OPTIONS,
  [ADVANCED_TAB.FINISH]: FINISH_OPTIONS,
};

export const ADVANCED_TITLES: Record<AdvancedTabId, string> = {
  [ADVANCED_TAB.BODY]: "Body",
  [ADVANCED_TAB.SWEETNESS]: "Sweetness",
  [ADVANCED_TAB.ACIDITY]: "Acidity",
  [ADVANCED_TAB.FINISH]: "Taste finish",
};

export function mapDrinkStyle(value: DrinkStyleChoice): DrinkStyle {
  if (value === DRINK_STYLE_CHOICE.ESPRESSO) return DRINK_STYLE.ESPRESSO;
  if (value === DRINK_STYLE_CHOICE.MILK_BASED) return DRINK_STYLE.MILK_BASED;
  if (value === DRINK_STYLE_CHOICE.FILTER) return DRINK_STYLE.FILTER;
  return DRINK_STYLE.ALL;
}
