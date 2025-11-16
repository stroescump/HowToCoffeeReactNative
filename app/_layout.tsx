import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import "../src/i18n/i18n";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    InterMedium: require("../assets/fonts/InterDisplay-Medium.ttf"),
    InterBlack: require("../assets/fonts/InterDisplay-Black.ttf"),
    InterBold: require("../assets/fonts/InterDisplay-Bold.ttf"),
    InterExtraBold: require("../assets/fonts/InterDisplay-ExtraBold.ttf"),
    InterRegular: require("../assets/fonts/InterDisplay-Regular.ttf"),
    InterSemiBold: require("../assets/fonts/InterDisplay-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#F1E9DD" />
      <Stack screenOptions={{
        headerShown: false
      }}>
        /* HomeScreen = app/home/index.tsx */
        <Stack.Screen
          name="index"
        />

        /* restul screen-urilor pornite din HOME_ITEMS */
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
    // <ErrorPopup errorMessage={"This is an error message"} />
  );
}
