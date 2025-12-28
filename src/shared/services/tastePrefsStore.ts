import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLEAN_FUNKY,
  DRINK_STYLE,
  TASTE_LEVEL,
  TastePrefs,
  USER_EXPERIENCE,
} from "../domain/tastePrefs";

const STORAGE_KEY = "howtocoffee:tastePrefs";

type StorageAdapter = Pick<typeof AsyncStorage, "getItem" | "setItem" | "removeItem">;

let storage: StorageAdapter = AsyncStorage;

export function setTastePrefsStorageOverride(adapter?: StorageAdapter) {
  storage = adapter ?? AsyncStorage;
}

export function createSkippedTastePrefs(): TastePrefs {
  return {
    userExperience: USER_EXPERIENCE.BEGINNER,
    bitterness: TASTE_LEVEL.MEDIUM,
    acidity: TASTE_LEVEL.MEDIUM,
    body: TASTE_LEVEL.MEDIUM,
    sweetness: TASTE_LEVEL.MEDIUM,
    cleanFunky: CLEAN_FUNKY.NEUTRAL,
    drinkStyle: DRINK_STYLE.ALL,
    createdAtMillis: Date.now(),
  };
}

export async function getTastePrefs(): Promise<TastePrefs | null> {
  try {
    const raw = await storage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<TastePrefs>;
    if (!parsed.userExperience || !parsed.bitterness) return null;
    return parsed as TastePrefs;
    /**
     * TODO: Remove for Production. Used to test Onboarding
     */
    // return null
  } catch (err) {
    console.error("[tastePrefsStore] Failed to read taste prefs", err);
    return null;
  }
}

export async function setTastePrefs(prefs: TastePrefs): Promise<void> {
  try {
    await storage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error("[tastePrefsStore] Failed to persist taste prefs", err);
  }
}

export async function clearTastePrefs(): Promise<void> {
  try {
    await storage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("[tastePrefsStore] Failed to clear taste prefs", err);
  }
}
