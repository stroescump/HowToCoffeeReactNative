import { MarketplaceDetailScreen } from "@/src/features/marketplace/presentation/screens/MarketplaceDetailScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function MarketplaceDetailRoute() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  return <MarketplaceDetailScreen productId={id ?? ""} />;
}
