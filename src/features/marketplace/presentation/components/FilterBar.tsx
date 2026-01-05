import React from "react";
import { View } from "react-native";
import { styles } from "../styles/marketplaceStyles";
import { FilterPill } from "./FilterPill";

type FilterOption = {
  id: string;
  label: string;
};

type FilterBarProps = {
  options: FilterOption[];
  activeIds: string[];
  onToggle: (id: string) => void;
};

export function FilterBar({ options, activeIds, onToggle }: FilterBarProps) {
  return (
    <View style={styles.filtersRow}>
      {options.map((option) => (
        <FilterPill
          key={option.id}
          label={option.label}
          active={activeIds.includes(option.id)}
          onPress={() => onToggle(option.id)}
        />
      ))}
    </View>
  );
}
