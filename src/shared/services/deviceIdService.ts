// src/shared/services/deviceIdService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'howtocoffee:device-id:v1';

let inMemoryDeviceId: string | null = null;

/**
 * Simple, deterministic-enough ID for MVP:
 * - timestamp (base36) + random (base36)
 * - prefixed so it's easy to recognize in logs
 *
 * If you later add a proper UUID library / auth, you can swap this out.
 */
function generateDeviceId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2);
    return `dev_${timestamp}_${random}`;
}

/**
 * Get or create a persistent device id.
 * - First tries in-memory cache
 * - Then AsyncStorage
 * - If nothing there, generates + saves a new one
 */
export async function getDeviceId(): Promise<string> {
    if (inMemoryDeviceId) {
        return inMemoryDeviceId;
    }

    try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
            inMemoryDeviceId = stored;
            return stored;
        }
    } catch {
        // If storage fails, we still want a usable id for this session
    }

    const newId = generateDeviceId();

    inMemoryDeviceId = newId;

    try {
        await AsyncStorage.setItem(STORAGE_KEY, newId);
    } catch {
        // Worst case: id is not persisted, but still works for this app session
    }

    return newId;
}

/**
 * Optional: for debugging / QA – clears the stored device id
 * so a new one will be generated next time.
 */
export async function resetDeviceId(): Promise<void> {
    inMemoryDeviceId = null;
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }
}