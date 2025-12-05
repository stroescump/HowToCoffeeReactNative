// src/domain/taste/tasteProfile.ts


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
