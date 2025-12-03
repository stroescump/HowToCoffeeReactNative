// src/domain/taste/tasteArchetype.ts

import { normalizeProfile, TasteProfile } from "./TasteProfile";

export type TasteArchetype =
  | 'bright_adventurer'
  | 'classic_drinker'
  | 'body_chaser'
  | 'balanced_explorer'
  | 'undefined';

export const TASTE_ARCHETYPE_LABELS: Record<TasteArchetype, string> = {
  bright_adventurer: 'Bright Adventurer',
  classic_drinker: 'Classic Drinker',
  body_chaser: 'Body Chaser',
  balanced_explorer: 'Balanced Explorer',
  undefined: 'Not enough data yet',
};

export function computeArchetype(profile: TasteProfile): TasteArchetype {
  if (profile.totalShots < 3) return 'undefined';

  const norm = normalizeProfile(profile);
  const { sour, bitter, watery, acidic } = norm;

  // Super simple v0 rules – tweak later
  if (sour + acidic > 0.6) return 'bright_adventurer';
  if (bitter > 0.4) return 'classic_drinker';
  if (watery > 0.3) return 'body_chaser';

  return 'balanced_explorer';
}