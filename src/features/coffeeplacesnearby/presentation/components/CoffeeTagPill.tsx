import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/coffeePlacesNearbyStyles";

export type TagTone = "neutral" | "accent";

type Props = {
  label: string;
  tone?: TagTone;
};

export function CoffeeTagPill({ label, tone = "neutral" }: Props) {
  const isAccent = tone === "accent";
  return (
    <View style={[styles.tagPill, isAccent && styles.tagPillAccent]}>
      <Text style={[styles.tagText, isAccent && styles.tagTextAccent]}>
        {label}
      </Text>
    </View>
  );
}
