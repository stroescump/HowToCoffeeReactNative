import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      {/* HomeScreen = app/home/index.tsx */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // home full-screen, fără header
          title: "Home"
        }}
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
        options={{ title: "Coffee places nearby" }}r
      />
      <Stack.Screen
        name="marketplace/index"
        options={{ title: "Coffee marketplace" }}
      />

      {/* dacă ai și un flows.tsx sau flows/index.tsx */}
      {/* <Stack.Screen name="flows" options={{ title: "Flows" }} /> */}
    </Stack>
  );
}