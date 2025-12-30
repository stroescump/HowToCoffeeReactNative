import { TasteArchetype, TASTE_ARCHETYPE_LABELS } from "@/src/shared/domain/models/taste/tasteArchetype";
import React from "react";
import { Text, View } from "react-native";

type TasteProfileHeaderProps = {
  totalShots: number;
  archetype: TasteArchetype;
};

export function TasteProfileHeader({ totalShots, archetype }: TasteProfileHeaderProps) {
  const archetypeLabel = TASTE_ARCHETYPE_LABELS[archetype] ?? "Not enough data yet";

  return (
    <View className="gap-4">
      <Text className="text-lg font-[InterBold] text-black">Taste snapshot</Text>
      <View className="flex-row gap-3">
        <View className="flex-1 rounded-2xl border border-black/10 bg-white px-4 py-4">
          <Text className="text-[11px] uppercase tracking-[2px] text-black/60">
            Shots brewed
          </Text>
          <Text className="text-3xl font-[InterBold] text-black mt-2">
            {totalShots}
          </Text>
        </View>
        <View className="flex-1 rounded-2xl bg-black px-4 py-4">
          <Text className="text-[11px] uppercase tracking-[2px] text-white/60">
            Archetype
          </Text>
          <Text className="text-lg font-[InterBold] text-white mt-2">
            {archetypeLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}
