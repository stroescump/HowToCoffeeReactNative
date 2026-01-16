import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { fetchMarketplaceProductDetail } from "../../data/api/marketplaceProductApi";
import { mapMarketplaceProductDetail } from "../../data/mappers/coffeeProductMapper";
import { CoffeeProductMarketplace } from "../../domain/models/CoffeeProduct";
import { PALETTE, styles } from "../styles/marketplaceStyles";
import { buildMarketplaceProductView } from "../utils/marketplaceProductView";

type MarketplaceDetailScreenProps = {
  productId: string;
};

export function MarketplaceDetailScreen({ productId }: MarketplaceDetailScreenProps) {
  const router = useRouter();
  const onBack = () => router.back();
  const [item, setItem] = useState<CoffeeProductMarketplace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDetail = useCallback(async () => {
    if (!productId) {
      setError("Missing product id.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const dto = await fetchMarketplaceProductDetail(productId);
      const mapped = mapMarketplaceProductDetail(dto);
      if (!mapped) {
        throw new Error("Coffee not found.");
      }
      setItem(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load coffee details.");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    void loadDetail();
  }, [loadDetail]);

  const view = item ? buildMarketplaceProductView(item) : null;

  return (
    <BaseScreen showHeader title="Coffee detail" safeAreaBgColor={PALETTE.background} onBack={onBack}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screen}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {!item ? (
          <View style={styles.stateContainer}>
            <Text style={styles.stateText}>
              {loading ? "Loading coffee details..." : "Coffee not found."}
            </Text>
            {!loading && (
              <Button text="Retry" variant="ghost" onPress={loadDetail} />
            )}
          </View>
        ) : (
          <View style={styles.detailContainer}>
            {view?.primaryImageUrl ? (
              <Image
                source={{ uri: view.primaryImageUrl }}
                style={styles.detailImage}
                resizeMode="cover"
                accessibilityLabel={`${view.title} photo`}
              />
            ) : (
              <View style={[styles.detailImage, styles.imagePlaceholder]}>
                <Text style={styles.placeholderText}>No image</Text>
              </View>
            )}
            <View style={styles.detailHeader}>
              <Text style={styles.detailTitle}>{view?.title}</Text>
              <Text style={styles.detailSubtitle}>{view?.subtitle}</Text>
              <View style={styles.detailBadgeRow}>
                {view?.roastBadge ? (
                  <Text style={styles.roastBadge}>{view.roastBadge}</Text>
                ) : null}
                <Text style={styles.detailMeta}>Origin: {view?.originLabel}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailPrice}>{view?.priceLabel}</Text>
              <Text style={styles.detailAvailability}>
                {view?.availability ? "Available" : "Unavailable"}
              </Text>
            </View>
            <Button
              text={view?.ctaLabel ?? "View"}
              onPress={view?.ctaDisabled ? undefined : () => {}}
              disabled={view?.ctaDisabled ?? false}
            />
          </View>
        )}
      </View>
    </BaseScreen>
  );
}
