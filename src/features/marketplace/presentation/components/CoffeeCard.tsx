import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { CoffeeRecommendationItem } from "../../domain/models/CoffeeRecommendation";
import { styles } from "../styles/marketplaceStyles";
import { buildMarketplaceProductView } from "../utils/marketplaceProductView";

type CoffeeCardProps = {
  item: CoffeeRecommendationItem;
  onPress?: () => void;
};

export function CoffeeCard({ item, onPress }: CoffeeCardProps) {
  const view = buildMarketplaceProductView(item.product);
  const wildCardBadge = item.isWildCard ? "Wildcard" : null;

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={view.title}
    >
      {view.primaryImageUrl ? (
        <Image
          source={{ uri: view.primaryImageUrl }}
          style={styles.cardImage}
          resizeMode="cover"
          accessibilityLabel={`${view.title} photo`}
        />
      ) : (
        <View style={[styles.cardImage, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>No image</Text>
        </View>
      )}
      <View style={styles.cardBody}>
        <View style={styles.badgeRow}>
          {wildCardBadge ? (
            <Text style={styles.badge}>{wildCardBadge}</Text>
          ) : null}
          {item.badge ? <Text style={styles.badge}>{item.badge}</Text> : null}
          {view.roastBadge ? (
            <Text style={styles.roastBadge}>{view.roastBadge}</Text>
          ) : null}
        </View>
        <Text style={styles.cardTitle}>{view.title}</Text>
        <Text style={styles.cardShop}>{view.subtitle}</Text>
        <Text style={styles.cardMeta}>Origin: {view.originLabel}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{view.priceLabel}</Text>
          <View
            style={[
              styles.ctaPill,
              view.ctaDisabled ? styles.ctaPillDisabled : null,
            ]}
          >
            <Text
              style={[
                styles.ctaText,
                view.ctaDisabled ? styles.ctaTextDisabled : null,
              ]}
            >
              {view.ctaLabel}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
