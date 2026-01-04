import React from "react";
import { Text, View } from "react-native";
import { CoffeeShop } from "../../domain/models/CoffeeShop";
import { styles } from "../styles/coffeePlacesNearbyStyles";
import { CoffeeTagPill, TagTone } from "./CoffeeTagPill";

type Props = {
  shop: CoffeeShop;
};

type TagItem = {
  label: string;
  tone?: TagTone;
};

export function CoffeeShopCard({ shop }: Props) {
  const tags = buildTags(shop);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {shop.name}
        </Text>
        <Text style={styles.cardDistance}>{formatDistance(shop.distanceMeters)}</Text>
      </View>
      {shop.address ? (
        <Text style={styles.cardAddress} numberOfLines={2}>
          {shop.address}
        </Text>
      ) : null}
      <View style={styles.tagsRow}>
        {tags.map((tag) => (
          <CoffeeTagPill key={tag.label} label={tag.label} tone={tag.tone} />
        ))}
      </View>
    </View>
  );
}

function formatDistance(distanceMeters: number): string {
  if (distanceMeters < 1000) {
    return `${Math.round(distanceMeters)} m`;
  }
  const km = distanceMeters / 1000;
  return `${km.toFixed(1)} km`;
}

function buildTags(shop: CoffeeShop): TagItem[] {
  const result: TagItem[] = [];
  const seen = new Set<string>();

  if (shop.tasteMatchScore != null) {
    result.push({
      label: `Taste match ${shop.tasteMatchScore}%`,
      tone: "accent",
    });
    seen.add("taste match");
  }

  if (shop.isFeatured) {
    result.push({ label: "Featured", tone: "accent" });
    seen.add("featured");
  }

  for (const tag of shop.tags) {
    const key = tag.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    result.push({ label: tag });
    seen.add(key);
  }

  return result;
}
