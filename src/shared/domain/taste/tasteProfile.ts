// src/domain/taste/tasteProfile.ts

import { TasteFeedback } from "@/src/features/diagnose/domain/valueObjects/TasteFeedback";

export type TasteProfile = {
    totalShots: number;
    sourCount: number;
    bitterCount: number;
    wateryCount: number;
    acidicCount: number;
};

export const EMPTY_TASTE_PROFILE: TasteProfile = {
    totalShots: 0,
    sourCount: 0,
    bitterCount: 0,
    wateryCount: 0,
    acidicCount: 0,
};

export type NormalizedTasteProfile = {
    sour: number;   // 0–1
    bitter: number;
    watery: number;
    acidic: number;
};

export function incrementProfile(
    profile: TasteProfile,
    taste: TasteFeedback,
): TasteProfile {
    const next: TasteProfile = { ...profile, totalShots: profile.totalShots + 1 };

    switch (taste) {
        case 'sour':
            next.sourCount += 1;
            break;
        case 'bitter':
            next.bitterCount += 1;
            break;
        case 'watery':
            next.wateryCount += 1;
            break;
        case 'acidic':
            next.acidicCount += 1;
            break;
    }

    return next;
}

export function normalizeProfile(profile: TasteProfile): NormalizedTasteProfile {
    const { totalShots, sourCount, bitterCount, wateryCount, acidicCount } = profile;

    if (totalShots === 0) {
        return { sour: 0, bitter: 0, watery: 0, acidic: 0 };
    }

    return {
        sour: sourCount / totalShots,
        bitter: bitterCount / totalShots,
        watery: wateryCount / totalShots,
        acidic: acidicCount / totalShots,
    };
}