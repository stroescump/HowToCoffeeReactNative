// app/index.tsx
import { ButtonsSvg } from "@/src/features/homescreen/presentation/components/ButtonsSvg";
import { StringRes } from "@/src/i18n/strings";
import { API_BASE_URL_DEFAULTS, getApiBaseUrl, setApiBaseUrl } from "@/src/shared/config/config";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [availableHeight, setAvailableHeight] = useState(0);
  const [showApiModal, setShowApiModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(getApiBaseUrl());
  const [customUrl, setCustomUrl] = useState("");
  const { t } = useTranslation();
  const R = StringRes.homescreen;

  const handleSaveBaseUrl = () => {
    const trimmedCustom = customUrl.trim();
    const nextUrl =
      selectedUrl === "custom" ? trimmedCustom : selectedUrl;
    if (!nextUrl) return;
    setApiBaseUrl(nextUrl);
    setShowApiModal(false);
  };

  return (
    <BaseScreen showHeader={false}>
      <Text
        className="text-5xl text-center mt-2 mb-2 tracking-[-3px] font-[InterBold]"
        onPress={() => {
          const current = getApiBaseUrl();
          if (API_BASE_URL_DEFAULTS.includes(current as any)) {
            setSelectedUrl(current);
            setCustomUrl("");
          } else {
            setSelectedUrl("custom");
            setCustomUrl(current);
          }
          setShowApiModal(true);
        }}
      >
        {t("appTitle")}
      </Text>
      <View className="flex-1 mb-2" onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setAvailableHeight(height);
      }}>
        {availableHeight > 0 && (
          <ButtonsSvg
            availableHeight={availableHeight}
            labels={{
              findYourTaste: {
                label: t(R.findYourTaste),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#010101",
              },
              marketplace: {
                label: t(R.marketplace),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#010101",
              },
              diagnoseBrew: {
                label: t(R.diagnoseBrew),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#FFFFFF",
              },
              recipeAgenda: {
                label: t(R.recipeAgenda),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#FFFFFF",
              },
              coffeePlacesNearby: {
                label: t(R.coffeePlacesNearby),
                fontSize: 32,
                fontFamily: "InterBold",
                fill: "#010101",
              },
            }}
          />
        )}
      </View>

      <Modal
        visible={showApiModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowApiModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center px-6">
          <View className="bg-white rounded-2xl p-6">
            <Text className="text-2xl font-[InterBold] mb-4">Select API base URL</Text>

            {API_BASE_URL_DEFAULTS.map((url) => (
              <TouchableOpacity
                key={url}
                className="flex-row items-center py-3"
                onPress={() => {
                  setSelectedUrl(url);
                  setCustomUrl("");
                }}
              >
                <View
                  className={`w-5 h-5 mr-3 rounded-full border border-black ${selectedUrl === url ? "bg-black" : "bg-transparent"}`}
                />
                <Text className="text-base">{url}</Text>
              </TouchableOpacity>
            ))}

            <View className="mt-4">
              <TouchableOpacity
                className="flex-row items-center mb-2"
                onPress={() => setSelectedUrl("custom")}
              >
                <View
                  className={`w-5 h-5 mr-3 rounded-full border border-black ${selectedUrl === "custom" ? "bg-black" : "bg-transparent"}`}
                />
                <Text className="text-base">Custom</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="https://your-api.example"
                className="border border-black/20 rounded-lg px-3 py-2"
                editable={selectedUrl === "custom"}
                value={customUrl}
                onChangeText={setCustomUrl}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View className="mt-6 flex-row gap-3">
              <Button className="flex-1" text="Save" onPress={handleSaveBaseUrl} />
              <Button
                className="flex-1"
                variant="ghost"
                text="Cancel"
                onPress={() => setShowApiModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </BaseScreen >
  );
}
