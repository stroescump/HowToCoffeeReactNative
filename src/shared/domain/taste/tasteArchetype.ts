// src/domain/taste/tasteArchetype.ts

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