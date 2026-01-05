import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { PALETTE, styles } from "../styles/marketplaceStyles";

type MarketplaceDetailScreenProps = {
  productId: string;
};

export function MarketplaceDetailScreen({ productId }: MarketplaceDetailScreenProps) {
  const router = useRouter();
  const onBack = () => router.back();

  return (
    <BaseScreen showHeader title="Coffee detail" safeAreaBgColor={PALETTE.background} onBack={onBack}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screen}>
        <Text style={styles.cardTitle}>Coffee product</Text>
        <Text style={styles.cardMeta}>ID: {productId}</Text>
      </View>
    </BaseScreen>
  );
}
