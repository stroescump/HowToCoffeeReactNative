export const USER_EXPERIENCE = {
  BEGINNER: "BEGINNER",
  ADVANCED: "ADVANCED",
} as const;

export type UserExperience = typeof USER_EXPERIENCE[keyof typeof USER_EXPERIENCE];

export const TASTE_LEVEL = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type TasteLevel = typeof TASTE_LEVEL[keyof typeof TASTE_LEVEL];
export type AcidityPreference = TasteLevel;
export type BitternessPreference = TasteLevel;
export type BodyPreference = TasteLevel;
export type SweetnessPreference = TasteLevel;

export const CLEAN_FUNKY = {
  CLEAN: "CLEAN",
  NEUTRAL: "NEUTRAL",
  FERMENTED: "FERMENTED",
} as const;

export type CleanFunkyPreference = typeof CLEAN_FUNKY[keyof typeof CLEAN_FUNKY];

export const DRINK_STYLE = {
  ESPRESSO: "ESPRESSO",
  MILK_BASED: "MILK_BASED",
  FILTER: "FILTER",
  ALL: "ALL",
} as const;

export type DrinkStyle = typeof DRINK_STYLE[keyof typeof DRINK_STYLE];

export type TastePrefs = {
  userExperience: UserExperience;
  bitterness: BitternessPreference;
  acidity?: AcidityPreference;
  body?: BodyPreference;
  sweetness?: SweetnessPreference;
  cleanFunky?: CleanFunkyPreference;
  drinkStyle?: DrinkStyle;
  createdAtMillis?: number;
};
