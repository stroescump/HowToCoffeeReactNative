import { TastePrefs } from "../domain/tastePrefs";
import { http } from "../lib/httpClient";

export async function postTastePrefs(prefs: TastePrefs): Promise<void> {
  try {
    await http("/onboarding-taste-prefs", {
      method: "POST",
      body: {
        userExperience: prefs.userExperience,
        bitterness: prefs.bitterness,
        acidity: prefs.acidity,
        body: prefs.body,
        sweetness: prefs.sweetness,
        cleanFunky: prefs.cleanFunky,
        drinkStyle: prefs.drinkStyle,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("[tastePrefsApi] Failed to POST taste prefs", err);
  }
}
