// app/index.tsx
import { ButtonsSvg } from "@/src/features/homescreen/presentation/components/ButtonsSvg";
import { API_BASE_URL_DEFAULTS, getApiBaseUrl, setApiBaseUrl } from "@/src/shared/config/config";
import { setAuthToken } from "@/src/shared/domain/usecases/authTokenUseCase";
import { isUserAuthenticated } from "@/src/shared/domain/usecases/authStatusUseCase";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useRouter } from "expo-router";
import { User } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { HomeScreenConfig } from "./HomeScreenConfig";

// TODO: Add "Edit taste preferences" entry when a Settings screen is available.

export default function HomeScreen() {
  const [availableHeight, setAvailableHeight] = useState(0);
  const [showApiModal, setShowApiModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(getApiBaseUrl());
  const [customUrl, setCustomUrl] = useState("");
  const { t } = useTranslation();
  const router = useRouter();

  const handleInjectDevJwt = async () => {
    if (!__DEV__) return;

    let devJwt: string | null = null;
    try {
      const mod = require("@/src/shared/config/devConfig") as {
        getDevJwt?: () => string | null;
      };
      devJwt = mod.getDevJwt ? mod.getDevJwt() : null;
    } catch {
      devJwt = null;
    }

    if (!devJwt) {
      console.warn("[Dev] DEV_JWT is not set or empty");
      return;
    }

    await setAuthToken(devJwt);
    setShowApiModal(false);
  };

  const handleSaveBaseUrl = () => {
    const trimmedCustom = customUrl.trim();
    const nextUrl =
      selectedUrl === "custom" ? trimmedCustom : selectedUrl;
    if (!nextUrl) return;
    setApiBaseUrl(nextUrl);
    setShowApiModal(false);
  };

  const onAppTitlePressed = () => {
    const current = getApiBaseUrl();
    if (API_BASE_URL_DEFAULTS.includes(current as any)) {
      setSelectedUrl(current);
      setCustomUrl("");
    } else {
      setSelectedUrl("custom");
      setCustomUrl(current);
    }
    setShowApiModal(true);
  }

  const onUserPressed = async () => {
    const isAuthenticated = await isUserAuthenticated();
    router.push(isAuthenticated ? "/profile" : "/auth/login");
  }

  return (
    <BaseScreen>
      <View className="relative w-full">
        <Text
          className="text-5xl text-center mt-2 mb-2 tracking-[-2px] font-[InterBold] w-full"
          onPress={onAppTitlePressed}
        >
          {t("appTitle")}
        </Text>
        <Pressable className="absolute right-4 top-0 bottom-2 justify-center" onPress={onUserPressed}>
          <User size={32} />
        </Pressable>
      </View>
      <View className="flex-1 mb-2" onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setAvailableHeight(height);
      }}>
        {availableHeight > 0 && (
          <ButtonsSvg
            availableHeight={availableHeight}
            labels={HomeScreenConfig.buttonLabelsConfig}
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

            <View className="mt-6" style={{ rowGap: 12 }}>
              {__DEV__ && (
                <Button
                  variant="ghost"
                  text="Inject DEV_JWT"
                  onPress={handleInjectDevJwt}
                />
              )}
              <View className="flex-row" style={{ columnGap: 12 }}>
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
        </View>
      </Modal>
    </BaseScreen >
  );
}
