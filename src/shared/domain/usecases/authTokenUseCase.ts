import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'howtocoffee:jwt:v1';

export async function getAuthToken(): Promise<string | null> {
    const devJwt = loadDevJwt();
    if (devJwt) {
        return devJwt;
    }

    try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return null;
        }
        return stored;
    } catch {
        return null;
    }
}

let cachedDevJwt: string | null | undefined;

function loadDevJwt(): string | null {
    if (!__DEV__) {
        return null;
    }

    if (cachedDevJwt !== undefined) {
        return cachedDevJwt;
    }

    try {
        // Dynamic require to avoid bundling dev-only config into prod.
        const mod = require("@/src/shared/config/devConfig") as {
            getDevJwt?: () => string | null;
        };
        cachedDevJwt = mod.getDevJwt ? mod.getDevJwt() : null;
    } catch {
        cachedDevJwt = null;
    }

    return cachedDevJwt;
}

export async function setAuthToken(token: string): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, token);
    } catch {
        // ignore storage failures
    }
}

export async function clearAuthToken(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore storage failures
    }
}
