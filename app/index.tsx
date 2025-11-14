import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const HOME_ITEMS = [
  { href: "/find-taste", label: "Find your taste" },
  { href: "/diagnose", label: "Diagnose brew" },
  { href: "/recipes", label: "Recipe agenda" },
  { href: "/places", label: "Coffee places nearby" },
  { href: "/marketplace", label: "Coffee marketplace (soon)" },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HowToCoffee</Text>
      <Text style={styles.subtitle}>What do you want to do?</Text>

      <View style={styles.list}>
        {HOME_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>{item.label}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // dark blue-ish
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    marginBottom: 32,
  },
  list: {
    gap: 12,
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});