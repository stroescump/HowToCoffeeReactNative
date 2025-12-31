import { TasteDowngradeModal } from "@/src/features/findyourtaste/presentation/components/TasteDowngradeModal";
import { TasteExperienceToggle } from "@/src/features/findyourtaste/presentation/components/TasteExperienceToggle";
import { TastePreferenceSection } from "@/src/features/findyourtaste/presentation/components/TastePreferenceSection";
import { TasteProfileHeader } from "@/src/features/findyourtaste/presentation/components/TasteProfileHeader";
import {
  applyExperienceChange,
  normalizeTasteProfile,
} from "@/src/features/findyourtaste/utils/normalizeTasteProfile";
import { TastePreference, TasteProfileResponse } from "@/src/shared/domain/models/taste/tasteProfile";
import { USER_EXPERIENCE, UserExperience } from "@/src/shared/domain/tastePrefs";
import { queryClient } from "@/src/shared/lib/queryClient";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export function FindYourTasteScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<TasteProfileResponse | null>(null);
  const [prefsDraft, setPrefsDraft] = useState<TastePreference | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDowngradeModal, setShowDowngradeModal] = useState(false);
  const [pendingExperience, setPendingExperience] = useState<UserExperience | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [overview, prefs] = await Promise.all([
        queryClient.getBrewProfileOverview(),
        queryClient.getTastePreference(),
      ]);
      const normalized = normalizeTasteProfile({ ...overview, prefs });
      setProfile(normalized);
      setPrefsDraft(normalized.prefs ?? null);
    } catch (err) {
      setError("Unable to load your taste profile right now.");
    } finally {
      setLoading(false);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      void loadProfile();
    }, [loadProfile]),
  );

  const handlePrefChange = useCallback(
    (key: keyof TastePreference, value: TastePreference[keyof TastePreference]) => {
      setPrefsDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
    },
    [],
  );

  const handleExperienceChange = (next: UserExperience) => {
    if (!prefsDraft) return;
    if (
      prefsDraft.userExperience === USER_EXPERIENCE.ADVANCED &&
      next === USER_EXPERIENCE.BEGINNER
    ) {
      setPendingExperience(next);
      setShowDowngradeModal(true);
      return;
    }
    setPrefsDraft(applyExperienceChange(prefsDraft, next));
  };

  const handleConfirmDowngrade = () => {
    if (!prefsDraft || !pendingExperience) {
      setShowDowngradeModal(false);
      setPendingExperience(null);
      return;
    }
    setPrefsDraft(applyExperienceChange(prefsDraft, pendingExperience));
    setPendingExperience(null);
    setShowDowngradeModal(false);
  };

  const handleCloseDowngrade = () => {
    setShowDowngradeModal(false);
    setPendingExperience(null);
  };

  const handleSave = async () => {
    if (!prefsDraft || saving) return;
    setSaving(true);
    setError(null);
    try {
      await queryClient.updateTastePreference(prefsDraft);
      await loadProfile();
    } catch (err) {
      setError("We could not update your taste profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const experienceValue = prefsDraft?.userExperience ?? USER_EXPERIENCE.BEGINNER;
  const totalShots = profile?.profile.totalShots ?? 0;
  const archetype = profile?.archetype.type ?? "undefined";
  const ctaLabel = saving ? "Updating..." : "Update profile";
  const disableActions = loading || saving || !prefsDraft;

  const showLoading = loading && !prefsDraft;
  const showEmpty = !prefsDraft && !loading;

  return (
    <BaseScreen
      showHeader
      title="Find your taste"
      safeAreaBgColor="#F5EAD7"
      onBack={() => router.back()}
    >
      <View className="flex-1 bg-[#F5EAD7]">
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {showLoading && (
            <View className="flex-1 items-center justify-center py-20">
              <ActivityIndicator color="#010101" />
            </View>
          )}
          {showEmpty && (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-base text-black/70">
                We could not load your profile.
              </Text>
            </View>
          )}
          {!showLoading && prefsDraft && (
            <View className="gap-8">
              <TasteProfileHeader totalShots={totalShots} archetype={archetype} />
              <TasteExperienceToggle
                value={experienceValue}
                onChange={handleExperienceChange}
                disabled={disableActions}
              />
              <TastePreferenceSection
                experience={experienceValue}
                prefs={prefsDraft}
                onPrefChange={handlePrefChange}
                disabled={disableActions}
              />
              {error && (
                <Text className="text-sm text-red-600">{error}</Text>
              )}
              <Button
                text={ctaLabel}
                onPress={handleSave}
                disabled={disableActions}
              />
            </View>
          )}
        </ScrollView>
      </View>

      <TasteDowngradeModal
        visible={showDowngradeModal}
        onClose={handleCloseDowngrade}
        onConfirm={handleConfirmDowngrade}
      />
    </BaseScreen>
  );
}
