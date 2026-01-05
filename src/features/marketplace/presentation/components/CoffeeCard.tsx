import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { CoffeeRecommendationItem } from "../../domain/models/CoffeeRecommendation";
import { styles } from "../styles/marketplaceStyles";

type CoffeeCardProps = {
  item: CoffeeRecommendationItem;
  onPress?: () => void;
};

export function CoffeeCard({ item, onPress }: CoffeeCardProps) {
  const { product } = item;
  const origin = [product.originCountry, product.originRegion]
    .filter(Boolean)
    .join(", ");
  const roast = formatEnumLabel(product.roastLevel);
  const process = product.processing ? formatEnumLabel(product.processing) : undefined;
  const altitude =
    product.altitudeMeters != null ? `${product.altitudeMeters} m` : undefined;

  const metaLineOne = buildMetaLine([
    origin ? `Origin: ${origin}` : null,
    roast ? `Roast: ${roast}` : null,
  ]);

  const metaLineTwo = buildMetaLine([
    process ? `Process: ${process}` : null,
    product.variety ? `Variety: ${product.variety}` : null,
    altitude ? `Altitude: ${altitude}` : null,
  ]);

  const notesLine =
    product.tasteNotes && product.tasteNotes.length > 0
      ? `Taste: ${product.tasteNotes.join(", ")}`
      : null;

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={product.name}
    >
      {product.imageUrl ? (
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.cardImage}
          resizeMode="cover"
          accessibilityLabel={`${product.name} photo`}
        />
      ) : (
        <View style={[styles.cardImage, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>No image</Text>
        </View>
      )}
      <View style={styles.cardBody}>
        {item.badge ? <Text style={styles.badge}>{item.badge}</Text> : null}
        <Text style={styles.cardTitle}>{product.name}</Text>
        {product.shopName ? (
          <Text style={styles.cardShop}>{product.shopName}</Text>
        ) : null}
        {metaLineOne ? <Text style={styles.cardMeta}>{metaLineOne}</Text> : null}
        {metaLineTwo ? <Text style={styles.cardMeta}>{metaLineTwo}</Text> : null}
        {notesLine ? <Text style={styles.cardNotes}>{notesLine}</Text> : null}
      </View>
    </Pressable>
  );
}

function buildMetaLine(parts: Array<string | null>): string | null {
  const filtered = parts.filter((part): part is string => Boolean(part));
  if (filtered.length === 0) return null;
  return filtered.join(" | ");
}

function formatEnumLabel(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}
