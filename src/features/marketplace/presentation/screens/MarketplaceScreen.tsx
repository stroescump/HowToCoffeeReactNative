import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  View,
} from "react-native";
import { CoffeeCard } from "../components/CoffeeCard";
import { FilterBar } from "../components/FilterBar";
import { useCoffeeRecommendations } from "../hooks/useCoffeeRecommendations";
import { PALETTE, styles } from "../styles/marketplaceStyles";
import { filterRecommendationsByTags } from "../../domain/usecases/filterRecommendationsByTags";

const TITLE = "Buy coffee";
const FILTER_OPTIONS = [
  { id: "decaf", label: "Decaf" },
  { id: "alt-milk", label: "Alternative Milk" },
  { id: "work", label: "Working friendly" },
];
const FILTER_TAGS: Record<string, string> = {
  decaf: "decaf",
  "alt-milk": "alt_milk",
  work: "working_friendly",
};

const MarketplaceScreen = () => {
  const router = useRouter();
  const onBack = () => router.back();
  const { items, loading, error, refresh } = useCoffeeRecommendations();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeTags = useMemo(
    () => activeFilters.map((id) => FILTER_TAGS[id]).filter(Boolean),
    [activeFilters]
  );
  const visibleItems = useMemo(
    () => filterRecommendationsByTags(items, activeTags),
    [items, activeTags]
  );

  return (
    <BaseScreen showHeader title={TITLE} safeAreaBgColor={PALETTE.background} onBack={onBack}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screen}>
        <FilterBar
          options={FILTER_OPTIONS}
          activeIds={activeFilters}
          onToggle={toggleFilter}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <FlatList
          data={visibleItems}
          keyExtractor={(item) => item.product.id}
          renderItem={({ item }) => (
            <CoffeeCard
              item={item}
              onPress={() => router.push(`/marketplace/${item.product.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
          onRefresh={refresh}
          refreshing={loading}
          ListEmptyComponent={
            loading ? (
              <View style={styles.stateContainer}>
                <ActivityIndicator color={PALETTE.accent} />
                <Text style={styles.stateText}>Loading coffee picks...</Text>
              </View>
            ) : (
              <View style={styles.stateContainer}>
                <Text style={styles.stateText}>
                  No coffee recommendations yet.
                </Text>
              </View>
            )
          }
        />
      </View>
    </BaseScreen>
  );
};

export default MarketplaceScreen;
