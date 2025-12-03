// src/state/TasteProfileContext.tsx

import { TasteFeedback } from '@/src/features/diagnose/domain/valueObjects/TasteFeedback';
import { loadTasteProfile, saveTasteProfile } from '@/src/services/tasteProfileStorage';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TasteArchetype, computeArchetype } from '../../domain/taste/tasteArchetype';
import { EMPTY_TASTE_PROFILE, TasteProfile, incrementProfile, normalizeProfile } from '../../domain/taste/tasteProfile';

type TasteProfileContextValue = {
  profile: TasteProfile;
  normalized: ReturnType<typeof normalizeProfile>;
  archetype: TasteArchetype;
  isLoaded: boolean;
  updateFromTasteFeedback: (taste: TasteFeedback) => Promise<void>;
  resetProfile: () => Promise<void>;
};

const TasteProfileContext = createContext<TasteProfileContextValue | undefined>(
  undefined,
);

export function TasteProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<TasteProfile>(EMPTY_TASTE_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const loaded = await loadTasteProfile();
      setProfile(loaded);
      setIsLoaded(true);
    })();
  }, []);

  const handleUpdate = async (taste: TasteFeedback) => {
    const next = incrementProfile(profile, taste);
    setProfile(next);
    await saveTasteProfile(next);
  };

  const handleReset = async () => {
    setProfile(EMPTY_TASTE_PROFILE);
    await saveTasteProfile(EMPTY_TASTE_PROFILE);
  };

  const normalized = normalizeProfile(profile);
  const archetype = computeArchetype(profile);

  const value: TasteProfileContextValue = {
    profile,
    normalized,
    archetype,
    isLoaded,
    updateFromTasteFeedback: handleUpdate,
    resetProfile: handleReset,
  };

  return (
    <TasteProfileContext.Provider value={value}>
      {children}
    </TasteProfileContext.Provider>
  );
}

export function useTasteProfile(): TasteProfileContextValue {
  const ctx = useContext(TasteProfileContext);
  if (!ctx) {
    throw new Error('useTasteProfile must be used within a TasteProfileProvider');
  }
  return ctx;
}