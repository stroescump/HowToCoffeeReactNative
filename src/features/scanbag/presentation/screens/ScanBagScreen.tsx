import { StringRes } from "@/src/i18n/strings";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { recognizeText } from "../../services/textRecognition";

const ACCENT_COLOR = "#1ECAD3";

export function ScanBagScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [scanError, setScanError] = useState(false);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current || isProcessing || !isCameraReady) return;
    setIsProcessing(true);
    setScanError(false);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
      });
      const result = await recognizeText(photo.uri);
      setRecognizedText(result.text.trim());
    } catch {
      setScanError(true);
      setRecognizedText("");
    } finally {
      setIsProcessing(false);
    }
  }, [isCameraReady, isProcessing]);

  const handleRetake = () => {
    setRecognizedText(null);
    setScanError(false);
  };

  const hasResult = recognizedText !== null || scanError;

  const renderPermissionContent = () => (
    <View style={styles.permissionContainer}>
      <Text style={styles.permissionTitle}>
        {t(StringRes.scanBagScreen.permissionTitle)}
      </Text>
      <Text style={styles.permissionBody}>
        {t(StringRes.scanBagScreen.permissionBody)}
      </Text>
      <Pressable
        style={styles.permissionButton}
        onPress={() => void requestPermission()}
      >
        <Text style={styles.permissionButtonLabel}>
          {t(StringRes.scanBagScreen.permissionButton)}
        </Text>
      </Pressable>
    </View>
  );

  const renderLoadingContent = () => (
    <View style={styles.permissionContainer}>
      <ActivityIndicator color="#FFFFFF" />
      <Text style={styles.permissionBody}>
        {t(StringRes.scanBagScreen.permissionLoading)}
      </Text>
    </View>
  );

  return (
    <BaseScreen showHeader={false} safeAreaBgColor="#000000">
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t(StringRes.scanBagScreen.backLabel)}
            hitSlop={10}
          >
            <ArrowLeft color="#FFFFFF" size={32} />
          </Pressable>
          <Text style={styles.title}>{t(StringRes.scanBagScreen.title)}</Text>
        </View>

        {!permission && renderLoadingContent()}

        {permission && !permission.granted && renderPermissionContent()}

        {permission?.granted && (
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
              onCameraReady={() => setIsCameraReady(true)}
            />
            <View style={styles.overlay}>
              <View style={styles.instructions}>
                <Text style={styles.instructionsText}>
                  {t(StringRes.scanBagScreen.subtitle)}
                </Text>
              </View>
              <View style={styles.frame} />
            </View>
            {!hasResult && (
              <View style={styles.controls}>
                <Pressable
                  onPress={() => void handleCapture()}
                  accessibilityRole="button"
                  accessibilityLabel={t(StringRes.scanBagScreen.scanLabel)}
                  style={[
                    styles.captureButton,
                    (!isCameraReady || isProcessing) && styles.captureButtonDisabled,
                  ]}
                  disabled={!isCameraReady || isProcessing}
                >
                  <View style={styles.captureInner} />
                </Pressable>
                <Text style={styles.scanLabel}>
                  {t(StringRes.scanBagScreen.scanLabel)}
                </Text>
              </View>
            )}
            {isProcessing && (
              <View style={styles.processingOverlay}>
                <ActivityIndicator color="#FFFFFF" />
                <Text style={styles.processingText}>
                  {t(StringRes.scanBagScreen.processing)}
                </Text>
              </View>
            )}
            {hasResult && (
              <View style={styles.resultsPanel}>
                <Text style={styles.resultsTitle}>
                  {t(StringRes.scanBagScreen.resultsTitle)}
                </Text>
                <ScrollView
                  style={styles.resultsScroll}
                  contentContainerStyle={styles.resultsContent}
                >
                  <Text style={styles.resultsText}>
                    {scanError
                      ? t(StringRes.scanBagScreen.captureError)
                      : recognizedText?.trim() ||
                        t(StringRes.scanBagScreen.noTextFound)}
                  </Text>
                </ScrollView>
                <Pressable
                  onPress={handleRetake}
                  accessibilityRole="button"
                  accessibilityLabel={t(StringRes.scanBagScreen.retake)}
                  style={styles.retakeButton}
                >
                  <Text style={styles.retakeButtonLabel}>
                    {t(StringRes.scanBagScreen.retake)}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "InterBold",
    marginLeft: 12,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  instructions: {
    position: "absolute",
    top: 76,
    left: 24,
    right: 24,
    alignItems: "center",
  },
  instructionsText: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 16,
    fontFamily: "InterMedium",
    textAlign: "center",
  },
  frame: {
    width: "78%",
    height: "54%",
    borderWidth: 2,
    borderColor: ACCENT_COLOR,
  },
  controls: {
    position: "absolute",
    bottom: 28,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: ACCENT_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  captureInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT_COLOR,
  },
  scanLabel: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 6,
  },
  processingText: {
    marginTop: 12,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "InterMedium",
  },
  resultsPanel: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: "#111111",
    borderRadius: 20,
    padding: 16,
    maxHeight: "45%",
    zIndex: 7,
  },
  resultsTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "InterBold",
    marginBottom: 10,
  },
  resultsScroll: {
    maxHeight: 160,
  },
  resultsContent: {
    paddingBottom: 12,
  },
  resultsText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "InterRegular",
    lineHeight: 22,
  },
  retakeButton: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  retakeButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "InterSemiBold",
  },
  permissionContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "InterBold",
    textAlign: "center",
    marginBottom: 12,
  },
  permissionBody: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    fontFamily: "InterRegular",
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: ACCENT_COLOR,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 999,
  },
  permissionButtonLabel: {
    color: "#001011",
    fontSize: 16,
    fontFamily: "InterSemiBold",
  },
});
