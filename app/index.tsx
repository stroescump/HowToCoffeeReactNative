// app/index.tsx
import React from "react";
import { Text, View } from "react-native";
import { ButtonsSvg } from "../src/features/homescreen/presentation/components/ButtonsSvg";
// dacă ai și background separat, îl poți importa și pe ăla:
// import { HomeBackgroundSvg } from "../src/features/homescreen/presentation/components/HomeBackgroundSvg";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#F1E9DD]">
      <Text className="text-4xl font-extrabold mt-16 text-center">
        ?ToCoffee
      </Text>

      <View className="flex-1">
        {/* Variante: 
           1) Dacă background + butoane sunt același SVG => doar ButtonsSvg.
           2) Dacă ai un background separat, faci un container și le pui bot în bot cu absolute.
         */}

        {/* 1) Doar ButtonsSvg (conține și culorile Bauhaus) */}
        <ButtonsSvg />

        {/*
        2) Dacă vrei background + butoane separate:

        <View style={{ flex: 1 }}>
          <HomeBackgroundSvg
            width="100%"
            height="100%"
          />
          <View style={StyleSheet.absoluteFillObject}>
            <ButtonsSvg />
          </View>
        </View>
        */}
      </View>
    </View>
  );
}