import { StringRes } from "@/src/i18n/strings";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { draftRepo } from "../../data/repositories/DiagnoseRepositoryImpl";
import { saveRecipeFromSession } from "../../domain/usecases/SaveRecipeFromDiagnoseFlow";
import { useDiagnoseFlow } from "../hooks/useDiagnoseFlow";

export function DiagnoseSuccessScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const { session, clearAndReset } = useDiagnoseFlow({ draftRepository: draftRepo });
  const [coffeeName, setCoffeeName] = useState(session.coffeeDisplayName ?? "");
  const [grindSetting, setGrindSetting] = useState(session.grindSetting ?? "");
  const [hasSaved, setHasSaved] = useState(false);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<"home" | "agenda" | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    if (isSaving) return;
    if (!coffeeName.trim()) {
      setErrorMessage("Please enter a coffee name before saving.");
      setShowErrorModal(true);
      return;
    }

    setIsSaving(true);
    try {
      await saveRecipeFromSession({
        ...session,
        coffeeDisplayName: coffeeName.trim(),
        grindSetting,
      });
      setHasSaved(true);
      await clearAndReset();
      // After saving, go to recipe agenda
      router.replace("/recipeagenda");
    } catch (err: any) {
      setErrorMessage(err?.message ?? t(StringRes.buttonDefaultError));
      setShowErrorModal(true);
    } finally {
      setIsSaving(false);
    }
  };

  const goHome = () => {
    if (!hasSaved) {
      setPendingNavigation("home");
      setShowLeaveWarning(true);
      return;
    }
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
            <View className="mt-4 gap-1">
              <Text className="text-lg font-[InterBold] text-black/80 mb-1">
                Coffee name
              </Text>
              <TextInput
                value={coffeeName}
                onChangeText={setCoffeeName}
                placeholder="Enter coffee name"
                className="border border-black/20 rounded-xl px-3 py-2 text-base text-black"
                placeholderTextColor="rgba(0,0,0,0.4)"
              />

              <Text className="text-2xl font-[InterBold] text-black/70 mt-4">
                Recipe parameters
              </Text>
              <Text className="text-lg text-black/70">
                Dose: {session.doseGrams ?? "-"} g
              </Text>
              <Text className="text-lg text-black/70">
                Yield: {session.yieldGrams ?? "-"} g
              </Text>
              <Text className="text-lg text-black/70">
                Time: {session.brewTimeSeconds ?? "-"} s
              </Text>
              <Text className="text-lg font-[InterBold] text-black/70 mb-1">
                Grind setting
              </Text>
              <GrindSettingSpinner value={grindSetting} onChange={setGrindSetting} />
            </View>
          </View>
        </View>

        <View className="gap-3">
          <Button text={t(StringRes.diagnoseSuccess.primaryCta)} onPress={handleSave} />
          <Button
            variant="ghost"
            text={t(StringRes.diagnoseSuccess.secondaryCta)}
            onPress={goHome}
          />
        </View>
      </View>
      {showLeaveWarning && (
        <Modal
          transparent
          animationType="fade"
          visible={showLeaveWarning}
          onRequestClose={() => setShowLeaveWarning(false)}
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
                  onPress={() => {
                    setShowLeaveWarning(false);
                    const destination = pendingNavigation ?? "home";
                    setPendingNavigation(null);
                    void clearAndReset().finally(() => {
                      router.replace(destination === "home" ? "/" : "/recipeagenda");
                    });
                  }}
                />
                <Button
                  variant="ghost"
                  text="Close Popup"
                  onPress={() => setShowLeaveWarning(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
      {showErrorModal && (
        <Modal
          transparent
          animationType="fade"
          visible={showErrorModal}
          onRequestClose={() => setShowErrorModal(false)}
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
                {errorMessage}
              </Text>
              <Button
                text="Close"
                onPress={() => setShowErrorModal(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </BaseScreen>
  );
}

type GrindSettingSpinnerProps = {
  value?: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
};

const GrindSettingSpinner: React.FC<GrindSettingSpinnerProps> = ({
  value,
  onChange,
  min = 0,
  max = 20,
}) => {
  // Generate values from min → max in 0.1 increments
  const options = [];
  for (let v = min; v <= max; v += 0.1) {
    options.push(v.toFixed(1));
  }

  return (
    <View style={{ position: "relative", marginTop: 4 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          alignItems: "flex-end",
        }}
      >
        {options.map((option) => {
          const isSelected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={{
                alignItems: "center",
                marginRight: 20,
              }}
            >
              {/* Number above line */}
              <Text
                style={{
                  fontSize: isSelected ? 16 : 14,
                  fontWeight: isSelected ? "700" : "400",
                  color: isSelected ? "#010101" : "rgba(0,0,0,0.6)",
                  marginBottom: 6,
                }}
              >
                {option}
              </Text>

              {/* Line */}
              <View
                style={{
                  width: 2,
                  height: isSelected ? 28 : 16,
                  backgroundColor: isSelected ? "#010101" : "rgba(0,0,0,0.3)",
                  borderRadius: 1,
                }}
              />
            </Pressable>
          );
        })}
      </ScrollView>
      </View>
  );
};
