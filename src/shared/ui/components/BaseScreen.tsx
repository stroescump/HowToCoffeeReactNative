// src/components/BaseScreen.tsx
import { HeaderHowToCoffee } from "@/src/shared/ui/components/typography/Header";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BaseScreenProps = {
  children: ReactNode;
  showHeader?: boolean;
  titleRes?: string;
  background?: ReactNode;
  disablePadding?: boolean;
  safeAreaBgColor?: string | undefined;
  onBack: () => void
};

export function BaseScreen({ children, showHeader = true, titleRes, disablePadding, safeAreaBgColor, onBack }: BaseScreenProps) {
  const { t } = useTranslation()
  const screenTitle: string = t(titleRes);
  return (
    <SafeAreaView
      className="flex-1"
      edges={["top"]}
      style={{
        backgroundColor: safeAreaBgColor,
      }}
    >
      <View className="flex-1 relative">
        <View className={disablePadding ? "flex-1" : "flex-1"}>
          {showHeader && <HeaderHowToCoffee title={screenTitle} onBack={onBack} />}
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}