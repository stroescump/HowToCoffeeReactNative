import { StringRes } from "@/src/i18n/strings";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export function DiagnoseSuccessScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const goToRecipeAgenda = () => {
    router.replace("/recipeagenda");
  };

  const goHome = () => {
    router.replace("/");
  };

  return (
    <BaseScreen
      title={t(StringRes.diagnoseSuccess.title)}
      safeAreaBgColor="#F1E9DD"
      onBack={goHome}
    >
      <View className="flex-1 px-6 pb-10 pt-2">
        <View className="flex-1 justify-center">
          <View
            className="bg-white rounded-3xl p-6"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.12,
              shadowOffset: { width: 0, height: 10 },
              shadowRadius: 24,
              elevation: 6,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.05)",
            }}
          >
            <Text className="text-3xl font-[InterBold] mb-3 text-black">
              {t(StringRes.diagnoseSuccess.subtitle)}
            </Text>
            <Text className="text-base leading-6 text-black/80">
              {t(StringRes.diagnoseSuccess.description)}
            </Text>
          </View>
        </View>

        <View className="gap-3">
          <Button text={t(StringRes.diagnoseSuccess.primaryCta)} onPress={goToRecipeAgenda} />
          <Button
            variant="ghost"
            text={t(StringRes.diagnoseSuccess.secondaryCta)}
            onPress={goHome}
          />
        </View>
      </View>
    </BaseScreen>
  );
}
