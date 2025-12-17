import AsyncStorage from "@react-native-async-storage/async-storage";
import { TastePrefs } from "../domain/tastePrefs";

const STORAGE_KEY = "howtocoffee:tastePrefs";

type StorageAdapter = Pick<typeof AsyncStorage, "getItem" | "setItem" | "removeItem">;

let storage: StorageAdapter = AsyncStorage;

export function setTastePrefsStorageOverride(adapter?: StorageAdapter) {
  storage = adapter ?? AsyncStorage;
}

export function createSkippedTastePrefs(): TastePrefs {
  return {
    acidityPreference: "NEUTRAL",
    createdAtMillis: Date.now(),
  };
}

export async function getTastePrefs(): Promise<TastePrefs | null> {
  try {
    const raw = await storage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<TastePrefs>;
    if (!parsed.acidityPreference || !parsed.createdAtMillis) return null;

    return parsed as TastePrefs;
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
