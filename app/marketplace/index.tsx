import { Text, View } from "react-native";

export default function MarketplaceRoute() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A", padding: 24, paddingTop: 80 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
        Coffee marketplace
      </Text>
      <Text style={{ color: "white", marginTop: 8 }}>
        Coming soon. Not part of the first MVP.
      </Text>
    </View>
  );
}