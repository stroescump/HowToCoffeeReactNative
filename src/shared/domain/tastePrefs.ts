export type AcidityPreference = "LIKES" | "NEUTRAL" | "DISLIKES";

export type BitternessPreference = "LIKES" | "NEUTRAL" | "DISLIKES";

export type DrinkStyle = "ESPRESSO" | "MILK_BASED" | "BOTH";

export type TastePrefs = {
  acidityPreference: AcidityPreference;
  bitternessPreference?: BitternessPreference;
  drinkStyle?: DrinkStyle;
};
