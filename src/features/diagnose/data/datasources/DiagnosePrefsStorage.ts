import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "diagnose_prefs";

type DiagnosePrefs = {
  hideExtractionDurationHint?: boolean;
};

export async function getHideExtractionDurationHint(): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Partial<DiagnosePrefs>;
    return Boolean(parsed.hideExtractionDurationHint);
  } catch (err) {
    console.error("[DiagnosePrefsStorage] Failed to read prefs", err);
    return false;
  }
}

export async function setHideExtractionDurationHint(value: boolean): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<DiagnosePrefs>) : {};
    const next: DiagnosePrefs = {
      ...parsed,
      hideExtractionDurationHint: value,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.error("[DiagnosePrefsStorage] Failed to persist prefs", err);
  }
}
