import { Text, View } from "react-native";

export default function CoffeePlacesNearbyRoute() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A", padding: 24, paddingTop: 80 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
        Coffee places nearby
      </Text>
      <Text style={{ color: "white", marginTop: 8 }}>
        Aici o să intre integrarea cu harta / Google Maps.
      </Text>
    </View>
  );
}