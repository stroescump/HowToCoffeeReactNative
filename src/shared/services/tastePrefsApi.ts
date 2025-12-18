import { TastePrefs } from "../domain/tastePrefs";
import { http } from "../lib/httpClient";

export async function postTastePrefs(prefs: TastePrefs): Promise<void> {
  try {
    await http("/onboarding-taste-prefs", {
      method: "POST",
      body: {
        acidity: prefs.acidityPreference,
        bitterness: prefs.bitternessPreference,
        drinkStyle: prefs.drinkStyle
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("[tastePrefsApi] Failed to POST taste prefs", err);
  }
}
