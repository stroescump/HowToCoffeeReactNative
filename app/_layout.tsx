import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";
import "../src/i18n/i18n";

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
        />

        {/* restul screen-urilor pornite din HOME_ITEMS */}
        <Stack.Screen
          name="findyourtaste/index"      
        />
        <Stack.Screen
          name="diagnose/index"
        />
        <Stack.Screen
          name="recipeagenda/index"
        />
        <Stack.Screen
          name="coffeeplacesnearby/index"
        />
        <Stack.Screen
          name="marketplace/index"
        />
      </Stack>
    </SafeAreaProvider>
  );
}