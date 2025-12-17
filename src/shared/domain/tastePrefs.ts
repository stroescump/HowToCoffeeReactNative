export type AcidityPreference = "LIKES" | "NEUTRAL" | "DISLIKES";

export type BitternessPreference = "LIKES" | "NEUTRAL" | "DISLIKES";

export type DrinkStyle = "ESPRESSO_STRAIGHT" | "WITH_MILK" | "DEPENDS";

export type TastePrefs = {
  acidityPreference: AcidityPreference;
  bitternessPreference?: BitternessPreference;
  drinkStyle?: DrinkStyle;
  createdAtMillis: number;
};
