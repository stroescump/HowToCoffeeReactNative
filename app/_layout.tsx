import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#F1E9DD" />
      <Stack screenOptions={{
        headerShown: false
      }}>
        {/* HomeScreen = app/home/index.tsx */}
        <Stack.Screen
          name="index"
          options={{ title: "Home" }}
        />

        {/* restul screen-urilor pornite din HOME_ITEMS */}
        <Stack.Screen
          name="findyourtaste/index"
          options={{ title: "Find your taste" }}
        />
        <Stack.Screen
          name="diagnose/index"
          options={{ title: "Diagnose brew" }}
        />
        <Stack.Screen
          name="recipeagenda/index"
          options={{ title: "Recipe agenda" }}
        />
        <Stack.Screen
          name="coffeeplacesnearby/index"
          options={{ title: "Coffee places nearby" }}
        />
        <Stack.Screen
          name="marketplace/index"
          options={{ title: "Coffee marketplace" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}