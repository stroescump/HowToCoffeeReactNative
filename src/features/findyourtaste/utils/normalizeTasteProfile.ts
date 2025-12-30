import { ADVANCED_DEFAULTS } from "@/src/features/onboarding/tasteFlowOptions";
import {
  TASTE_LEVEL,
  USER_EXPERIENCE,
  UserExperience,
} from "@/src/shared/domain/tastePrefs";
import { TasteProfilePrefs, TasteProfileResponse } from "@/src/shared/domain/models/taste/tasteProfile";

const DEFAULT_BITTERNESS = TASTE_LEVEL.MEDIUM;

export function normalizeTasteProfile(
  response: TasteProfileResponse,
): TasteProfileResponse {
  const basePrefs: TasteProfilePrefs = response.prefs ?? {
    userExperience: USER_EXPERIENCE.BEGINNER,
    bitterness: DEFAULT_BITTERNESS,
  };

  return {
    ...response,
    prefs: {
      ...basePrefs,
      userExperience: basePrefs.userExperience ?? USER_EXPERIENCE.BEGINNER,
      bitterness: basePrefs.bitterness ?? DEFAULT_BITTERNESS,
      body: basePrefs.body ?? ADVANCED_DEFAULTS.body,
      sweetness: basePrefs.sweetness ?? ADVANCED_DEFAULTS.sweetness,
      acidity: basePrefs.acidity ?? ADVANCED_DEFAULTS.acidity,
      cleanFunky: basePrefs.cleanFunky ?? ADVANCED_DEFAULTS.cleanFunky,
    },
  };
}

export function applyExperienceChange(
  prefs: TasteProfilePrefs,
  nextExperience: UserExperience,
): TasteProfilePrefs {
  if (nextExperience === USER_EXPERIENCE.ADVANCED) {
    return {
      ...prefs,
      userExperience: nextExperience,
      bitterness: prefs.bitterness ?? DEFAULT_BITTERNESS,
      body: prefs.body ?? ADVANCED_DEFAULTS.body,
      sweetness: prefs.sweetness ?? ADVANCED_DEFAULTS.sweetness,
      acidity: prefs.acidity ?? ADVANCED_DEFAULTS.acidity,
      cleanFunky: prefs.cleanFunky ?? ADVANCED_DEFAULTS.cleanFunky,
    };
  }

  return {
    ...prefs,
    userExperience: nextExperience,
    bitterness: prefs.bitterness ?? DEFAULT_BITTERNESS,
    ...ADVANCED_DEFAULTS,
  };
}
