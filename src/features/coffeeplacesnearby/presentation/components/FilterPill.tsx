import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "../styles/coffeePlacesNearbyStyles";

type FilterPillProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function FilterPill({ label, active, onPress }: FilterPillProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={[styles.filterPill, active && styles.filterPillActive]}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}
