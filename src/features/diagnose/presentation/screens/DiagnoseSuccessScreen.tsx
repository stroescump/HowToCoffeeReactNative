import { StringRes } from "@/src/i18n/strings";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TextInput, View } from "react-native";
import { draftRepo } from "../../data/repositories/DiagnoseRepositoryImpl";
import { useDiagnoseSuccess } from "../hooks/useDiagnoseSuccess";
import { GrindSettingSpinner } from "./components/GrindSettingSpinner";

export function DiagnoseSuccessScreen() {
  const { t } = useTranslation();

  const { uiState, actions } = useDiagnoseSuccess({ draftRepository: draftRepo });
  const goHome = () => actions.requestLeave("home");

  useEffect(() => {
    const { coffeeDisplayName, grindSetting } = uiState.session

    if (coffeeDisplayName) actions.setCoffeeName(coffeeDisplayName)
    if (grindSetting) actions.setGrindSetting(grindSetting)
  }, [uiState.session.id])

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
            <View className="mt-4 gap-1">
              <Text className="text-lg font-[InterBold] text-black/80 mb-1">
                Coffee name
              </Text>
              <TextInput
                value={uiState.coffeeName}
                onChangeText={actions.setCoffeeName}
                placeholder="Enter coffee name"
                className="border border-black/20 rounded-xl px-3 py-2 text-base text-black"
                placeholderTextColor="rgba(0,0,0,0.4)"
              />

              <Text className="text-2xl font-[InterBold] text-black/70 mt-4">
                Recipe parameters
              </Text>
              <Text className="text-lg text-black/70">
                Dose: {uiState.session.doseGrams ?? "-"} g
              </Text>
              <Text className="text-lg text-black/70">
                Yield: {uiState.session.yieldGrams ?? "-"} g
              </Text>
              <Text className="text-lg text-black/70">
                Time: {uiState.session.brewTimeSeconds ?? "-"} s
              </Text>
              <Text className="text-lg font-[InterBold] text-black/70 mb-1">
                Grind setting
              </Text>
              <GrindSettingSpinner value={uiState.grindSetting} onChange={actions.setGrindSetting} />
            </View>
          </View>
        </View>

        <View className="gap-3">
          <Button text={t(StringRes.diagnoseSuccess.primaryCta)} onPress={actions.handleSave} />
          <Button
            variant="ghost"
            text={t(StringRes.diagnoseSuccess.secondaryCta)}
            onPress={goHome}
          />
        </View>
      </View>
      {uiState.showLeaveWarning && (
        <Modal
          transparent
          animationType="fade"
          visible={uiState.showLeaveWarning}
          onRequestClose={actions.dismissLeaveWarning}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View
              className="bg-white rounded-3xl p-6 w-11/12"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowOffset: { width: 0, height: 8 },
                shadowRadius: 20,
                elevation: 8,
              }}
            >
              <Text className="text-3xl font-[InterBold] mb-3 text-black">
                {t(StringRes.popupDetails.areYouSure)}
              </Text>
              <Text className="text-xl leading-6 text-black/80 mb-4">
                You are about to leave this screen without saving your recipe.
              </Text>
              <View className="gap-3">
                <Button
                  text="I understand"
                  onPress={actions.confirmLeave}
                />
                <Button
                  variant="ghost"
                  text="Close Popup"
                  onPress={actions.dismissLeaveWarning}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
      {uiState.errorModal.visible && (
        <Modal
          transparent
          animationType="fade"
          visible={uiState.errorModal.visible}
          onRequestClose={actions.dismissError}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View
              className="bg-white rounded-3xl p-6 w-11/12"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowOffset: { width: 0, height: 8 },
                shadowRadius: 20,
                elevation: 8,
              }}
            >
              <Text className="text-2xl font-[InterBold] mb-3 text-black">
                {t(StringRes.titleDefaultError)}
              </Text>
              <Text className="text-base leading-6 text-black/80 mb-4">
                {uiState.errorModal.message}
              </Text>
              <Button
                text="Close"
                onPress={actions.dismissError}
              />
            </View>
          </View>
        </Modal>
      )}
    </BaseScreen>
  );
}
