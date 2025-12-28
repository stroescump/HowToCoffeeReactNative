export const TASTE_STEP = {
  EXPERIENCE: "experience",
  BITTERNESS: "bitterness",
  DRINK_STYLE: "drinkStyle",
  ADVANCED: "advanced",
} as const;

export type TasteStepKey = typeof TASTE_STEP[keyof typeof TASTE_STEP];
