// src/components/BaseScreen.tsx
import { HeaderHowToCoffee } from "@/src/shared/ui/components/Header";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BaseScreenProps = {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
};

export function BaseScreen({ children, showHeader = true, title }: BaseScreenProps) {
  return (
    <SafeAreaView
      className="flex-1 bg-[#F1E9DD]"
      edges={["top"]}
    >
      <View className="flex-1">
        {showHeader && <HeaderHowToCoffee />}
        {children}
      </View>
    </SafeAreaView>
  );
}