import {
  BitternessPreference,
  TastePrefs,
  USER_EXPERIENCE,
  UserExperience,
} from "@/src/shared/domain/tastePrefs";
import { postTastePrefs } from "@/src/shared/services/tastePrefsApi";
import { setTastePrefs } from "@/src/shared/services/tastePrefsStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ADVANCED_DEFAULTS,
  ADVANCED_TAB_KEYS,
  ADVANCED_TAB_OPTIONS,
  ADVANCED_TITLES,
  DrinkStyleChoice,
  mapDrinkStyle,
} from "../tasteFlowOptions";
import { TASTE_STEP, TasteStepKey } from "../tasteFlowState";
import { ADVANCED_TAB, AdvancedTabId, SliderOption } from "../types";

type AdvancedPrefs = typeof ADVANCED_DEFAULTS;

type TasteOnboardingFlow = {
  step: TasteStepKey;
  userExperience: UserExperience | null;
  bitterness: BitternessPreference | null;
  drinkStyle: DrinkStyleChoice | null;
  advancedTab: AdvancedTabId;
  activeAdvancedOptions: SliderOption[];
  activeAdvancedValue: string;
  advancedTitle: string;
  busy: boolean;
  nextDisabled: boolean;
  onUserExperienceChange: (value: UserExperience) => void;
  onBitternessChange: (value: BitternessPreference) => void;
  onDrinkStyleChange: (value: DrinkStyleChoice) => void;
  onAdvancedTabChange: (value: AdvancedTabId) => void;
  onAdvancedValueChange: (value: string) => void;
  onNext: () => void;
};

export function useTasteOnboardingFlow(): TasteOnboardingFlow {
  const router = useRouter();
  const [step, setStep] = useState<TasteStepKey>(TASTE_STEP.EXPERIENCE);
  const [userExperience, setUserExperience] = useState<UserExperience | null>(null);
  const [bitterness, setBitterness] = useState<BitternessPreference | null>(null);
  const [drinkStyle, setDrinkStyle] = useState<DrinkStyleChoice | null>(null);
  const [advancedTab, setAdvancedTab] = useState<AdvancedTabId>(ADVANCED_TAB.BODY);
  const [advancedPrefs, setAdvancedPrefs] = useState<AdvancedPrefs>(ADVANCED_DEFAULTS);
  const [busy, setBusy] = useState(false);

  const activeAdvancedKey = ADVANCED_TAB_KEYS[advancedTab];
  const activeAdvancedOptions = ADVANCED_TAB_OPTIONS[advancedTab];
  const activeAdvancedValue = advancedPrefs[activeAdvancedKey];
  const advancedTitle = ADVANCED_TITLES[advancedTab];

  const isExperienceStep = step === TASTE_STEP.EXPERIENCE;
  const isBitternessStep = step === TASTE_STEP.BITTERNESS;
  const isDrinkStyleStep = step === TASTE_STEP.DRINK_STYLE;
  const isBeginnerExperience = userExperience === USER_EXPERIENCE.BEGINNER;

  const hasRequiredSelection = (() => {
    if (isExperienceStep) return Boolean(userExperience);
    if (isBitternessStep) return Boolean(bitterness);
    if (isDrinkStyleStep) return Boolean(drinkStyle);
    return true;
  })();

  const nextDisabled = busy || !hasRequiredSelection;

  const persistAndExit = async (prefs: TastePrefs) => {
    setBusy(true);
    await setTastePrefs(prefs);
    postTastePrefs(prefs);
    setBusy(false);
    router.replace("/");
  };

  const handleFinish = async () => {
    if (!userExperience || !bitterness || busy) return;
    const prefs: TastePrefs = {
      userExperience,
      bitterness,
      createdAtMillis: Date.now(),
    };
    if (userExperience === USER_EXPERIENCE.BEGINNER) {
      prefs.drinkStyle = drinkStyle ? mapDrinkStyle(drinkStyle) : undefined;
    } else {
      prefs.body = advancedPrefs.body;
      prefs.sweetness = advancedPrefs.sweetness;
      prefs.acidity = advancedPrefs.acidity;
      prefs.cleanFunky = advancedPrefs.cleanFunky;
    }
    await persistAndExit(prefs);
  };

  const handleNext = async () => {
    if (busy) return;
    if (isExperienceStep) {
      setStep(TASTE_STEP.BITTERNESS);
      return;
    }
    if (isBitternessStep) {
      setStep(isBeginnerExperience ? TASTE_STEP.DRINK_STYLE : TASTE_STEP.ADVANCED);
      return;
    }
    await handleFinish();
  };

  const handleAdvancedChange = (value: string) => {
    setAdvancedPrefs((prev) => ({
      ...prev,
      [activeAdvancedKey]: value as AdvancedPrefs[keyof AdvancedPrefs],
    }));
  };

  const handleUserExperienceChange = (value: UserExperience) => {
    setUserExperience(value);
  };

  const handleBitternessChange = (value: BitternessPreference) => {
    setBitterness(value);
  };

  const handleDrinkStyleChange = (value: DrinkStyleChoice) => {
    setDrinkStyle(value);
  };

  return {
    step,
    userExperience,
    bitterness,
    drinkStyle,
    advancedTab,
    activeAdvancedOptions,
    activeAdvancedValue,
    advancedTitle,
    busy,
    nextDisabled,
    onUserExperienceChange: handleUserExperienceChange,
    onBitternessChange: handleBitternessChange,
    onDrinkStyleChange: handleDrinkStyleChange,
    onAdvancedTabChange: setAdvancedTab,
    onAdvancedValueChange: handleAdvancedChange,
    onNext: handleNext,
  };
}
