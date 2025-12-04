// src/services/tasteProfileStorage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { EMPTY_TASTE_PROFILE, TasteProfile } from '../domain/taste/tasteProfile';

const STORAGE_KEY = 'howtocoffee:tasteProfile:v1';

export async function loadTasteProfile(): Promise<TasteProfile> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_TASTE_PROFILE;

    const parsed = JSON.parse(raw) as TasteProfile;
    // Minimal defensive check
    if (typeof parsed.totalShots !== 'number') {
      return EMPTY_TASTE_PROFILE;
    }
    return parsed;
  } catch {
    return EMPTY_TASTE_PROFILE;
  }
}

export async function saveTasteProfile(profile: TasteProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // we can ignore or add a logging hook later
  }
}