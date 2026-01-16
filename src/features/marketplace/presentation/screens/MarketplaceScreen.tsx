import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { CoffeeCard } from "../components/CoffeeCard";
import { useCoffeeRecommendations } from "../hooks/useCoffeeRecommendations";
import { PALETTE, styles } from "../styles/marketplaceStyles";

const TITLE = "Buy coffee";
const ROAST_OPTIONS = [
  { label: "All", value: null },
  { label: "Light", value: "light" },
  { label: "Medium", value: "medium" },
  { label: "Dark", value: "dark" },
  { label: "Filter", value: "filter" },
  { label: "Omni", value: "omni" },
  { label: "Espresso", value: "espresso" },
];

const MarketplaceScreen = () => {
  const router = useRouter();
  const onBack = () => router.back();
  const [selectedRoast, setSelectedRoast] = useState<string | null>(null);
  const [showRoastMenu, setShowRoastMenu] = useState(false);
  const selectedLabel = useMemo(() => {
    return ROAST_OPTIONS.find((option) => option.value === selectedRoast)?.label ?? "All";
  }, [selectedRoast]);
  const { items, loading, error, refresh, loadMore, loadingMore, nextOffset } =
    useCoffeeRecommendations(selectedRoast);

  return (
    <BaseScreen showHeader title={TITLE} safeAreaBgColor={PALETTE.background} onBack={onBack}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screen}>
        <View style={styles.filtersRow}>
          <View>
            <Pressable
              style={[
                styles.filterPill,
                showRoastMenu ? styles.filterPillActive : null,
              ]}
              onPress={() => setShowRoastMenu((prev) => !prev)}
            >
              <Text
                style={[
                  styles.filterText,
                  showRoastMenu ? styles.filterTextActive : null,
                ]}
              >
                Roast: {selectedLabel}
              </Text>
            </Pressable>
            {showRoastMenu && (
              <View style={styles.dropdownMenu}>
                {ROAST_OPTIONS.map((option) => {
                  const isActive = option.value === selectedRoast;
                  return (
                    <Pressable
                      key={option.label}
                      style={[
                        styles.dropdownItem,
                        isActive ? styles.dropdownItemActive : null,
                      ]}
                      onPress={() => {
                        setSelectedRoast(option.value);
                        setShowRoastMenu(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          isActive ? styles.dropdownTextActive : null,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <FlatList
          data={items}
          keyExtractor={(item) => item.product.id}
          renderItem={({ item }) => (
            <CoffeeCard
              item={item}
              onPress={() => router.push(`/marketplace/${item.product.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          onRefresh={refresh}
          refreshing={loading}
          onEndReached={() => {
            if (nextOffset != null) {
              void loadMore();
            }
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.footerLoading}>
                <ActivityIndicator color={PALETTE.accent} />
              </View>
            ) : null
          }
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
