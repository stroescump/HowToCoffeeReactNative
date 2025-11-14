import { Text, View } from "react-native";

export default function FindYourTasteRoute() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A", padding: 24, paddingTop: 80 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
        Find your taste
      </Text>
      <Text style={{ color: "white", marginTop: 8 }}>
        Aici o să intre flow-ul de profil de gust.
      </Text>
    </View>
  );
}