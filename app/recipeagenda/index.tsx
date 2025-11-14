import { Text, View } from "react-native";

export default function RecipesAgendaRoute() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A", padding: 24, paddingTop: 80 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
        Recipe agenda
      </Text>
      <Text style={{ color: "white", marginTop: 8 }}>
        Aici o să intre coffee recipe management.
      </Text>
    </View>
  );
}