// src/components/BaseScreen.tsx
import { HeaderHowToCoffee } from "@/src/shared/ui/components/typography/Header";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BaseScreenProps = {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
  background?: ReactNode;
  disablePadding?: boolean;
  safeAreaBgColor?: string;
};

export function BaseScreen({ children, showHeader = true, title, background, disablePadding, safeAreaBgColor }: BaseScreenProps) {
  const defaultBg = "#F1E9DD";
  const bg = safeAreaBgColor ?? (!background ? defaultBg : undefined);

  return (
    <SafeAreaView
      className="flex-1"
      edges={["top"]}
      style={{
        backgroundColor: bg,
      }}
    >
      <View className="flex-1 relative">
        {background && (
          <View className="absolute inset-0">
            {background}
          </View>
        )}

        <View className={disablePadding ? "flex-1" : "flex-1"}>
          {showHeader && <HeaderHowToCoffee title={title} />}
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}