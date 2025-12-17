import { TastePrefs } from "../domain/tastePrefs";
import { http } from "../lib/httpClient";

export async function postTastePrefs(prefs: TastePrefs): Promise<void> {
  try {
    await http("/taste-prefs", {
      method: "POST",
      body: prefs,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("[tastePrefsApi] Failed to POST taste prefs", err);
  }
}
