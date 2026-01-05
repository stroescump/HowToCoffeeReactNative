import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  View,
} from "react-native";
import { CoffeeCard } from "../components/CoffeeCard";
import { useCoffeeRecommendations } from "../hooks/useCoffeeRecommendations";
import { PALETTE, styles } from "../styles/marketplaceStyles";

const TITLE = "Buy coffee";

const MarketplaceScreen = () => {
  const router = useRouter();
  const onBack = () => router.back();
  const { items, loading, error, refresh } = useCoffeeRecommendations();

  return (
    <BaseScreen showHeader title={TITLE} safeAreaBgColor={PALETTE.background} onBack={onBack}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screen}>
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
