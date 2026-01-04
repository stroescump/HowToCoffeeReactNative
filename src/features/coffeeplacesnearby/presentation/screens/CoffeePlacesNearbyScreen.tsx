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
import { CoffeeShopCard } from "../components/CoffeeShopCard";
import { StateView } from "../components/StateView";
import { useNearbyCoffeeShops } from "../hooks/useNearbyCoffeeShops";
import { PALETTE, SPACING, styles } from "../styles/coffeePlacesNearbyStyles";
const TITLE = "Coffee places nearby";

export function CoffeePlacesNearbyScreen() {
  const router = useRouter();
  const onBack = () => router.back();
  const {
    permissionStatus,
    servicesEnabled,
    shops,
    loading,
    checkingPermission,
    error,
    requestPermission,
    openSettings,
    refresh,
  } = useNearbyCoffeeShops();

  if (checkingPermission) {
    return (
      <ScreenShell onBack={onBack}>
        <StateView
          title="Checking location"
          body="We need your location to find nearby coffee shops."
          isLoading
        />
      </ScreenShell>
    );
  }

  if (permissionStatus !== "granted") {
    const isDenied = permissionStatus === "denied";
    return (
      <ScreenShell onBack={onBack}>
        <StateView
          title="Enable location"
          body={
            isDenied
              ? "Location access is off. Enable it in Settings to see nearby coffee shops."
              : "Allow location access to see nearby coffee shops."
          }
          actionLabel={isDenied ? "Open Settings" : "Allow location"}
          onAction={isDenied ? openSettings : requestPermission}
        />
      </ScreenShell>
    );
  }

  if (servicesEnabled === false) {
    return (
      <ScreenShell onBack={onBack}>
        <StateView
          title="Turn on location services"
          body="Enable device location services to see nearby coffee shops."
          actionLabel="Open Settings"
          onAction={openSettings}
        />
      </ScreenShell>
    );
  }

  if (error && shops.length === 0) {
    return (
      <ScreenShell onBack={onBack}>
        <StateView
          title="Something went wrong"
          body={error}
          actionLabel="Try again"
          onAction={refresh}
        />
      </ScreenShell>
    );
  }

  return (
    <ScreenShell onBack={onBack}>
      <View style={styles.container}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <FlatList
          data={shops}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CoffeeShopCard shop={item} />}
          ItemSeparatorComponent={() => <View style={{ height: SPACING }} />}
          contentContainerStyle={styles.listContent}
          onRefresh={refresh}
          refreshing={loading && shops.length > 0}
          ListEmptyComponent={
            loading ? (
              <View style={styles.stateContainer}>
                <ActivityIndicator color={PALETTE.accent} />
                <Text style={styles.stateBody}>Loading nearby coffee shops...</Text>
              </View>
            ) : (
              <StateView
                title="No coffee shops nearby"
                body="No coffee shops within 350 m right now. Try refreshing later."
                actionLabel="Refresh"
                onAction={refresh}
              />
            )
          }
        />
      </View>
    </ScreenShell>
  );
}
type ScreenShellProps = {
  onBack: () => void;
  children: React.ReactNode;
};
function ScreenShell({ onBack, children }: ScreenShellProps) {
  return (
    <BaseScreen
      showHeader
      title={TITLE}
      safeAreaBgColor={PALETTE.background}
      onBack={onBack}
    >
      <StatusBar barStyle="dark-content" />
      {children}
    </BaseScreen>
  );
}
