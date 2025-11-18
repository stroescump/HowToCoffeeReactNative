// src/components/BaseScreen.tsx
import { HeaderHowToCoffee } from "@/src/shared/ui/components/typography/Header";
import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaColorOptional } from "../contextproviders/SafeAreaColorContext";

type BaseScreenProps = {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
  background?: ReactNode;
  disablePadding?: boolean;
  safeAreaBgColor?: string | undefined;
  onBack?: () => void
};

export function BaseScreen({ children, showHeader = true, title, disablePadding, safeAreaBgColor, onBack }: BaseScreenProps) {
  const safeAreaCtx = useSafeAreaColorOptional();
  const backgroundColor = safeAreaBgColor ?? safeAreaCtx?.color
  return (
    <SafeAreaView
      className="flex-1"
      edges={["top"]}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <View className="flex-1 relative">
        <View className={disablePadding ? "flex-1" : "flex-1"}>
          {showHeader && <HeaderHowToCoffee title={title} onBack={onBack} />}
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}