import {
  AcidityPreference,
  BitternessPreference,
  BodyPreference,
  CleanFunkyPreference,
  SweetnessPreference,
  UserExperience,
} from "@/src/shared/domain/tastePrefs";
import { TasteArchetype } from "./tasteArchetype";

export type BrewProfileOverview = {
  totalShots: number;
  sourCount: number;
  bitterCount: number;
  acidicCount: number;
};

export type TasteProfile = BrewProfileOverview;

export const EMPTY_TASTE_PROFILE: TasteProfile = {
  totalShots: 0,
  sourCount: 0,
  bitterCount: 0,
  acidicCount: 0,
};

export type TastePreference = {
  userExperience: UserExperience;
  bitterness: BitternessPreference;
  sweetness?: SweetnessPreference;
  body?: BodyPreference;
  acidity?: AcidityPreference;
  cleanFunky?: CleanFunkyPreference;
};

export type TasteProfileResponse = {
  profile: BrewProfileOverview;
  archetype: {
    type: TasteArchetype;
  };
  prefs?: TastePreference;
};

export type TastePreferenceUpdate = TastePreference;
